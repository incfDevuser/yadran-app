import pool from "../config/db.js";

const obtenerZonas = async () => {
  try {
    const query = `
      SELECT z.*, j.nombre_jurisdiccion AS nombre_jurisdiccion
      FROM zonas z
      LEFT JOIN jurisdiccion j ON z.jurisdiccion_id = j.id
    `;
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Error con la operación obtenerZonas");
  }
};

const obtenerZona = async (id) => {
  try {
    const query = `
      SELECT z.*, j.nombre_jurisdiccion AS nombre_jurisdiccion
      FROM zonas z
      LEFT JOIN jurisdiccion j ON z.jurisdiccion_id = j.id
      WHERE z.id = $1
    `;
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error con la operación obtenerZona");
  }
};

const crearZona = async ({
  nombre_zona,
  ubicacion_geografica,
  pais,
  region,
  fecha_apertura,
  fecha_cierre,
  jurisdiccion_id,
  estado_zona,
  descripcion
}) => {
  try {
    const query = `
      INSERT INTO zonas(
        nombre_zona,
        ubicacion_geografica,
        pais,
        region,
        fecha_apertura,
        fecha_cierre,
        jurisdiccion_id,
        estado_zona,
        descripcion
      ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
    `;
    const values = [
      nombre_zona,
      ubicacion_geografica,
      pais,
      region,
      fecha_apertura,
      fecha_cierre,
      jurisdiccion_id,
      estado_zona,
      descripcion
    ];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operación crearZona");
  }
};
const actualizarZona = async (id, data) => {
};
const eliminarZona = async (id) => {
  try {
    const query = "DELETE FROM zonas WHERE id = $1 RETURNING *";
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operación eliminarZona");
  }
};

export const ZonasModel = {
  obtenerZonas,
  obtenerZona,
  crearZona,
  actualizarZona,
  eliminarZona,
};
