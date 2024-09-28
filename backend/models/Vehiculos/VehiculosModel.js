import pool from "../../config/db.js";

const obtenerVehiculos = async () => {
  try {
    const query = `
      SELECT v.*, p.nombre_proveedor
      FROM vehiculos v
      JOIN proveedores p ON v.proveedor_id = p.id
    `;
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Error con la operación obtenerVehiculos");
  }
};

const obtenerVehiculo = async (id) => {
  try {
    const query = `
    SELECT v.*, p.nombre_proveedor
    FROM vehiculos v
    JOIN proveedores p ON v.proveedor_id = p.id
    WHERE v.id = $1
  `;
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error con la operación obtenerVehiculo");
  }
};

const crearVehiculo = async ({
  proveedor_id,
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
        proveedor_id, num_tripulantes, tipo_vehiculo, tipo_servicio,
        capacidad_total, capacidad_operacional, estado,
        documentacion_ok, velocidad_promedio
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
    `;
    const values = [
      proveedor_id,
      num_tripulantes,
      tipo_vehiculo,
      tipo_servicio,
      capacidad_total,
      capacidad_operacional,
      estado,
      documentacion_ok,
      velocidad_promedio,
    ];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error al crear el vehículo");
  }
};

const actualizarVehiculo = async (id, data) => {
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
