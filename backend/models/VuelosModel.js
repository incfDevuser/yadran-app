import pool from "../config/db.js";

const obtenerVuelos = async () => {
  try {
    const query = "SELECT * FROM vuelos";
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Error en la funcion obtenerVuelos");
  }
};
const obtenerVueloPorNumero = async (numero_vuelo) => {
  try {
    const query = "SELECT * FROM vuelos WHERE numero_vuelo = $1";
    const values = [numero_vuelo];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error en la operacion obtenerVueloPorNumero");
  }
};
const obtenerVehiculoPorNombre = async (nombre_vehiculo) => {
  try {
    const query = "SELECT * FROM vehiculos WHERE tipo_vehiculo = $1";
    const values = [nombre_vehiculo];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener el vehículo por nombre");
  }
};
const insertarVehiculo = async (nombre_vehiculo) => {
  try {
    const query = `
      INSERT INTO vehiculos (tipo_vehiculo, tipo_servicio, num_tripulantes, capacidad_total, capacidad_operacional, estado, documentacion_ok, velocidad_promedio)
      VALUES ($1, 'Aerolínea', 2, 100, 90, 'Operativo', true, 900) RETURNING *`;
    const values = [nombre_vehiculo];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error al insertar un nuevo vehículo");
  }
};
const insertarVueloComoTrayecto = async (vuelo, ruta_id) => {
  try {
    let vehiculo = await obtenerVehiculoPorNombre(vuelo.aerolinea);
    if (!vehiculo) {
      vehiculo = await insertarVehiculo(vuelo.aerolinea);
    }
    const query = `
      INSERT INTO trayectos (
        ruta_id, origen, destino, duracion_estimada, orden, estado, vehiculo_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
    `;

    const values = [
      ruta_id,
      vuelo.aeropuerto_salida,
      vuelo.aeropuerto_llegada,
      vuelo.duracion_estimada,
      1,
      vuelo.estado_vuelo,
      vehiculo.id,
    ];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error("Error al insertar el vuelo como trayecto:", error.message);
    throw new Error("No se pudo insertar el vuelo como trayecto.");
  }
};

export const VuelosModel = {
  obtenerVuelos,
  obtenerVueloPorNumero,
  insertarVueloComoTrayecto,
  obtenerVehiculoPorNombre,
  insertarVehiculo,
};
