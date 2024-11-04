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
const solicitarViaje = async ({
  usuario_id,
  viaje_id,
  fecha_inicio,
  fecha_fin,
  comentario_usuario,
}) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN"); // Inicia la transacción

    // 1. Inserta la solicitud de viaje en usuarios_viajes
    const querySolicitud = `
      INSERT INTO usuarios_viajes(usuario_id, viaje_id, fecha_inicio, fecha_fin, comentario_usuario, estado)
      VALUES ($1, $2, $3, $4, $5, 'Pendiente') RETURNING *
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
      SELECT id, vehiculo_id
      FROM trayectos
      WHERE ruta_id = (SELECT ruta_id FROM viajes WHERE id = $1)
    `;
    const responseTrayectos = await client.query(queryTrayectos, [viaje_id]);

    for (const trayecto of responseTrayectos.rows) {
      const queryVehiculoUsuario = `
        INSERT INTO vehiculo_usuarios (vehiculo_id, usuario_id, trayecto_id, estado)
        VALUES ($1, $2, $3, 'Pendiente')
      `;
      await client.query(queryVehiculoUsuario, [
        trayecto.vehiculo_id,
        usuario_id,
        trayecto.id,
      ]);
    }
    await client.query("COMMIT");
    return solicitud;
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error al crear la solicitud de viaje:", error);
    throw new Error("Error con la solicitud de viaje");
  } finally {
    client.release();
  }
};
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

const aprobarRechazarViaje = async (viaje_usuario_id, estado) => {
  try {
    const query = `
        UPDATE usuarios_viajes SET estado = $1, updated_at = NOW() WHERE id = $2 RETURNING *
      `;
    const values = [estado, viaje_usuario_id];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error("Error al actualizar el estado del viaje:", error);
    throw new Error("Error al actualizar el estado del viaje");
  }
};
//Obtener las solicitudes
const obtenerSolicitudes = async () => {
  try {
    const query = `
      SELECT 
        uv.*, 
        u.nombre AS nombre_usuario, 
        v.nombre AS nombre_viaje
      FROM usuarios_viajes uv
      JOIN usuarios u ON uv.usuario_id = u.id
      JOIN viajes v ON uv.viaje_id = v.id
    `;
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error("Error al obtener las solicitudes:", error);
    throw new Error("Error con la obtención de solicitudes");
  }
};
const eliminarViajeUsuario = async (viaje_usuario_id) => {
  const client = await pool.connect(); // Conexión para una transacción
  try {
    await client.query("BEGIN"); // Inicia la transacción

    // Obtener la solicitud de viaje para identificar usuario_id y viaje_id
    const querySolicitud = `
      SELECT usuario_id, viaje_id FROM usuarios_viajes WHERE id = $1
    `;
    const responseSolicitud = await client.query(querySolicitud, [
      viaje_usuario_id,
    ]);
    const solicitud = responseSolicitud.rows[0];

    if (!solicitud) {
      throw new Error("Solicitud de viaje no encontrada");
    }

    const { usuario_id, viaje_id } = solicitud;

    // 1. Eliminar la solicitud de viaje en `usuarios_viajes`
    await client.query("DELETE FROM usuarios_viajes WHERE id = $1", [
      viaje_usuario_id,
    ]);

    // 2. Eliminar las entradas en `vehiculo_usuarios` para liberar los cupos en trayectos
    await client.query(
      `DELETE FROM vehiculo_usuarios 
       WHERE usuario_id = $1 
       AND trayecto_id IN (
         SELECT id FROM trayectos WHERE ruta_id = (SELECT ruta_id FROM viajes WHERE id = $2)
       )`,
      [usuario_id, viaje_id]
    );

    await client.query("COMMIT"); // Confirma la transacción
    return { message: "Solicitud de viaje y cupos eliminados con éxito" };
  } catch (error) {
    await client.query("ROLLBACK"); // Revertir cambios en caso de error
    console.error(
      "Error al eliminar la solicitud de viaje y liberar cupos:",
      error
    );
    throw new Error("Error al eliminar la solicitud de viaje y liberar cupos");
  } finally {
    client.release();
  }
};

export const ViajesModel = {
  crearViaje,
  solicitarViaje,
  obtenerViajes,
  aprobarRechazarViaje,
  obtenerSolicitudes,
  eliminarViajeUsuario,
};
