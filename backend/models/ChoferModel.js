import pool from "../config/db.js";

const crearChofer = async ({ nombre, telefono, email, vehiculo_id }) => {
  const query = `
    INSERT INTO choferes (nombre, telefono, email, vehiculo_id)
    VALUES ($1, $2, $3, $4) RETURNING *
  `;
  const values = [nombre, telefono, email, vehiculo_id];
  const response = await pool.query(query, values);
  return response.rows[0];
};
const obtenerChoferes = async()=>{
    const query = 'SELECT * FROM choferes'
    const response = await pool.query(query)
    return response.rows
}
const asignarChoferATrayecto = async (chofer_id, trayecto_id) => {
  const query = `
    INSERT INTO chofer_trayecto (chofer_id, trayecto_id)
    VALUES ($1, $2) RETURNING *
  `;
  const values = [chofer_id, trayecto_id];
  const response = await pool.query(query, values);
  return response.rows[0];
};
export const ChoferesModel = {
  crearChofer,
  obtenerChoferes,
  asignarChoferATrayecto,
};
