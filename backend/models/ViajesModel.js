import pool from "../config/db.js";

const crearViaje = async ({ nombre, descripcion, ruta_id, tipo_viaje }) => {
  try {
    const query = `
      INSERT INTO viajes (nombre, descripcion, ruta_id, tipo_viaje)
      VALUES ($1, $2, $3, $4) RETURNING *
    `;
    const values = [nombre, descripcion, ruta_id, tipo_viaje];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error("Error al crear el viaje:", error);
    throw new Error("Error al crear el viaje");
  }
};
//Obtener los viajes
const obtenerViajes = async () => {
  try {
    const query = `
      SELECT 
        v.*, 
        r.nombre_ruta AS nombre_ruta, 
        json_build_object(
          'id', c.id,
          'nombre_centro', c.nombre_centro,
          'fecha_apertura_productiva', c.fecha_apertura_productiva,
          'fecha_cierre_productivo', c.fecha_cierre_productivo,
          'jefe_centro', c.jefe_centro,
          'etapa_ciclo_cultivo', c.etapa_ciclo_cultivo,
          'estructura', c.estructura,
          'latitud', c.latitud,
          'longitud', c.longitud
        ) AS centro_asociado, -- Construimos un objeto JSON con los datos del centro
        json_agg(
          json_build_object(
            'id', t.id,
            'origen', t.origen,
            'destino', t.destino,
            'duracion_estimada', t.duracion_estimada,
            'vehiculo_id', t.vehiculo_id,
            'nombre_vehiculo', veh.tipo_vehiculo 
          )
          ORDER BY t.id ASC
        ) AS trayectos
      FROM viajes v
      JOIN rutas r ON v.ruta_id = r.id
      LEFT JOIN centro c ON r.id = c.ruta_id -- LEFT JOIN para incluir el centro asociado
      JOIN trayectos t ON v.ruta_id = t.ruta_id
      LEFT JOIN vehiculos veh ON t.vehiculo_id = veh.id -- LEFT JOIN para incluir trayectos sin vehículo
      GROUP BY v.id, r.nombre_ruta, c.id -- Incluir c.id para evitar errores de agrupación
      ORDER BY v.id;
    `;

    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error(
      "Error al obtener los viajes con trayectos, vehículos y centro asociado:",
      error
    );
    throw new Error(
      "Error al obtener los viajes con trayectos, vehículos y centro asociado"
    );
  }
};

