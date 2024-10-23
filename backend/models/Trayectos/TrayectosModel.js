import pool from "../../config/db.js";

const obtenerTrayectos = async () => {
  try {
    const query = "SELECT * FROM trayectos";
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Error con la operación obtenerTrayectos");
  }
};
const obtenerTrayecto = async (id) => {
  try {
    const query = "SELECT * FROM trayectos WHERE id = $1";
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error con la operación obtenerTrayecto");
  }
};
const crearTrayecto = async ({
  ruta_id,
  origen,
  destino,
  duracion_estimada,
  orden,
  estado,
  vehiculo_id,
}) => {
  try {
    const query = `
        INSERT INTO trayectos (
          ruta_id, origen, destino, duracion_estimada, orden, estado, vehiculo_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
      `;
    const values = [
      ruta_id,
      origen,
      destino,
      duracion_estimada,
      orden,
      estado,
      vehiculo_id,
    ];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error al crear el trayecto");
  }
};

const actualizarTrayecto = async () => {};

const eliminarTrayecto = async (id) => {
  try {
    const query = "DELETE FROM trayectos WHERE id = $1 RETURNING *";
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error al eliminar el trayecto");
  }
};

export const TrayectosModel = {
  obtenerTrayectos,
  obtenerTrayecto,
  crearTrayecto,
  actualizarTrayecto,
  eliminarTrayecto,
};
