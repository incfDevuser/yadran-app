import pool from "../config/db.js";
const obtenerCentros = async () => {
  try {
    const query = `
    SELECT c.*, p.nombre_ponton as nombre_ponton, r.nombre_ruta as nombre_ruta
    FROM centro c
    LEFT JOIN ponton p ON c.ponton_id = p.id
    LEFT JOIN rutas r ON c.ruta_id = r.id
    `;
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Error con la operacion obtenerCentros");
  }
};
const obtenerCentro = async (id) => {
  try {
    const query = `
    SELECT c.*, p.nombre_ponton as nombre_ponton, r.nombre_ruta as nombre_ruta
    FROM centro c
    LEFT JOIN ponton p ON c.ponton_id = p.id
    LEFT JOIN rutas r ON c.ruta_id = r.id
    WHERE c.id = $1
    `;
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error con la operacion obtenerCentro");
  }
};

const crearCentro = async ({
  nombre_centro,
  fecha_apertura_productiva,
  fecha_cierre_productivo,
  jefe_centro,
  etapa_ciclo_cultivo,
  estructura,
  ponton_id,
  ruta_id,
  latitud,
  longitud,
}) => {
  try {
    const query = `
    INSERT INTO centro(
    nombre_centro,
    fecha_apertura_productiva,
    fecha_cierre_productivo,
    jefe_centro,
    etapa_ciclo_cultivo,
    estructura, ponton_id, ruta_id, latitud, longitud) 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
    const values = [
      nombre_centro,
      fecha_apertura_productiva,
      fecha_cierre_productivo,
      jefe_centro,
      etapa_ciclo_cultivo,
      estructura,
      ponton_id,
      ruta_id,
      latitud,
      longitud,
    ];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error con la operación crearCentro");
  }
};
const actualizarCentro = async (id, camposActualizados) => {
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
      UPDATE centro
      SET ${setClause}
      WHERE id = $1
      RETURNING *;
    `;
    const response = await pool.query(query, [id, ...values]);
    return response.rows[0];
  } catch (error) {
    console.error("Error al actualizar el centro:", error.message);
    throw new Error("Error con la operación actualizarCentro");
  }
};
const eliminarCentro = async (id) => {
  try {
    const query = "DELETE FROM centro WHERE id = $1";
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error con la operacion eliminarCentro");
  }
};

export const CentrosModel = {
  obtenerCentros,
  obtenerCentro,
  crearCentro,
  actualizarCentro,
  eliminarCentro,
};