//Solicitar Viaje Para Usuario Natural
const solicitarViajeParaUsuario = async ({
  usuario_id,
  viaje_id,
  fecha_inicio,
  fecha_fin,
  comentario_usuario,
}) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const querySolicitud = `
      INSERT INTO usuarios_viajes(usuario_id, viaje_id, fecha_inicio, fecha_fin, comentario_usuario, estado)
      VALUES ($1, $2, $3, $4, $5, 'Pendiente') RETURNING *;
    `;
    const valuesSolicitud = [
      usuario_id,
      viaje_id,
      fecha_inicio,
      fecha_fin,
      comentario_usuario,
    ];
    const responseSolicitud = await client.query(
      querySolicitud,
      valuesSolicitud
    );
    const solicitud = responseSolicitud.rows[0];
    const queryTrayectos = `
      SELECT t.id AS trayecto_id, t.vehiculo_id, t.hotel_id
      FROM trayectos t
      JOIN viajes v ON v.ruta_id = t.ruta_id
      WHERE v.id = $1;
    `;
    const responseTrayectos = await client.query(queryTrayectos, [viaje_id]);
    const trayectos = responseTrayectos.rows;
    for (const trayecto of trayectos) {
      const queryVehiculoUsuario = `
        INSERT INTO vehiculo_usuarios (vehiculo_id, usuario_id, trayecto_id, estado)
        VALUES ($1, $2, $3, 'Pendiente');
      `;
      await client.query(queryVehiculoUsuario, [
        trayecto.vehiculo_id,
        usuario_id,
        trayecto.trayecto_id,
      ]);

      // Agregar usuario al hotel si está asociado al trayecto
      if (trayecto.hotel_id) {
        const queryUsuarioHotel = `
          INSERT INTO usuarios_hoteles (hotel_id, usuario_id, estado)
          VALUES ($1, $2, 'Pendiente');
        `;
        await client.query(queryUsuarioHotel, [trayecto.hotel_id, usuario_id]);
      }
    }

    // Obtener el pontón asociado al viaje
    const queryPonton = `
      SELECT p.id AS ponton_id, p.habitabilidad_general, p.habitabilidad_interna, p.habitabilidad_externa
      FROM ponton p
      JOIN centro c ON c.ponton_id = p.id
      JOIN rutas r ON r.id = c.ruta_id
      JOIN viajes v ON v.ruta_id = r.id
      WHERE v.id = $1;
    `;
    const responsePonton = await client.query(queryPonton, [viaje_id]);

    if (responsePonton.rows.length > 0) {
      const { ponton_id, habitabilidad_general } = responsePonton.rows[0];

      // Validar habitabilidad general del pontón
      const queryUsuariosEnPonton = `
        SELECT COUNT(*) AS total_usuarios
        FROM usuarios_pontones
        WHERE ponton_id = $1;
      `;
      const responseUsuariosEnPonton = await client.query(
        queryUsuariosEnPonton,
        [ponton_id]
      );

      const totalUsuarios = parseInt(
        responseUsuariosEnPonton.rows[0].total_usuarios
      );

      if (totalUsuarios >= habitabilidad_general) {
        throw new Error(
          "El pontón ya alcanzó su capacidad máxima de habitabilidad general"
        );
      }

      // Insertar al usuario en la lista de usuarios del pontón
      const queryUsuarioPonton = `
        INSERT INTO usuarios_pontones (ponton_id, usuario_id, estado)
        VALUES ($1, $2, 'Pendiente');
      `;
      await client.query(queryUsuarioPonton, [ponton_id, usuario_id]);
    } else {
      throw new Error("No se encontró un pontón asociado al viaje");
    }

    await client.query("COMMIT");
    return {
      message: "Viaje solicitado exitosamente para el usuario",
      solicitud,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error al solicitar viaje para usuario:", error);
    throw new Error("Error al solicitar viaje para usuario");
  } finally {
    client.release();
  }
};

//Cancelar viaje usuario -  usuarios o contratista
const cancelarViajeUsuarioYTrabajadores = async (solicitudId) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Obtener la información de la solicitud y los trayectos relacionados
    const solicitudQuery = `
      SELECT usuario_id, trabajador_id, viaje_id
      FROM usuarios_viajes
      WHERE id = $1 AND estado = 'Pendiente';
    `;
    const solicitudResult = await client.query(solicitudQuery, [solicitudId]);

    if (solicitudResult.rows.length === 0) {
      throw new Error("Solicitud no encontrada o ya procesada");
    }

    const { usuario_id, trabajador_id, viaje_id } = solicitudResult.rows[0];

    // Eliminar al usuario o trabajador de los vehículos asociados a los trayectos del viaje
    const deleteVehiculoUsuariosQuery = `
      DELETE FROM vehiculo_usuarios
      WHERE 
        (usuario_id = $1 OR trabajador_id = $2)
        AND trayecto_id IN (
          SELECT t.id
          FROM trayectos t
          JOIN viajes v ON v.ruta_id = t.ruta_id
          WHERE v.id = $3
        );
    `;
    await client.query(deleteVehiculoUsuariosQuery, [
      usuario_id,
      trabajador_id,
      viaje_id,
    ]);

    // Eliminar al usuario o trabajador del hotel asociado al trayecto
    const deleteUsuarioHotelQuery = `
      DELETE FROM usuarios_hoteles
      WHERE 
        (usuario_id = $1 OR trabajador_id = $2)
        AND hotel_id IN (
          SELECT t.hotel_id
          FROM trayectos t
          JOIN viajes v ON v.ruta_id = t.ruta_id
          WHERE v.id = $3
        );
    `;
    await client.query(deleteUsuarioHotelQuery, [
      usuario_id,
      trabajador_id,
      viaje_id,
    ]);

    // Obtener el pontón asociado al viaje a través de la ruta y el centro
    const pontonQuery = `
      SELECT p.id AS ponton_id
      FROM ponton p
      JOIN centro c ON c.ponton_id = p.id
      JOIN rutas r ON r.id = c.ruta_id
      JOIN viajes v ON v.ruta_id = r.id
      WHERE v.id = $1;
    `;
    const pontonResult = await client.query(pontonQuery, [viaje_id]);

    if (pontonResult.rows.length > 0) {
      const { ponton_id } = pontonResult.rows[0];

      // Eliminar al usuario o trabajador del pontón
      const deleteUsuarioPontonQuery = `
        DELETE FROM usuarios_pontones
        WHERE ponton_id = $1 AND (usuario_id = $2 OR trabajador_id = $3);
      `;
      await client.query(deleteUsuarioPontonQuery, [
        ponton_id,
        usuario_id,
        trabajador_id,
      ]);
    }

    // Eliminar la solicitud de la tabla usuarios_viajes
    const deleteSolicitudQuery = `
      DELETE FROM usuarios_viajes
      WHERE id = $1;
    `;
    await client.query(deleteSolicitudQuery, [solicitudId]);

    await client.query("COMMIT");
    return {
      message:
        "Solicitud de viaje cancelada exitosamente y cupos liberados para usuarios y trabajadores",
    };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error al cancelar la solicitud de viaje:", error);
    throw new Error("Error al cancelar la solicitud de viaje");
  } finally {
    client.release();
  }
};

