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
            'velocidad_promedio', v.velocidad_promedio,
            'nombre_chofer', c.nombre,
            'email_chofer', c.email,
            'trayectos', (
              SELECT json_agg(
                json_build_object(
                  'trayecto_id', t.id,
                  'origen', t.origen,
                  'destino', t.destino,
                  'duracion_estimada', t.duracion_estimada,
                  'capacidad_ocupada', 
                    (SELECT COUNT(vu.usuario_id) 
                     FROM vehiculo_usuarios vu 
                     WHERE vu.trayecto_id = t.id AND vu.estado = 'Confirmado'),
                  'capacidad_reservada', 
                    (SELECT COUNT(vu.usuario_id) 
                     FROM vehiculo_usuarios vu 
                     WHERE vu.trayecto_id = t.id AND vu.estado = 'Pendiente'),
                  'cupos_disponibles', 
                    v.capacidad_operacional - 
                    (SELECT COUNT(vu.usuario_id) 
                     FROM vehiculo_usuarios vu 
                     WHERE vu.trayecto_id = t.id AND vu.estado = 'Confirmado') -
                    (SELECT COUNT(vu.usuario_id) 
                     FROM vehiculo_usuarios vu 
                     WHERE vu.trayecto_id = t.id AND vu.estado = 'Pendiente'),
                  'usuarios', (
                    SELECT json_agg(
                      json_build_object(
                        'usuario_id', u.id,
                        'nombre', u.nombre,
                        'email', u.email,
                        'estado', vu.estado
                      )
                    )
                    FROM vehiculo_usuarios vu
                    JOIN usuarios u ON vu.usuario_id = u.id
                    WHERE vu.trayecto_id = t.id
                  )
                )
              )
              FROM trayectos t
              WHERE t.vehiculo_id = v.id
            )
          )
        ) FILTER (WHERE v.id IS NOT NULL), '[]'
      ) AS vehiculos
      FROM proveedores p
      LEFT JOIN vehiculos v ON p.id = v.proveedor_id
      LEFT JOIN choferes c ON v.chofer_id = c.id -- Unión para obtener la información del chofer
      GROUP BY p.id;
    `;
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error(
      "Error al obtener proveedores con vehículos y trayectos:",
      error
    );
    throw error;
  }
};

//Obtener un proveedor con sus vehículos
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
  representante_interno,
  estado = "Activo",
  tipo_servicio,
  ciclo_cultivo,
  tarea_realizar,
  duracion,
  frecuencia_servicio
}) => {
  try {
    const query = `
      INSERT INTO proveedores 
      (
        nombre_proveedor, rut, encargado, contacto, email_encargado, representante_interno, estado, tipo_servicio, 
        ciclo_cultivo, tarea_realizar, duracion, frecuencia_servicio
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 ) 
      RETURNING *;
    `;
    const values = [
      nombre_proveedor,
      rut,
      encargado,
      contacto,
      email_encargado,
      representante_interno,
      estado,
      tipo_servicio,
      ciclo_cultivo,
      tarea_realizar,
      duracion,
      frecuencia_servicio,
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

const actualizarProveedor = async (id, datosActualizados) => {
  try {
    const fields = Object.keys(datosActualizados)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ");
    
    const values = Object.values(datosActualizados);
    
    const query = `
      UPDATE proveedores 
      SET ${fields}
      WHERE id = $1 
      RETURNING *;
    `;
    
    const response = await pool.query(query, [id, ...values]);
    return response.rows[0];
  } catch (error) {
    console.error("Error al actualizar el proveedor:", error);
    throw error;
  }
};
export const ProveedoresModel = {
  obtenerProveedoresConVehiculos,
  obtenerProveedorConVehiculos,
  crearProveedor,
  eliminarProveedor,
  actualizarProveedor,
};
