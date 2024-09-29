import pool from "../config/db.js";

const obtenerPuertos = async () => {
  try {
    const query = `
    SELECT p.*, j.nombre_jurisdiccion AS nombre_jurisdiccion
    FROM puerto p
    LEFT JOIN jurisdiccion j ON p.jurisdiccion_id = j.id
    `;
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error("Error al obtener los puertos:", error);
    throw new Error("Error con la operación obtenerPuertos");
  }
};

const obtenerPuerto = async (id) => {
  try {
    const query = `
    SELECT p.*, j.nombre_jurisdiccion AS nombre_jurisdiccion
    FROM puerto p
    LEFT JOIN jurisdiccion j ON p.jurisdiccion_id = j.id
    WHERE p.id = $1
    `;
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error("Error al obtener el puerto:", error);
    throw new Error("Error con la operación obtenerPuerto");
  }
};
const crearPuerto = async ({
  nombre_puerto,
  ubicacion_puerto,
  localidad,
  jurisdiccion_id,
  estado,
}) => {
  try {
    const query = `
      INSERT INTO puerto (nombre_puerto, ubicacion_puerto, localidad, jurisdiccion_id, estado)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [
      nombre_puerto,
      ubicacion_puerto,
      localidad,
      jurisdiccion_id,
      estado,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error al crear el puerto:", error);
    throw new Error("Error con la operación crearPuerto");
  }
};

const actualizarPuerto = async () => {};

const eliminarPuerto = async (id) => {
  try {
    const query = "DELETE FROM puerto WHERE id = $1 RETURNING *;";
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error("Error al eliminar el puerto:", error);
    throw new Error("Error con la operación eliminarPuerto");
  }
};

export const PuertosModel = {
  obtenerPuertos,
  obtenerPuerto,
  crearPuerto,
  actualizarPuerto,
  eliminarPuerto,
};
