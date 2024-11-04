import pool from "../config/db.js";


const obtenerLanchas = async () => {
  try {
    const query = "SELECT * FROM lanchas";
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Hubo error con la función obtenerLanchas");
  }
};
const obtenerRutasIntercentro = async () => {
  try {
    const query = "SELECT * FROM movimientosintercentro";
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Hubo error con la función obtenerRutasIntercentro");
  }
};
const solicitarRuta = async ({
  movimiento_id,
  usuario_id,
  comentario,
  estado,
}) => {
  try {
    const query = `
      INSERT INTO UsuariosMovimientosIntercentro (movimiento_id, usuario_id, comentario, estado)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    const values = [movimiento_id, usuario_id, comentario, estado];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo error con la función solicitarRuta");
  }
};
const estadoSolicitud = async (solicitudId, nuevoEstado) => {
  try {
    const query = `
      UPDATE UsuariosMovimientosIntercentro
      SET estado = $1
      WHERE id = $2
      RETURNING *;
    `;
    const values = [nuevoEstado, solicitudId];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo error con la función estadoSolicitud");
  }
};
const cancelarSolicitud = async (solicitudId) => {
  try {
    const query =
      "DELETE FROM UsuariosMovimientosIntercentro WHERE id = $1 RETURNING *";
    const response = await pool.query(query, [solicitudId]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo error con la función cancelarSolicitud");
  }
};
export const IntercentroModel = {
  obtenerLanchas,
  obtenerRutasIntercentro,
  solicitarRuta,
  estadoSolicitud,
  cancelarSolicitud,
};
