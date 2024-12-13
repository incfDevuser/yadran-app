import pool from "../config/db.js";

const obtenerBases = async () => {
  try {
    const query = `
    SELECT b.*, p.nombre_ponton AS nombre_ponton
    FROM base b
    LEFT JOIN ponton p ON b.ponton_id = p.id
    `;
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion obtenerBases");
  }
};
const obtenerBase = async (id) => {
  try {
    const query = `
     SELECT b.*, p.nombre_ponton AS nombre_ponton
    FROM base b
    LEFT JOIN ponton p ON b.ponton_id = p.id
    WHERE b.id = $1
    `;
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion obtenerBase");
  }
};
const crearBase = async ({ nombre_base, jefe_base, ponton_id }) => {
  try {
    const query =
      "INSERT INTO base(nombre_base, jefe_base, ponton_id) VALUES($1, $2, $3) RETURNING*";
    const values = [nombre_base, jefe_base, ponton_id];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion crearBase");
  }
};
const actualizarBase = async (id, camposActualizados) => {
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
      UPDATE base
      SET ${setClause}
      WHERE id = $1
      RETURNING *;
    `;
    const response = await pool.query(query, [id, ...values]);
    return response.rows[0];
  } catch (error) {
    console.error("Error al actualizar la base:", error.message);
    throw new Error("Error con la operación actualizarBase");
  }
};

const eliminarBase = async () => {
  try {
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion eliminarBase");
  }
};

export const BasesModel = {
  obtenerBases,
  obtenerBase,
  crearBase,
  actualizarBase,
  eliminarBase,
};
