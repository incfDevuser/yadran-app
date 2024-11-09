import pool from "../config/db.js";

const crearViaje = async ({ nombre, descripcion, ruta_id }) => {
  try {
    const query = `
      INSERT INTO viajes (nombre, descripcion, ruta_id)
      VALUES ($1, $2, $3) RETURNING *
    `;
    const values = [nombre, descripcion, ruta_id];
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
  JOIN trayectos t ON v.ruta_id = t.ruta_id
  LEFT JOIN vehiculos veh ON t.vehiculo_id = veh.id  -- LEFT JOIN para incluir trayectos sin vehículo
  GROUP BY v.id, r.nombre_ruta
  ORDER BY v.id;
`;

    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error(
      "Error al obtener los viajes con trayectos y vehículos:",
      error
    );
    throw new Error("Error al obtener los viajes con trayectos y vehículos");
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
      SELECT t.id AS trayecto_id, t.vehiculo_id
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
    const viajeQuery = `SELECT id FROM viajes WHERE id = $1`;
    const viajeResult = await client.query(viajeQuery, [viaje_id]);
    if (viajeResult.rows.length === 0) {
      throw new Error("El viaje no existe");
    }
    const trabajadoresQuery = `
      SELECT id 
      FROM trabajadores 
      WHERE id = ANY($1::int[]) AND contratista_id = $2
    `;
    const trabajadoresValidos = await client.query(trabajadoresQuery, [
      trabajadores,
      contratista_id,
    ]);

    if (trabajadoresValidos.rows.length !== trabajadores.length) {
      throw new Error(
        "Algunos trabajadores no pertenecen al contratista o no existen"
      );
    }
    const trayectosQuery = `
      SELECT id, vehiculo_id 
      FROM trayectos 
      WHERE ruta_id = (SELECT ruta_id FROM viajes WHERE id = $1)
    `;
    const trayectosResult = await client.query(trayectosQuery, [viaje_id]);
    if (trayectosResult.rows.length === 0) {
      throw new Error("El viaje no tiene trayectos asociados");
    }
    const solicitudes = [];
    for (const trabajador_id of trabajadores) {s
      const solicitudQuery = `
        INSERT INTO usuarios_viajes 
        (trabajador_id, contratista_id, viaje_id, fecha_inicio, fecha_fin, comentario_usuario, estado)
        VALUES ($1, $2, $3, $4, $5, $6, 'Pendiente') 
        RETURNING id
      `;
      const solicitudResult = await client.query(solicitudQuery, [
        trabajador_id,
        contratista_id,
        viaje_id,
        fecha_inicio,
        fecha_fin,
        comentario_contratista,
      ]);
      const solicitudId = solicitudResult.rows[0].id;
      solicitudes.push({ trabajador_id, solicitudId });
      for (const trayecto of trayectosResult.rows) {
        const vehiculoUsuariosQuery = `
          INSERT INTO vehiculo_usuarios 
          (vehiculo_id, trabajador_id, trayecto_id, estado) 
          VALUES ($1, $2, $3, 'Pendiente')
        `;
        await client.query(vehiculoUsuariosQuery, [
          trayecto.vehiculo_id,
          trabajador_id,
          trayecto.id,
        ]);
      }
    }
    await client.query("COMMIT");
    return {
      message: "Agendamiento exitoso para los trabajadores",
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
//Rechazar la solicitud de un viaje
const rechazarSolicitudViaje = async (solicitudId) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const solicitudQuery = `
      SELECT usuario_id, viaje_id
      FROM usuarios_viajes
      WHERE id = $1 AND estado = 'Pendiente';
    `;
    const solicitudResult = await client.query(solicitudQuery, [solicitudId]);
    if (solicitudResult.rows.length === 0) {
      throw new Error("Solicitud no encontrada o ya procesada");
    }
    const { usuario_id, viaje_id } = solicitudResult.rows[0];
    const updateSolicitudQuery = `
      UPDATE usuarios_viajes
      SET estado = 'Rechazado'
      WHERE id = $1
      RETURNING *;
    `;
    await client.query(updateSolicitudQuery, [solicitudId]);
    const deleteVehiculoUsuariosQuery = `
      DELETE FROM vehiculo_usuarios
      WHERE usuario_id = $1 
      AND trayecto_id IN (
        SELECT t.id
        FROM trayectos t
        JOIN viajes v ON v.ruta_id = t.ruta_id
        WHERE v.id = $2
      );
    `;
    await client.query(deleteVehiculoUsuariosQuery, [usuario_id, viaje_id]);

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
//Aprobar solicitudes para usuarios
const aprobarSolicitudViaje = async (solicitudId) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const solicitudQuery = `
      SELECT usuario_id, viaje_id
      FROM usuarios_viajes
      WHERE id = $1 AND estado = 'Pendiente';
    `;
    const solicitudResult = await client.query(solicitudQuery, [solicitudId]);

    if (solicitudResult.rows.length === 0) {
      throw new Error("Solicitud no encontrada o ya procesada");
    }
    const { usuario_id, viaje_id } = solicitudResult.rows[0];
    const updateSolicitudQuery = `
      UPDATE usuarios_viajes
      SET estado = 'Aprobado'
      WHERE id = $1
      RETURNING *;
    `;
    await client.query(updateSolicitudQuery, [solicitudId]);
    const updateVehiculoUsuariosQuery = `
      UPDATE vehiculo_usuarios
      SET estado = 'Aprobado'
      WHERE usuario_id = $1 
      AND trayecto_id IN (
        SELECT t.id
        FROM trayectos t
        JOIN viajes v ON v.ruta_id = t.ruta_id
        WHERE v.id = $2
      );
    `;
    await client.query(updateVehiculoUsuariosQuery, [usuario_id, viaje_id]);

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
export const ViajesModel = {
  crearViaje,
  obtenerViajes,
  solicitarViajeParaUsuario,
  agendarViajeParaTrabajadores,
  rechazarSolicitudViaje,
  obtenerSolicitudesUsuariosNaturales,
  aprobarSolicitudViaje,
};
