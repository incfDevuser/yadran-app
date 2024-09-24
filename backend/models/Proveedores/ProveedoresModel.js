import pool from "../../config/db.js";

// Obtener todos los proveedores
const obtenerProveedoresConVehiculos = async () => {
  try {
    const query = `
      SELECT p.*, 
      COALESCE(
        json_agg(
          json_build_object(
            'id', v.id,
            'num_tripulantes', v.num_tripulantes,
            'tipo_vehiculo', v.tipo_vehiculo,
            'tipo_servicio', v.tipo_servicio,
            'capacidad_total', v.capacidad_total,
            'capacidad_operacional', v.capacidad_operacional,
            'estado', v.estado,
            'documentacion_ok', v.documentacion_ok,
            'velocidad_promedio', v.velocidad_promedio
          )
        ) FILTER (WHERE v.id IS NOT NULL), '[]'
      ) AS vehiculos
      FROM proveedores p
      LEFT JOIN vehiculos v ON p.id = v.proveedor_id
      GROUP BY p.id;
    `;
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error("Error al obtener proveedores con vehículos:", error);
    throw error;
  }
};

// Obtener un proveedor con sus vehículos
const obtenerProveedorConVehiculos = async ({ nombre_proveedor, rut }) => {
  try {
    const query = `
      SELECT p.*, 
      json_agg(
        json_build_object(
          'id', v.id,
          'num_tripulantes', v.num_tripulantes,
          'tipo_vehiculo', v.tipo_vehiculo,
          'tipo_servicio', v.tipo_servicio,
          'capacidad_total', v.capacidad_total,
          'capacidad_operacional', v.capacidad_operacional,
          'estado', v.estado,
          'documentacion_ok', v.documentacion_ok,
          'velocidad_promedio', v.velocidad_promedio
        )
      ) AS vehiculos
      FROM proveedores p
      LEFT JOIN vehiculos v ON p.id = v.proveedor_id
      WHERE p.nombre_proveedor = $1 AND p.rut = $2
      GROUP BY p.id;
    `;
    const values = [nombre_proveedor, rut];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error("Error al obtener el proveedor con vehículos:", error);
    throw error;
  }
};

// Crear un nuevo proveedor
const crearProveedor = async ({
  nombre_proveedor,
  rut,
  encargado,
  contacto,
  email_encargado,
  telefono_encargado,
  representante_interno,
  estado = "Activo",
  tipo_servicio,
  ciclo_cultivo,
  tarea_realizar,
  fecha_termino_servicio,
  frecuencia_servicio,
  descripcion_servicio,
  cantidad_usuarios_autorizados,
}) => {
  try {
    const query = `INSERT INTO proveedores 
    (nombre_proveedor, rut, encargado, contacto, email_encargado, telefono_encargado, representante_interno, estado, tipo_servicio, ciclo_cultivo, tarea_realizar, fecha_termino_servicio, frecuencia_servicio, descripcion_servicio, cantidad_usuarios_autorizados) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`;
    const values = [
      nombre_proveedor,
      rut,
      encargado,
      contacto,
      email_encargado,
      telefono_encargado,
      representante_interno,
      estado,
      tipo_servicio,
      ciclo_cultivo,
      tarea_realizar,
      fecha_termino_servicio,
      frecuencia_servicio,
      descripcion_servicio,
      cantidad_usuarios_autorizados,
    ];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error("Error al crear el proveedor:", error);
    throw error;
  }
};

// Eliminar un proveedor por ID
const eliminarProveedor = async (id) => {
  try {
    const query = "DELETE FROM proveedores WHERE id = $1 RETURNING *";
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error("Error al eliminar el proveedor:", error);
    throw error;
  }
};

export const ProveedoresModel = {
  obtenerProveedoresConVehiculos,
  obtenerProveedorConVehiculos,
  crearProveedor,
  eliminarProveedor,
};
