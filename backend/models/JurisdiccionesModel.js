import pool from "../config/db.js";

//Obtener jurisdicciones
const obtenerJurisdicciones = async () => {
  try {
    const query = "SELECT * FROM jurisdiccion";
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Error con la operacion obtenerJurisdicciones");
  }
};
//Obtener jurisdiccion medianate el ID
const obtenerJurisdiccion = async (id) => {
  try {
    const query = "SELECT * FROM jurisdiccion WHERE id = $1";
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error con la operacion obtenerJurisdiccion");
  }
};
const crearJurisdiccion = async ({
  nombre_jurisdiccion,
  ubicacion_geografica,
  sectores,
  estado,
  tipo_embarcacion,
  contacto,
  integracion,
  fecha_ultima_modificacion
}) => {
  try {
    const query = `
      INSERT INTO jurisdiccion (
        nombre_jurisdiccion, 
        ubicacion_geografica, 
        sectores, 
        estado, 
        tipo_embarcacion, 
        contacto, 
        integracion,
        fecha_ultima_modificacion
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;

    const values = [
      nombre_jurisdiccion,
      ubicacion_geografica,
      sectores,
      estado,
      tipo_embarcacion,
      contacto,
      integracion,
      fecha_ultima_modificacion
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error al crear la jurisdicción:", error);
    throw new Error("Error con la operación crearJurisdiccion");
  }
};

//Actualizar una jurisdiccion
const actualizarJurisdiccion = async () => {
  try {
  } catch (error) {}
};
//Eliminar una jurisdiccion mediante el ID
const eliminarJurisdiccion = async (id) => {
  try {
    const query = "DELETE FROM jurisdiccion WHERE id = $1";
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error con la operacion eliminarJurisdiccion");
  }
};

export const JurisdiccionesModel = {
  obtenerJurisdicciones,
  obtenerJurisdiccion,
  crearJurisdiccion,
  actualizarJurisdiccion,
  eliminarJurisdiccion,
};
