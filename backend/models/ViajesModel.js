import pool from "../config/db.js";

const solicitarViaje = async ({
  usuario_id,
  ruta_id,
  fecha_inicio,
  fecha_fin,
  estado,
  actividad,
  comentario_usuario,
}) => {
  try {
    const query = `
            INSERT INTO viajes(usuario_id, ruta_id, fecha_inicio, fecha_fin, estado, actividad, comentario_usuario)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
        `;
    const values = [
      usuario_id,
      ruta_id,
      fecha_inicio,
      fecha_fin,
      estado,
      actividad,
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
          u.nombre, 
          u.email, 
          json_agg(
            json_build_object(
              'id', t.id,
              'origen', t.origen,
              'destino', t.destino,
              'duracion_estimada', t.duracion_estimada,
              'orden', t.orden,
              'vehiculo_id', t.vehiculo_id,
              'nombre_vehiculo', veh.tipo_vehiculo 
            )
          ) AS trayectos
        FROM viajes v
        JOIN usuarios u ON v.usuario_id = u.id
        JOIN trayectos t ON v.ruta_id = t.ruta_id
        JOIN vehiculos veh ON t.vehiculo_id = veh.id 
        GROUP BY v.id, u.nombre, u.email
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

const aprobarRechazarViaje = async (viaje_id, estado) => {
  try {
    const query = `
        UPDATE viajes SET estado = $1, updated_at = NOW() WHERE id = $2 RETURNING *
      `;
    const values = [estado, viaje_id];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error("Error al actualizar el estado del viaje:", error);
    throw new Error("Error al actualizar el estado del viaje");
  }
};
export const ViajesModel = {
  solicitarViaje,
  obtenerViajes,
  aprobarRechazarViaje,
};
