import pool from "../config/db.js";

const obtenerConcesiones = async () => {
  try {
    const query = `
    SELECT c.*, z.nombre_zona AS nombre_zona 
    FROM concesion c 
    LEFT JOIN zonas z ON c.zona_id = z.id
    `;
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error en la operacion obtenerConcesiones");
  }
};
const obtenerConcesion = async (id) => {
  try {
    const query = `
      SELECT c.*, z.nombre_zona AS nombre_zona
      FROM concesion c
      LEFT JOIN zonas z ON c.zona_id = z.id
      WHERE c.id = $1
    `;
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion obtenerConcesion");
  }
};
const crearConcesion = async ({ nombre_concesion, zona_id }) => {
  try {
    const query =
      "INSERT INTO concesion(nombre_concesion, zona_id) VALUES($1, $2 ) RETURNING *";
    const values = [nombre_concesion, zona_id];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion crearConcesion");
  }
};
const actualizarConcesion = async (id, camposActualizados) => {
  try {
    const keys = Object.keys(camposActualizados);
    const values = Object.values(camposActualizados);
    if (keys.length === 0) {
      throw new Error("No se proporcionaron campos para actualizar.");
    }
    const setClause = keys
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ");

    const query = `
      UPDATE concesion
      SET ${setClause}
      WHERE id = $1
      RETURNING *;
    `;
    const response = await pool.query(query, [id, ...values]);
    return response.rows[0];
  } catch (error) {
    console.error("Error al actualizar la concesión:", error);
    throw new Error("Hubo un error con la operación actualizarConcesion");
  }
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
