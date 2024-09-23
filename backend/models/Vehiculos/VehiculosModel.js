import pool from '../../config/db.js'

const obtenerVehiculos = async () => {
  try {
    const query = "SELECT * FROM vehiculos";
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Error con la operación obtenerVehiculos");
  }
};

const obtenerVehiculo = async (id) => {
  try {
    const query = "SELECT * FROM vehiculos WHERE id = $1";
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error con la operación obtenerVehiculo");
  }
};

const crearVehiculo = async ({
  proveedor,
  num_tripulantes,
  tipo_vehiculo,
  tipo_servicio,
  capacidad_total,
  capacidad_operacional,
  estado,
  documentacion_ok,
  velocidad_promedio,
}) => {
  try {
    const query = `
      INSERT INTO vehiculos (
        proveedor, num_tripulantes, tipo_vehiculo, tipo_servicio,
        capacidad_total, capacidad_operacional, estado,
        documentacion_ok, velocidad_promedio
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
    `;
    const values = [
      proveedor, num_tripulantes, tipo_vehiculo, tipo_servicio,
      capacidad_total, capacidad_operacional, estado,
      documentacion_ok, velocidad_promedio
    ];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error al crear el vehículo");
  }
};

const actualizarVehiculo = async (id, data) => {
  try {
    const {
      proveedor, num_tripulantes, tipo_vehiculo, tipo_servicio,
      capacidad_total, capacidad_operacional, estado,
      documentacion_ok, velocidad_promedio
    } = data;

    const query = `
      UPDATE vehiculos SET
        proveedor = $1, num_tripulantes = $2, tipo_vehiculo = $3, tipo_servicio = $4,
        capacidad_total = $5, capacidad_operacional = $6, estado = $7,
        documentacion_ok = $8, velocidad_promedio = $9
      WHERE id = $10 RETURNING *
    `;
    const values = [
      proveedor, num_tripulantes, tipo_vehiculo, tipo_servicio,
      capacidad_total, capacidad_operacional, estado,
      documentacion_ok, velocidad_promedio, id
    ];

    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error al actualizar el vehículo");
  }
};

const eliminarVehiculo = async (id) => {
  try {
    const query = "DELETE FROM vehiculos WHERE id = $1 RETURNING *";
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error al eliminar el vehículo");
  }
};

export const VehiculosModel = {
  obtenerVehiculos,
  obtenerVehiculo,
  crearVehiculo,
  actualizarVehiculo,
  eliminarVehiculo,
};