//Solicitar un viaje desde los contratistas
const agendarViajeParaTrabajadores = async ({
  contratista_id,
  viaje_id,
  trabajadores,
  fecha_inicio,
  fecha_fin,
  comentario_contratista,
}) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Validar trabajadores
    const validacionQuery = `
      SELECT id 
      FROM trabajadores 
      WHERE contratista_id = $1 AND id = ANY($2::int[]);
    `;
    const validacionResult = await client.query(validacionQuery, [
      contratista_id,
      trabajadores,
    ]);
    const trabajadoresValidos = validacionResult.rows.map((row) => row.id);

    if (trabajadoresValidos.length !== trabajadores.length) {
      throw new Error(
        "Algunos trabajadores no pertenecen al contratista o no existen"
      );
    }

    // Crear solicitudes para los trabajadores
    const solicitudes = [];
    for (const trabajador_id of trabajadoresValidos) {
      const solicitudQuery = `
        INSERT INTO usuarios_viajes 
        (trabajador_id, contratista_id, viaje_id, fecha_inicio, fecha_fin, comentario_usuario, estado)
        VALUES ($1, $2, $3, $4, $5, $6, 'Pendiente')
        RETURNING *;
      `;
      const solicitudResult = await client.query(solicitudQuery, [
        trabajador_id,
        contratista_id,
        viaje_id,
        fecha_inicio,
        fecha_fin,
        comentario_contratista,
      ]);
      solicitudes.push(solicitudResult.rows[0]);
    }

    // Obtener trayectos del viaje
    const trayectosQuery = `
      SELECT id AS trayecto_id, vehiculo_id, hotel_id 
      FROM trayectos 
      WHERE ruta_id = (SELECT ruta_id FROM viajes WHERE id = $1);
    `;
    const trayectosResult = await client.query(trayectosQuery, [viaje_id]);
    const trayectos = trayectosResult.rows;

    // Asignar trabajadores a los vehículos y hoteles
    for (const trayecto of trayectos) {
      for (const trabajador_id of trabajadoresValidos) {
        // Asignar trabajador al vehículo
        const vehiculoUsuariosQuery = `
          INSERT INTO vehiculo_usuarios (vehiculo_id, trayecto_id, trabajador_id, estado)
          VALUES ($1, $2, $3, 'Pendiente');
        `;
        await client.query(vehiculoUsuariosQuery, [
          trayecto.vehiculo_id,
          trayecto.trayecto_id,
          trabajador_id,
        ]);

        // Asignar trabajador al hotel si está asociado al trayecto
        if (trayecto.hotel_id) {
          const hotelUsuariosQuery = `
            INSERT INTO usuarios_hoteles (hotel_id, trabajador_id, estado)
            VALUES ($1, $2, 'Pendiente');
          `;
          await client.query(hotelUsuariosQuery, [
            trayecto.hotel_id,
            trabajador_id,
          ]);
        }
      }
    }

    // Obtener el pontón asociado al viaje
    const pontonQuery = `
     SELECT p.id AS ponton_id
     FROM ponton p
     JOIN centro c ON c.ponton_id = p.id
     JOIN rutas r ON r.id = c.ruta_id
     JOIN viajes v ON v.ruta_id = r.id
     WHERE v.id = $1;
   `;
    const pontonResult = await client.query(pontonQuery, [viaje_id]);

    if (pontonResult.rows.length > 0) {
      const { ponton_id } = pontonResult.rows[0];

      // Asignar trabajadores al pontón
      for (const trabajador_id of trabajadoresValidos) {
        const pontonUsuariosQuery = `
         INSERT INTO usuarios_pontones (ponton_id, trabajador_id, estado)
         VALUES ($1, $2, 'Pendiente');
       `;
        await client.query(pontonUsuariosQuery, [ponton_id, trabajador_id]);
      }
    }

    await client.query("COMMIT");
    return {
      message: "Viaje agendado exitosamente para los trabajadores",
      solicitudes,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error al agendar viaje para trabajadores:", error);
    throw new Error("Error al agendar viaje para trabajadores");
  } finally {
    client.release();
  }
};

