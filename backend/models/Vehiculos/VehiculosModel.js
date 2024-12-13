import pool from "../../config/db.js";

const obtenerVehiculos = async () => {
  try {
    const query = `
      SELECT 
        v.*, 
        p.nombre_proveedor,
        COALESCE(
          json_agg(
            json_build_object(
              'id', t.id,
              'nombre_tripulante', t.nombre_tripulante,
              'rut_tripulante', t.rut_tripulante,
              'fecha_nacimiento', t.fecha_nacimiento,
              'empresa', t.empresa,
              'cargo', t.cargo
            )
          ) FILTER (WHERE t.id IS NOT NULL), 
          '[]'
        ) AS tripulantes
      FROM vehiculos v
      JOIN proveedores p ON v.proveedor_id = p.id
      LEFT JOIN vehiculo_tripulantes t ON v.id = t.vehiculo_id
      GROUP BY v.id, p.nombre_proveedor;
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
//Funcion para crear un vehiculo
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
  chofer_id,
}) => {
  try {
    const query = `
      INSERT INTO vehiculos (
        proveedor_id, num_tripulantes, tipo_vehiculo, tipo_servicio,
        capacidad_total, capacidad_operacional, estado,
        documentacion_ok, velocidad_promedio, chofer_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *
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
      chofer_id,
    ];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error al crear el vehículo");
  }
};
const actualizarVehiculo = async (id, data) => {};
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
const obtenerUsuariosEnVehiculo = async (vehiculo_id, trayecto_id) => {
  try {
    const query = `
      SELECT u.nombre, u.email AS email, r.nombre_rol AS rol
      FROM vehiculo_usuarios vu
      JOIN usuarios u ON vu.usuario_id = u.id
      JOIN roles r ON u.rol_id = r.id
      WHERE vu.vehiculo_id = $1 AND vu.trayecto_id = $2
    `;
    const response = await pool.query(query, [vehiculo_id, trayecto_id]);
    return response.rows;
  } catch (error) {
    console.error("Error al obtener los usuarios en el vehículo:", error);
    throw new Error("Error al obtener los usuarios en el vehículo");
  }
};
const obtenerUsuariosPorVehiculoYTrayecto = async (vehiculo_id) => {
  try {
    const query = `
      SELECT 
        t.id AS trayecto_id,
        t.origen,
        t.destino,
        t.duracion_estimada,
        v.tipo_vehiculo,
        v.capacidad_total,
        v.capacidad_operacional,
        
        -- Capacidad ocupada: Usuarios en estado "Aprobado"
        COALESCE(SUM(CASE WHEN vu.estado = 'Aprobado' THEN 1 ELSE 0 END), 0) AS capacidad_ocupada,
        
        -- Capacidad reservada: Usuarios en estado "Pendiente"
        COALESCE(SUM(CASE WHEN vu.estado = 'Pendiente' THEN 1 ELSE 0 END), 0) AS capacidad_reservada,
        
        -- Cupos disponibles: Capacidad operacional menos ocupados y reservados
        v.capacidad_operacional - 
        COALESCE(SUM(CASE WHEN vu.estado = 'Aprobado' THEN 1 ELSE 0 END), 0) -
        COALESCE(SUM(CASE WHEN vu.estado = 'Pendiente' THEN 1 ELSE 0 END), 0) AS cupos_disponibles,
        
        -- Lista de usuarios y trabajadores con su estado
        json_agg(
          json_build_object(
            'usuario_id', vu.usuario_id,
            'trabajador_id', vu.trabajador_id,
            'nombre', COALESCE(u.nombre, t2.nombre),
            'email', COALESCE(u.email, t2.email),
            'estado', vu.estado,
            'tipo', CASE 
                      WHEN vu.usuario_id IS NOT NULL THEN 'usuario'
                      WHEN vu.trabajador_id IS NOT NULL THEN 'trabajador'
                      ELSE NULL
                    END
          )
        ) FILTER (WHERE vu.id IS NOT NULL) AS usuarios_trabajadores,
        
        -- Información del chofer
        c.nombre AS nombre_chofer,
        c.email AS email_chofer
      FROM trayectos t
      LEFT JOIN vehiculo_usuarios vu ON t.id = vu.trayecto_id AND vu.vehiculo_id = $1
      LEFT JOIN usuarios u ON vu.usuario_id = u.id
      LEFT JOIN trabajadores t2 ON vu.trabajador_id = t2.id
      LEFT JOIN vehiculos v ON v.id = vu.vehiculo_id
      LEFT JOIN choferes c ON v.chofer_id = c.id
      WHERE v.id = $1
      GROUP BY t.id, v.id, c.nombre, c.email;
    `;
    const response = await pool.query(query, [vehiculo_id]);
    return response.rows;
  } catch (error) {
    console.error(
      "Error al obtener la lista de usuarios y trabajadores por vehículo y trayecto:",
      error
    );
    throw new Error(
      "Error al obtener la lista de usuarios y trabajadores por vehículo y trayecto"
    );
  }
};
export const VehiculosModel = {
  obtenerVehiculos,
  obtenerVehiculo,
  crearVehiculo,
  actualizarVehiculo,
  eliminarVehiculo,
  obtenerUsuariosEnVehiculo,
  obtenerUsuariosPorVehiculoYTrayecto,
};
