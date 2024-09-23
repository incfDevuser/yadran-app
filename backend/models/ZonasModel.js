import pool from "../config/db.js";

const obtenerZonas = async () => {
  try {
    const query = `
      SELECT z.*, r.nombre_ruta 
      FROM zonas z
      LEFT JOIN rutas r ON z.ruta_id = r.id
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
      SELECT z.*, r.nombre_ruta
      FROM zonas z
      LEFT JOIN rutas r ON z.ruta_id = r.id
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
  descripcion,
  ruta_id,
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
        descripcion,
        ruta_id
      ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *
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
      descripcion,
      ruta_id,
    ];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operación crearZona");
  }
};
const actualizarZona = async (id, data) => {
  try {
    const {
      nombre_zona,
      ubicacion_geografica,
      pais,
      region,
      fecha_apertura,
      fecha_cierre,
      jurisdiccion_id,
      estado_zona,
      descripcion,
      ruta_id,
    } = data;

    const query = `
      UPDATE zonas SET
        nombre_zona = $1, ubicacion_geografica = $2, pais = $3, region = $4,
        fecha_apertura = $5, fecha_cierre = $6, jurisdiccion_id = $7, estado_zona = $8,
        descripcion = $9, ruta_id = $10
      WHERE id = $11 RETURNING *
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
      descripcion,
      ruta_id,
      id,
    ];

    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
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
