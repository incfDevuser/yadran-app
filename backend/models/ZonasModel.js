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
  pais,
  region,
  jurisdiccion_id,
  estado_zona,
  descripcion,
}) => {
  try {
    const query = `
      INSERT INTO zonas(
        nombre_zona,
        pais,
        region,
        jurisdiccion_id,
        estado_zona,
        descripcion
      ) VALUES($1, $2, $3, $4, $5, $6) RETURNING *
    `;
    const values = [
      nombre_zona,
      pais,
      region,
      jurisdiccion_id,
      estado_zona,
      descripcion,
    ];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operación crearZona");
  }
};
const actualizarZona = async (id, camposActualizados) => {
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
      UPDATE zonas
      SET ${setClause}
      WHERE id = $1
      RETURNING *;
    `;
    const response = await pool.query(query, [id, ...values]);
    return response.rows[0];
  } catch (error) {
    console.error("Error al actualizar la zona:", error);
    throw new Error("Hubo un error con la operación actualizarZona");
  }
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