//Rechazar la solicitud de un viaje - admin
const rechazarSolicitudViaje = async (solicitudId) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Obtener la solicitud y determinar si es un usuario o trabajador
    const solicitudQuery = `
      SELECT usuario_id, trabajador_id, viaje_id
      FROM usuarios_viajes
      WHERE id = $1 AND estado = 'Pendiente';
    `;
    const solicitudResult = await client.query(solicitudQuery, [solicitudId]);

    if (solicitudResult.rows.length === 0) {
      throw new Error("Solicitud no encontrada o ya procesada");
    }

    const { usuario_id, trabajador_id, viaje_id } = solicitudResult.rows[0];

    // Actualizar el estado de la solicitud a "Rechazado"
    const updateSolicitudQuery = `
      UPDATE usuarios_viajes
      SET estado = 'Rechazado'
      WHERE id = $1
      RETURNING *;
    `;
    await client.query(updateSolicitudQuery, [solicitudId]);

    // Eliminar al usuario o trabajador de los vehículos asociados a los trayectos del viaje
    const deleteVehiculoUsuariosQuery = `
      DELETE FROM vehiculo_usuarios
      WHERE (usuario_id = $1 OR trabajador_id = $2)
      AND trayecto_id IN (
        SELECT t.id
        FROM trayectos t
        JOIN viajes v ON v.ruta_id = t.ruta_id
        WHERE v.id = $3
      );
    `;
    await client.query(deleteVehiculoUsuariosQuery, [
      usuario_id,
      trabajador_id,
      viaje_id,
    ]);

    // Eliminar al usuario o trabajador del hotel asociado al trayecto
    const deleteUsuarioHotelQuery = `
      DELETE FROM usuarios_hoteles
      WHERE (usuario_id = $1 OR trabajador_id = $2)
      AND hotel_id IN (
        SELECT t.hotel_id
        FROM trayectos t
        JOIN viajes v ON v.ruta_id = t.ruta_id
        WHERE v.id = $3
      );
    `;
    await client.query(deleteUsuarioHotelQuery, [
      usuario_id,
      trabajador_id,
      viaje_id,
    ]);

    // Obtener el pontón asociado al viaje a través de la ruta y el centro
    const pontonQuery = `
      SELECT p.id AS ponton_id
      FROM ponton p
      JOIN centro c ON c.ponton_id = p.id
      JOIN rutas r ON r.id = c.ruta_id
      JOIN viajes v ON v.ruta_id = r.id
      WHERE v.id = $1;
    `;
    const pontonResult = await client.query(pontonQuery, [viaje_id]);

    if (pontonResult.rows.length > 0) {
      const { ponton_id } = pontonResult.rows[0];

      // Eliminar al usuario o trabajador del pontón
      const deleteUsuarioPontonQuery = `
        DELETE FROM usuarios_pontones
        WHERE ponton_id = $1 AND (usuario_id = $2 OR trabajador_id = $3);
      `;
      await client.query(deleteUsuarioPontonQuery, [
        ponton_id,
        usuario_id,
        trabajador_id,
      ]);
    }

    await client.query("COMMIT");
    return {
      message: "Solicitud de viaje rechazada y cupos liberados exitosamente",
    };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error al rechazar la solicitud de viaje:", error);
    throw new Error("Error al rechazar la solicitud de viaje y liberar cupos");
  } finally {
    client.release();
  }
};

