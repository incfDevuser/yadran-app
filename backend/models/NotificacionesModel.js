import pool from "../config/db.js";

const obtenerNotificaciones = async () => {
  try {
    const query = "SELECT * FROM notificaciones ORDER BY fecha_creacion DESC";
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion obtenerNotificaciones");
  }
};

const crearNotificacion = async ({ titulo, descripcion, tipo }) => {
  try {
    const query =
      "INSERT INTO notificaciones(titulo, descripcion, tipo) VALUES($1, $2, $3) RETURNING*";
    const values = [titulo, descripcion, tipo];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion crearNotificacion");
  }
};

const eliminarNotificacion = async (id) => {
  try {
    const query = "DELETE FROM notificaciones WHERE id = $1";
    const value = [id];
    await pool.query(query, value);
    return { message: "Notificación eliminada con éxito" };
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion eliminarNotificacion");
  }
};

const crearNotificacionGlobal = async ({ titulo, descripcion, tipo }) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    // Crear la notificación
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

    // Obtener todos los usuarios
    const queryUsuarios = `SELECT id FROM usuarios;`;
    const responseUsuarios = await client.query(queryUsuarios);
    const usuarios = responseUsuarios.rows;

    // Asignar la notificación a todos los usuarios
    const insertNotificacionUsuario = `
      INSERT INTO usuarios_notificaciones (usuario_id, notificacion_id, leido)
      VALUES ($1, $2, false);
    `;
    for (const usuario of usuarios) {
      await client.query(insertNotificacionUsuario, [
        usuario.id,
        nuevaNotificacion.id,
      ]);
    }

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
      SELECT n.*, un.leido 
      FROM usuarios_notificaciones un
      JOIN notificaciones n ON un.notificacion_id = n.id
      WHERE un.usuario_id = $1
      ORDER BY n.fecha_creacion DESC;
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
      UPDATE usuarios_notificaciones 
      SET leido = true
      WHERE usuario_id = $1 AND notificacion_id = $2
      RETURNING *;
    `;
    const values = [usuario_id, notificacion_id];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error al marcar la notificación como leída");
  }
};
export const NotificacionesModel = {
  obtenerNotificaciones,
  crearNotificacion,
  eliminarNotificacion,
  crearNotificacion,
  crearNotificacionGlobal,
  obtenerNotificacionesPorUsuario,
  marcarNotificacionComoLeida,
};
