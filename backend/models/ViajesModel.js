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
  try {
    const query = `
            INSERT INTO usuarios_viajes(usuario_id, viaje_id, fecha_inicio, fecha_fin, comentario_usuario, estado)
            VALUES ($1, $2, $3, $4, $5, 'Pendiente') RETURNING *
        `;
    const values = [
      usuario_id,
      viaje_id,
      fecha_inicio,
      fecha_fin,
      comentario_usuario,
    ];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error("Error al crear la solicitud de viaje:", error);
    throw new Error("Error con la solicitud de viaje");
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

export const ViajesModel = {
  crearViaje,
  solicitarViaje,
  obtenerViajes,
  aprobarRechazarViaje,
  obtenerSolicitudes,
};
