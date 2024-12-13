import pool from "../config/db.js";
const obtenerAeropuertos = async () => {
  try {
    const query = `
    SELECT a.*, j.nombre_jurisdiccion AS nombre_jurisdiccion
    FROM aeropuerto a
    LEFT JOIN jurisdiccion j ON a.jurisdiccion_id = j.id
    `;
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error("Error al obtener los aeropuertos:", error);
    throw new Error("Error con la operación obtenerAeropuertos");
  }
};
const obtenerAeropuerto = async (id) => {
  try {
    const query = `
     SELECT a.*, j.nombre_jurisdiccion AS nombre_jurisdiccion
    FROM aeropuerto a
    LEFT JOIN jurisdiccion j ON a.jurisdiccion_id = j.id
    WHERE a.id = $1
    `;
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error("Error al obtener el aeropuerto:", error);
    throw new Error("Error con la operación obtenerAeropuerto");
  }
};

const crearAeropuerto = async ({
  nombre_aeropuerto,
  ubicacion_aeropuerto,
  localidad,
  jurisdiccion_id,
  estado,
}) => {
  try {
    const query = `
        INSERT INTO aeropuerto (nombre_aeropuerto, ubicacion_aeropuerto, localidad, jurisdiccion_id, estado)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;
    const values = [
      nombre_aeropuerto,
      ubicacion_aeropuerto,
      localidad,
      jurisdiccion_id,
      estado,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error al crear el aeropuerto:", error);
    throw new Error("Error con la operación crearAeropuerto");
  }
};
const actualizarAeropuerto = async (id, camposActualizados) => {
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
      UPDATE aeropuerto
      SET ${setClause}
      WHERE id = $1
      RETURNING *;
    `;
    const response = await pool.query(query, [id, ...values]);
    return response.rows[0];
  } catch (error) {
    console.error("Error al actualizar el aeropuerto:", error.message);
    throw new Error("Error con la operación actualizarAeropuerto");
  }
};
const eliminarAeropuerto = async (id) => {
  try {
    const query = "DELETE FROM aeropuerto WHERE id = $1 RETURNING *;";
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error("Error al eliminar el aeropuerto:", error);
    throw new Error("Error con la operación eliminarAeropuerto");
  }
};
export const AeropuertosModel = {
  obtenerAeropuertos,
  obtenerAeropuerto,
  crearAeropuerto,
  actualizarAeropuerto,
  eliminarAeropuerto,
};