//Obtener las solicitudes de usuarios naturales
const obtenerSolicitudesUsuariosNaturales = async () => {
  try {
    const query = `
      SELECT 
        uv.id AS solicitud_id,
        uv.viaje_id,
        uv.fecha_inicio,
        uv.fecha_fin,
        uv.comentario_usuario,
        uv.estado,
        uv.created_at,
        uv.updated_at,
        u.id AS usuario_id,
        u.nombre AS nombre_usuario,
        u.email AS email_usuario,
        u.rut AS rut_usuario,
        u.empresa AS empresa_usuario,
        u.cargo AS cargo_usuario,
        u.numero_contacto AS contacto_usuario,
        u.fecha_nacimiento AS fecha_nacimiento_usuario,
        v.nombre AS nombre_viaje,
        v.descripcion AS descripcion_viaje
      FROM usuarios_viajes uv
      JOIN usuarios u ON uv.usuario_id = u.id
      JOIN viajes v ON uv.viaje_id = v.id
      WHERE uv.trabajador_id IS NULL
      ORDER BY uv.created_at DESC;
    `;

    const response = await pool.query(query);

    const solicitudes = response.rows.map((row) => ({
      solicitud_id: row.solicitud_id,
      viaje_id: row.viaje_id,
      fecha_inicio: row.fecha_inicio,
      fecha_fin: row.fecha_fin,
      comentario_usuario: row.comentario_usuario,
      estado: row.estado,
      created_at: row.created_at,
      updated_at: row.updated_at,
      nombre_solicitante: row.nombre_usuario,
      email_solicitante: row.email_usuario,
      rut_solicitante: row.rut_usuario,
      empresa_solicitante: row.empresa_usuario,
      cargo_solicitante: row.cargo_usuario,
      contacto_solicitante: row.contacto_usuario,
      fecha_nacimiento_solicitante: row.fecha_nacimiento_usuario,
      nombre_viaje: row.nombre_viaje,
      descripcion_viaje: row.descripcion_viaje,
    }));

    return {
      message:
        "Lista de solicitudes de usuarios naturales obtenida exitosamente",
      solicitudes,
    };
  } catch (error) {
    console.error(
      "Error al obtener las solicitudes de usuarios naturales:",
      error
    );
    throw new Error(
      "Hubo un error al obtener las solicitudes de usuarios naturales"
    );
  }
};

//Obtener solicitudes para trabajadores

