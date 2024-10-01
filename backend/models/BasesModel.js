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
const crearBase = async ({ nombre_base, jefe_base }) => {
  try {
    const query =
      "INSERT INTO base(nombre_base, jefe_base) VALUES($1, $2) RETURNING*";
    const values = [nombre_base, jefe_base];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion crearBase");
  }
};
const actualizarBase = async () => {
  try {
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion actualizarBase");
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
