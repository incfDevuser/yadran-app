import pool from "../config/db.js";

const obtenerNotificaciones = async () => {
  try {
    const query = `
      SELECT * 
      FROM notificaciones 
      ORDER BY fecha_creacion DESC
    `;
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operación obtenerNotificaciones");
  }
};

const crearNotificacion = async ({
  titulo,
  descripcion,
  tipo,
  destinatario_id = null,
}) => {
  try {
    const query = `
      INSERT INTO notificaciones (titulo, descripcion, tipo, destinatario_id) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *;
    `;
    const values = [titulo, descripcion, tipo, destinatario_id];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operación crearNotificacion");
  }
};

const eliminarNotificacion = async (id) => {
  try {
    const query = `
      DELETE FROM notificaciones 
      WHERE id = $1
    `;
    const values = [id];
    await pool.query(query, values);
    return { message: "Notificación eliminada con éxito" };
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operación eliminarNotificacion");
  }
};

const crearNotificacionGlobal = async ({ titulo, descripcion, tipo }) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Crear la notificación global
    const queryNotificacion = `
      INSERT INTO notificaciones (titulo, descripcion, tipo) 
      VALUES ($1, $2, $3) 
      RETURNING *;
    `;
    const valuesNotificacion = [titulo, descripcion, tipo];
    const responseNotificacion = await client.query(
      queryNotificacion,
      valuesNotificacion
    );
    const nuevaNotificacion = responseNotificacion.rows[0];

    await client.query("COMMIT");
    return nuevaNotificacion;
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error);
    throw new Error("Error al crear la notificación global");
  } finally {
    client.release();
  }
};

const obtenerNotificacionesPorUsuario = async (usuario_id) => {
  try {
    const query = `
      SELECT * 
      FROM notificaciones 
      WHERE destinatario_id IS NULL OR destinatario_id = $1 
      ORDER BY fecha_creacion DESC;
    `;
    const response = await pool.query(query, [usuario_id]);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener las notificaciones del usuario");
  }
};

const marcarNotificacionComoLeida = async ({ usuario_id, notificacion_id }) => {
  try {
    const query = `
      UPDATE notificaciones 
      SET estado = 'leída' 
      WHERE id = $1 AND destinatario_id = $2 
      RETURNING *;
    `;
    const values = [notificacion_id, usuario_id];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error al marcar la notificación como leída");
  }
};
const actualizarNotificacion = async (id, campos) => {
  try {
    // Construir las partes dinámicas del query
    const columnas = Object.keys(campos)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");
    const valores = Object.values(campos);

    // Agregar el ID al final de los valores
    valores.push(id);

    const query = `
      UPDATE notificaciones 
      SET ${columnas}
      WHERE id = $${valores.length} 
      RETURNING *;
    `;

    const response = await pool.query(query, valores);
    return response.rows[0];
  } catch (error) {
    console.error("Error al actualizar la notificación:", error);
    throw new Error("Error al actualizar la notificación");
  }
};

export const NotificacionesModel = {
  obtenerNotificaciones,
  actualizarNotificacion,
  crearNotificacion,
  eliminarNotificacion,
  crearNotificacionGlobal,
  obtenerNotificacionesPorUsuario,
  marcarNotificacionComoLeida,
};