const obtenerSolicitudesTrabajadores = async () => {
  try {
    const query = `
      SELECT 
        uv.id AS solicitud_id,
        uv.viaje_id,
        uv.fecha_inicio,
        uv.fecha_fin,
        uv.comentario_usuario,
        uv.estado,
        uv.created_at,
        uv.updated_at,
        t.id AS trabajador_id,
        t.nombre AS nombre_trabajador,
        t.email AS email_trabajador,
        v.nombre AS nombre_viaje,
        v.descripcion AS descripcion_viaje,
        c.id AS contratista_id,
        c.nombre AS nombre_contratista,
        c.email AS email_contratista
      FROM usuarios_viajes uv
      JOIN trabajadores t ON uv.trabajador_id = t.id
      JOIN viajes v ON uv.viaje_id = v.id
      LEFT JOIN usuarios c ON t.contratista_id = c.id
      WHERE uv.trabajador_id IS NOT NULL
      ORDER BY uv.created_at DESC;
    `;

    const response = await pool.query(query);

    const solicitudes = response.rows.map((row) => ({
      solicitud_id: row.solicitud_id,
      viaje_id: row.viaje_id,
      fecha_inicio: row.fecha_inicio,
      fecha_fin: row.fecha_fin,
      comentario_usuario: row.comentario_usuario,
      estado: row.estado,
      created_at: row.created_at,
      updated_at: row.updated_at,
      trabajador: {
        id: row.trabajador_id,
        nombre: row.nombre_trabajador,
        email: row.email_trabajador,
      },
      contratista: {
        id: row.contratista_id,
        nombre: row.nombre_contratista,
        email: row.email_contratista,
      },
      viaje: {
        nombre: row.nombre_viaje,
        descripcion: row.descripcion_viaje,
      },
    }));

    return {
      message: "Lista de solicitudes de trabajadores obtenida exitosamente",
      solicitudes,
    };
  } catch (error) {
    console.error("Error al obtener las solicitudes de trabajadores:", error);
    throw new Error("Hubo un error al obtener las solicitudes de trabajadores");
  }
};
const aprobarSolicitudViaje = async (solicitudId) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Paso 1: Obtener el usuario, trabajador y el viaje asociado a la solicitud
    const solicitudQuery = `
      SELECT usuario_id, trabajador_id, viaje_id
      FROM usuarios_viajes
      WHERE id = $1 AND estado = 'Pendiente';
    `;
    const solicitudResult = await client.query(solicitudQuery, [solicitudId]);

    if (solicitudResult.rows.length === 0) {
      throw new Error("Solicitud no encontrada o ya procesada");
    }

    const { usuario_id, trabajador_id, viaje_id } = solicitudResult.rows[0];

    // Paso 2: Validar si es usuario o trabajador y actualizar el estado de la solicitud
    const updateSolicitudQuery = `
      UPDATE usuarios_viajes
      SET estado = 'Aprobado'
      WHERE id = $1
      RETURNING *;
    `;
    await client.query(updateSolicitudQuery, [solicitudId]);

    // Paso 3: Actualizar el estado en la tabla `vehiculo_usuarios`
    const updateVehiculoUsuariosQuery = `
      UPDATE vehiculo_usuarios
      SET estado = 'Aprobado'
      WHERE 
        (usuario_id = $1 OR trabajador_id = $2)
        AND trayecto_id IN (
          SELECT t.id
          FROM trayectos t
          JOIN viajes v ON v.ruta_id = t.ruta_id
          WHERE v.id = $3
        );
    `;
    await client.query(updateVehiculoUsuariosQuery, [
      usuario_id,
      trabajador_id,
      viaje_id,
    ]);

    await client.query("COMMIT");
    return {
      message:
        "Solicitud de viaje aprobada exitosamente y capacidad actualizada",
    };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error al aprobar la solicitud de viaje:", error);
    throw new Error("Error al aprobar la solicitud de viaje");
  } finally {
    client.release();
  }
};
const getDetallesViajeConTrabajadores = async (viajeId) => {
  try {
    const query = `
      SELECT 
        v.id AS viaje_id,
        v.nombre AS nombre_viaje,
        v.descripcion AS descripcion_viaje,
        uv.trabajador_id,
        t.nombre AS nombre_trabajador,
        t.email AS email_trabajador,
        uv.estado AS estado_trabajador
      FROM viajes v
      LEFT JOIN usuarios_viajes uv ON uv.viaje_id = v.id
      LEFT JOIN trabajadores t ON uv.trabajador_id = t.id
      WHERE v.id = $1;
    `;
    const response = await pool.query(query, [viajeId]);
    return response.rows;
  } catch (error) {
    console.error(
      "Error al obtener los detalles del viaje y trabajadores:",
      error
    );
    throw new Error("Error al obtener los detalles del viaje y trabajadores.");
  }
};
const obtenerSolicitudPorId = async (solicitudId) => {
  try {
    const query = `
      SELECT 
        uv.id AS solicitud_id,
        uv.usuario_id,
        uv.trabajador_id,
        uv.contratista_id,
        uv.viaje_id,
        uv.estado,
        u.nombre AS nombre_usuario,
        u.email AS email_usuario,
        t.nombre AS nombre_trabajador,
        t.email AS email_trabajador,
        c.nombre AS nombre_contratista,
        c.email AS email_contratista,
        v.nombre AS nombre_viaje
      FROM usuarios_viajes uv
      LEFT JOIN usuarios u ON uv.usuario_id = u.id
      LEFT JOIN trabajadores t ON uv.trabajador_id = t.id
      LEFT JOIN usuarios c ON uv.contratista_id = c.id
      JOIN viajes v ON uv.viaje_id = v.id
      WHERE uv.id = $1;
    `;
    const response = await pool.query(query, [solicitudId]);
    return response.rows[0];
  } catch (error) {
    console.error("Error al obtener solicitud:", error);
    throw new Error("No se pudo obtener la solicitud");
  }
};
export const ViajesModel = {
  crearViaje,
  obtenerViajes,
  solicitarViajeParaUsuario,
  rechazarSolicitudViaje,
  agendarViajeParaTrabajadores,
  obtenerSolicitudesUsuariosNaturales,
  aprobarSolicitudViaje,
  obtenerSolicitudesTrabajadores,
  cancelarViajeUsuarioYTrabajadores,
  getDetallesViajeConTrabajadores,
  obtenerSolicitudPorId,
};
