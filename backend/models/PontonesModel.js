import pool from "../config/db.js";

//Obtener todos los pontones
const obtenerPontones = async () => {
  try {
    const query = `
    SELECT p.*, c.nombre_concesion AS nombre_concesion
    FROM ponton p
    LEFT JOIN concesion c ON p.concesion_id = c.id
    `;
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion obtenerPontones");
  }
};
//Obtener el ponton mediante el ID
const obtenerPonton = async (id) => {
  try {
    const query = `
    SELECT p.*, c.nombre_concesion AS nombre_concesion
    FROM ponton p
    LEFT JOIN concesion c ON p.concesion_id = c.id
    WHERE p.id = $1
    `;
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un erron con la operacion obtenerPonton");
  }
};
const crearPonton = async ({
  nombre_ponton,
  ubicacion,
  concesion_id,
  fecha_apertura_operacional,
  fecha_cierre_operacional,
  tipo_ponton,
  habitabilidad_general,
  habitabilidad_interna,
  habitabilidad_externa,
}) => {
  try {
    const query = `
      INSERT INTO ponton(
      nombre_ponton,
      ubicacion,
      concesion_id,
      fecha_apertura_operacional,
      fecha_cierre_operacional,
      tipo_ponton,
      habitabilidad_general,
      habitabilidad_interna,
      habitabilidad_externa) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
    `;
    const values = [
      nombre_ponton,
      ubicacion,
      concesion_id,
      fecha_apertura_operacional,
      fecha_cierre_operacional,
      tipo_ponton,
      habitabilidad_general,
      habitabilidad_interna,
      habitabilidad_externa,
    ];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion crearPonton");
  }
};
const actualizarPonton = async () => {
  try {
  } catch (error) {}
};
const eliminarPonton = async (id) => {
  try {
    const query = "DELETE FROM ponton WHERE id = $1";
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion eliminarPonton");
  }
};

export const PontonesModel = {
  obtenerPontones,
  obtenerPonton,
  crearPonton,
  actualizarPonton,
  eliminarPonton,
};
