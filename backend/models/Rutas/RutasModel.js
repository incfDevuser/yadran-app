import pool from '../../config/db.js'

const obtenerRutas = async () => {
  try {
    const query = "SELECT * FROM rutas";
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Error con la operación obtenerRutas");
  }
};

const obtenerRuta = async (id) => {
  try {
    const query = "SELECT * FROM rutas WHERE id = $1";
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error con la operación obtenerRuta");
  }
};

const crearRuta = async ({
  nombre_ruta,
  zona,
  origen,
  destino,
  escalas,
  tiempo_estimado,
  mov_interno,
  fecha_agendamiento,
}) => {
  try {
    const query = `
      INSERT INTO rutas (
        nombre_ruta, zona, origen, destino, escalas, 
        tiempo_estimado, mov_interno, fecha_agendamiento
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
    `;
    const values = [
      nombre_ruta, zona, origen, destino, escalas,
      tiempo_estimado, mov_interno, fecha_agendamiento
    ];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error al crear la ruta");
  }
};

const actualizarRuta = async (id, data) => {
  try {
    const {
      nombre_ruta, zona, origen, destino, escalas,
      tiempo_estimado, mov_interno, fecha_agendamiento
    } = data;

    const query = `
      UPDATE rutas SET
        nombre_ruta = $1, zona = $2, origen = $3, destino = $4, escalas = $5,
        tiempo_estimado = $6, mov_interno = $7, fecha_agendamiento = $8
      WHERE id = $9 RETURNING *
    `;
    const values = [
      nombre_ruta, zona, origen, destino, escalas,
      tiempo_estimado, mov_interno, fecha_agendamiento, id
    ];

    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error al actualizar la ruta");
  }
};

const eliminarRuta = async (id) => {
  try {
    const query = "DELETE FROM rutas WHERE id = $1 RETURNING *";
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error al eliminar la ruta");
  }
};
//Obtener las rutas con los vehiculos asociados
const obtenerRutasConVehiculos = async () => {
  try {
    const query = `
      SELECT r.*, json_agg(v.*) AS vehiculos
      FROM rutas r
      LEFT JOIN rutas_vehiculos rv ON r.id = rv.ruta_id
      LEFT JOIN vehiculos v ON rv.vehiculo_id = v.id
      GROUP BY r.id
    `;
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Error con la operación obtenerRutasConVehiculos");
  }
};
//Obtener la ruta con sus vehiculos asociados
const obtenerRutaConVehiculos = async (id) => {
  try {
    const query = `
      SELECT r.*, json_agg(v.*) AS vehiculos
      FROM rutas r
      LEFT JOIN rutas_vehiculos rv ON r.id = rv.ruta_id
      LEFT JOIN vehiculos v ON rv.vehiculo_id = v.id
      WHERE r.id = $1
      GROUP BY r.id
    `;
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error con la operación obtenerRutaConVehiculos");
  }
};
//Asociar vehiculos a un ruta
const asociarVehiculoARuta = async (ruta_id, vehiculo_id) => {
  try {
    const query = `
      INSERT INTO rutas_vehiculos (ruta_id, vehiculo_id)
      VALUES ($1, $2) RETURNING *
    `;
    const response = await pool.query(query, [ruta_id, vehiculo_id]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error al asociar vehículo con ruta");
  }
};

export const RutasModel = {
  obtenerRutas,
  obtenerRuta,
  crearRuta,
  actualizarRuta,
  eliminarRuta,
  obtenerRutasConVehiculos,
  obtenerRutaConVehiculos,
  asociarVehiculoARuta
};
