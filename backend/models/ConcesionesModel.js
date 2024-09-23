import pool from "../config/db.js";

const obtenerConcesiones = async () => {
  try {
    const query = "SELECT * FROM concesion";
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error en la operacion obtenerConcesiones");
  }
};
const obtenerConcesion = async (id) => {
  try {
    const query = "SELECT * FROM concesion WHERE id = $1";
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion obtenerConcesion");
  }
};
const crearConcesion = async ({ nombre_concesion,vigencia, zona_id }) => {
  try {
    const query =
      "INSERT INTO concesion(nombre_concesion,vigencia, zona_id) VALUES($1, $2, $3) RETURNING *";
    const values = [nombre_concesion,vigencia, zona_id];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion crearConcesion");
  }
};
const actualizarConcesion = async () => {
  try {
  } catch (error) {}
};
const eliminarConcesion = async (id) => {
  try {
    const query = "DELETE FROM concesion WHERE id = $1 RETURNING *";
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion eliminarConcesion");
  } 
};

export const ConcesionesModel = {
  obtenerConcesiones,
  obtenerConcesion,
  crearConcesion,
  actualizarConcesion,
  eliminarConcesion,
};
