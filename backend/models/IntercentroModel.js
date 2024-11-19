import pool from "../config/db.js";

const obtenerLanchas = async () => {
  try {
    const query = `
      SELECT 
        l.id AS lancha_id,
        l.nombre AS lancha_nombre,
        l.capacidad AS lancha_capacidad,
        l.disponible AS lancha_disponible,
        (l.capacidad - COUNT(umi.id)) AS capacidad_disponible,
        COALESCE(
          json_agg(
            json_build_object(
              'persona_id', COALESCE(u.id, t.id),
              'nombre', COALESCE(u.nombre, t.nombre),
              'email', COALESCE(u.email, t.email),
              'tipo', CASE 
                         WHEN u.id IS NOT NULL THEN 'usuario' 
                         ELSE 'trabajador' 
                      END
            )
          ) FILTER (WHERE u.id IS NOT NULL OR t.id IS NOT NULL),
          '[]'
        ) AS personas
      FROM lanchas l
      LEFT JOIN movimientosintercentro mi ON mi.lancha_id = l.id
      LEFT JOIN usuariosmovimientosintercentro umi ON umi.movimiento_id = mi.id
      LEFT JOIN usuarios u ON umi.usuario_id = u.id
      LEFT JOIN trabajadores t ON umi.trabajador_id = t.id
      GROUP BY l.id;
    `;
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error("Error al obtener las lanchas:", error);
    throw new Error("Hubo un error al obtener las lanchas");
  }
};
//Crear lanchas
const crearLanchas = async ({ nombre, capacidad, disponible }) => {
  try {
    const query =
      "INSERT INTO lanchas(nombre, capacidad, disponible) values($1, $2, $3) RETURNING *";
    const values = [nombre, capacidad, disponible];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo error con la función crearLanchas");
  }
};
//Crer ruta de intercentro
const crearRuta = async ({
  fecha,
  centro_origen_id,
  centro_destino_id,
  lancha_id,
  estado = "pendiente",
  comentarios,
}) => {
  try {
    const query = `
      INSERT INTO movimientosintercentro (
        fecha, centro_origen_id, centro_destino_id, lancha_id, estado, comentarios
      ) VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *;
    `;
    const values = [
      fecha,
      centro_origen_id,
      centro_destino_id,
      lancha_id,
      estado,
      comentarios,
    ];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error("Error al crear la ruta de intercentro:", error);
    throw new Error("Hubo un error al crear la ruta de intercentro");
  }
};
//Obtener rutas con usuarios y trabajadores
const obtenerRutasIntercentro = async () => {
  try {
    const query = `
      SELECT 
        mi.id AS movimiento_id,
        mi.fecha,
        mi.estado,
        mi.comentarios,
        co.nombre_centro AS centro_origen_nombre,
        cd.nombre_centro AS centro_destino_nombre,
        l.nombre AS lancha_nombre,
        COALESCE(
          json_agg(
            json_build_object(
              'usuario_id', u.id,
              'nombre', u.nombre,
              'email', u.email
            )
          ) FILTER (WHERE u.id IS NOT NULL),
          '[]'
        ) AS usuarios
      FROM movimientosintercentro mi
      LEFT JOIN centro co ON mi.centro_origen_id = co.id
      LEFT JOIN centro cd ON mi.centro_destino_id = cd.id
      LEFT JOIN lanchas l ON mi.lancha_id = l.id
      LEFT JOIN usuariosmovimientosintercentro umi ON umi.movimiento_id = mi.id
      LEFT JOIN usuarios u ON umi.usuario_id = u.id
      GROUP BY mi.id, co.nombre_centro, cd.nombre_centro, l.nombre;
    `;
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Hubo error con la función obtenerRutasIntercentro");
  }
};
//Solicitar una ruta, asi el usuario se inserta en las tablas respectivas
const solicitarRutaConUsuario = async ({
  movimiento_id,
  usuario_id,
  comentario,
  estado,
}) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Paso 1: Verificar el movimiento y obtener información relacionada
    const movimientoQuery = `
      SELECT lancha_id, centro_destino_id
      FROM movimientosintercentro
      WHERE id = $1
    `;
    const movimientoResult = await client.query(movimientoQuery, [
      movimiento_id,
    ]);

    if (movimientoResult.rows.length === 0) {
      throw new Error("Movimiento no encontrado o no tiene lancha asignada");
    }

    const { lancha_id: lanchaId, centro_destino_id: centroDestinoId } =
      movimientoResult.rows[0];

    // Paso 2: Verificar la capacidad actual de la lancha
    const capacidadQuery = `
      SELECT l.capacidad, COUNT(umi.usuario_id) AS usuarios_actuales
      FROM lanchas l
      LEFT JOIN usuariosmovimientosintercentro umi 
      ON umi.movimiento_id = $1 AND umi.estado = 'aprobado'
      WHERE l.id = $2
      GROUP BY l.capacidad;
    `;
    const capacidadResult = await client.query(capacidadQuery, [
      movimiento_id,
      lanchaId,
    ]);

    const { capacidad, usuarios_actuales } = capacidadResult.rows[0];
    const cuposDisponibles = capacidad - usuarios_actuales;

    if (cuposDisponibles <= 0) {
      throw new Error("No hay cupos disponibles en la lancha");
    }

    // Paso 3: Obtener el pontón asociado al centro destino
    const pontonQuery = `
      SELECT ponton_id
      FROM centro
      WHERE id = $1
    `;
    const pontonResult = await client.query(pontonQuery, [centroDestinoId]);

    if (pontonResult.rows.length === 0) {
      throw new Error("El centro destino no tiene un pontón asociado");
    }
    const pontonId = pontonResult.rows[0].ponton_id;

    // Paso 4: Registrar al usuario en el movimiento
    const movimientoInsertQuery = `
      INSERT INTO usuariosmovimientosintercentro (movimiento_id, usuario_id, estado, comentario)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const movimientoValues = [
      movimiento_id,
      usuario_id,
      estado || "pendiente",
      comentario,
    ];
    const movimientoInsertResult = await client.query(
      movimientoInsertQuery,
      movimientoValues
    );

    // Paso 5: Registrar al usuario en el pontón
    const pontonInsertQuery = `
      INSERT INTO usuarios_pontones (ponton_id, usuario_id, estado)
      VALUES ($1, $2, 'pendiente')
      RETURNING *;
    `;
    await client.query(pontonInsertQuery, [pontonId, usuario_id]);

    await client.query("COMMIT");

    return movimientoInsertResult.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(
      "Error al solicitar ruta y asociar usuario al pontón:",
      error
    );
    throw new Error("Hubo un error al procesar la solicitud de ruta");
  } finally {
    client.release();
  }
};

const aprobarSolicitud = async (solicitud_id) => {
  try {
    const query = `
      UPDATE usuariosmovimientosintercentro
      SET estado = 'aprobado'
      WHERE id = $1
      RETURNING *;
    `;
    const response = await pool.query(query, [solicitud_id]);
    return response.rows[0];
  } catch (error) {
    console.error("Error al aprobar la solicitud:", error);
    throw new Error("Hubo un error al aprobar la solicitud");
  }
};
const rechazarSolicitud = async (solicitudId) => {
  try {
    // Paso 1: Seleccionamos el movimiento y verificamos si es usuario o trabajador
    const solicitudQuery = `
      SELECT movimiento_id, usuario_id, trabajador_id
      FROM usuariosmovimientosintercentro
      WHERE id = $1 AND estado = 'pendiente';
    `;
    const solicitudResult = await pool.query(solicitudQuery, [solicitudId]);

    if (solicitudResult.rows.length === 0) {
      throw new Error("Solicitud no encontrada o ya procesada");
    }

    const { movimiento_id, usuario_id, trabajador_id } =
      solicitudResult.rows[0];

    // Paso 2: Cambiamos el estado de la solicitud a "rechazado"
    const updateQuery = `
      UPDATE usuariosmovimientosintercentro
      SET estado = 'rechazado'
      WHERE id = $1
      RETURNING movimiento_id, usuario_id, trabajador_id;
    `;
    const updateResponse = await pool.query(updateQuery, [solicitudId]);

    // Paso 3: Mantener la solicitud en la tabla, pero liberando el cupo de la lancha asociada
    const liberarCupoQuery = `
      UPDATE usuariosmovimientosintercentro
      SET movimiento_id = NULL
      WHERE id = $1 
      AND estado = 'rechazado';
    `;
    await pool.query(liberarCupoQuery, [solicitudId]);

    return {
      message: "Solicitud rechazada y cupo liberado de la lancha",
      solicitud: updateResponse.rows[0],
    };
  } catch (error) {
    console.error("Error al rechazar la solicitud:", error);
    throw new Error(
      "Hubo un error al rechazar la solicitud y liberar el cupo en la lancha"
    );
  }
};
//Finalizar el viaje de los intercentro y eliminar los usuarios asociados
const completarMovimiento = async (movimientoId) => {
  try {
    await pool.query(
      `UPDATE movimientosintercentro SET estado = 'completado' WHERE id = $1`,
      [movimientoId]
    );
    await pool.query(
      `DELETE FROM usuariosmovimientosintercentro WHERE movimiento_id = $1`,
      [movimientoId]
    );
    return { message: "Movimiento completado y lista de usuarios vaciada" };
  } catch (error) {
    console.error("Error al completar el movimiento:", error);
    throw new Error("Error al completar el movimiento");
  }
};
const obtenerSolicitudesIntercentro = async () => {
  try {
    const query = `
      SELECT umi.id AS solicitud_id,
             umi.movimiento_id,
             umi.usuario_id,
             umi.trabajador_id,
             umi.estado,
             umi.comentario,
             COALESCE(u.nombre, t.nombre) AS nombre,
             COALESCE(u.email, t.email) AS email,
             mi.fecha,
             mi.centro_origen_id,
             co.nombre_centro AS centro_origen_nombre,
             mi.centro_destino_id,
             cd.nombre_centro AS centro_destino_nombre,
             mi.estado AS estado_movimiento,
             l.nombre AS lancha_nombre
      FROM usuariosmovimientosintercentro umi
      LEFT JOIN usuarios u ON umi.usuario_id = u.id
      LEFT JOIN trabajadores t ON umi.trabajador_id = t.id
      JOIN movimientosintercentro mi ON umi.movimiento_id = mi.id
      LEFT JOIN lanchas l ON mi.lancha_id = l.id
      LEFT JOIN centro co ON mi.centro_origen_id = co.id
      LEFT JOIN centro cd ON mi.centro_destino_id = cd.id
    `;
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error("Error al obtener las solicitudes de intercentro:", error);
    throw new Error("Hubo un error al obtener las solicitudes de intercentro");
  }
};
const cancelarSolicitudUsuario = async (solicitudId) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Actualizar el estado de la solicitud a 'cancelado'
    const updateQuery = `
      UPDATE usuariosmovimientosintercentro
      SET estado = 'cancelado'
      WHERE id = $1
      RETURNING movimiento_id, usuario_id;
    `;
    const updateResponse = await client.query(updateQuery, [solicitudId]);
    if (updateResponse.rows.length === 0) {
      throw new Error("Solicitud no encontrada");
    }
    const { movimiento_id, usuario_id } = updateResponse.rows[0];

    // Eliminar al usuario de la lista de movimientos
    const deleteUserQuery = `
      DELETE FROM usuariosmovimientosintercentro
      WHERE movimiento_id = $1 AND usuario_id = $2 AND estado = 'cancelado';
    `;
    await client.query(deleteUserQuery, [movimiento_id, usuario_id]);

    // Obtener el pontón relacionado con el movimiento
    const pontonQuery = `
      SELECT c.ponton_id
      FROM movimientosintercentro m
      JOIN centro c ON m.centro_destino_id = c.id
      WHERE m.id = $1;
    `;
    const pontonResult = await client.query(pontonQuery, [movimiento_id]);
    if (pontonResult.rows.length === 0) {
      throw new Error("No se encontró un pontón asociado al movimiento");
    }
    const pontonId = pontonResult.rows[0].ponton_id;

    // Eliminar al usuario de la lista del pontón
    const deletePontonQuery = `
      DELETE FROM usuarios_pontones
      WHERE ponton_id = $1 AND usuario_id = $2;
    `;
    await client.query(deletePontonQuery, [pontonId, usuario_id]);

    await client.query("COMMIT");

    return {
      mensaje: "Solicitud cancelada y usuario eliminado de la lista del pontón",
      usuario_id,
      movimiento_id,
      ponton_id: pontonId,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(
      "Error al cancelar la solicitud del usuario y eliminarlo del pontón:",
      error
    );
    throw new Error(
      "Hubo un error al cancelar la solicitud y eliminar al usuario del pontón"
    );
  } finally {
    client.release();
  }
};

//Cancelar solitud de parte del contratista para su trabajador trabajador
const cancelarSolicitudTrabajador = async (solicitudId, contratistaId) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Obtener la solicitud y verificar permisos
    const solicitudQuery = `
      SELECT umi.movimiento_id, umi.trabajador_id, t.contratista_id, m.centro_destino_id
      FROM usuariosmovimientosintercentro umi
      JOIN trabajadores t ON umi.trabajador_id = t.id
      JOIN movimientosintercentro m ON umi.movimiento_id = m.id
      WHERE umi.id = $1 AND umi.estado = 'pendiente';
    `;
    const solicitudResult = await client.query(solicitudQuery, [solicitudId]);

    if (solicitudResult.rows.length === 0) {
      throw new Error("Solicitud no encontrada o ya procesada");
    }

    const { movimiento_id, trabajador_id, contratista_id, centro_destino_id } =
      solicitudResult.rows[0];

    if (contratista_id !== contratistaId) {
      throw new Error(
        "No tienes permiso para cancelar esta solicitud de trabajador"
      );
    }

    // Obtener el pontón asociado al centro destino
    const pontonQuery = `
      SELECT ponton_id
      FROM centro
      WHERE id = $1;
    `;
    const pontonResult = await client.query(pontonQuery, [centro_destino_id]);

    if (pontonResult.rows.length === 0) {
      throw new Error(
        "El centro destino no tiene un pontón asociado, no se puede completar la operación"
      );
    }

    const pontonId = pontonResult.rows[0].ponton_id;

    // Cancelar la solicitud
    const updateSolicitudQuery = `
      UPDATE usuariosmovimientosintercentro
      SET estado = 'cancelado'
      WHERE id = $1
      RETURNING *;
    `;
    await client.query(updateSolicitudQuery, [solicitudId]);

    // Eliminar al trabajador del movimiento
    const deleteWorkerQuery = `
      DELETE FROM usuariosmovimientosintercentro
      WHERE movimiento_id = $1 AND trabajador_id = $2 AND estado = 'cancelado';
    `;
    await client.query(deleteWorkerQuery, [movimiento_id, trabajador_id]);

    // Eliminar al trabajador del pontón
    const deletePontonQuery = `
      DELETE FROM usuarios_pontones
      WHERE ponton_id = $1 AND trabajador_id = $2;
    `;
    await client.query(deletePontonQuery, [pontonId, trabajador_id]);

    await client.query("COMMIT");
    return {
      message:
        "Solicitud de intercentro cancelada y trabajador eliminado del pontón exitosamente",
    };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error al cancelar la solicitud del trabajador:", error);
    throw new Error(
      "Hubo un error al cancelar la solicitud del trabajador y eliminarlo del pontón"
    );
  } finally {
    client.release();
  }
};

const obtenerSolicitudPorId = async (solicitudId) => {
  try {
    const query = "SELECT * FROM usuariosmovimientosintercentro WHERE id = $1";
    const response = await pool.query(query, [solicitudId]);
    return response.rows[0];
  } catch (error) {
    console.error("Error al cancelar la solicitud del usuario:", error);
    throw new Error(
      "Hubo un error al cancelar la solicitud y eliminar al usuario de la lancha"
    );
  }
};
export const IntercentroModel = {
  obtenerLanchas,
  crearLanchas,
  obtenerRutasIntercentro,
  crearRuta,
  solicitarRutaConUsuario,
  aprobarSolicitud,
  rechazarSolicitud,
  completarMovimiento,
  obtenerSolicitudesIntercentro,
  cancelarSolicitudUsuario,
  obtenerSolicitudPorId,
  cancelarSolicitudTrabajador,
};
