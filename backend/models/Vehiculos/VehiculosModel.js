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
  chofer_id
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
      chofer_id
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
        
        -- Capacidad ocupada: Usuarios en estado "Aprobado" en el vehículo
        COUNT(vu.usuario_id) FILTER (WHERE vu.estado = 'Aprobado') AS capacidad_ocupada,
        
        -- Capacidad reservada: Usuarios en estado "Pendiente"
        COUNT(vu.usuario_id) FILTER (WHERE vu.estado = 'Pendiente') AS capacidad_reservada,
        
        -- Cupos disponibles: Capacidad operacional menos ocupados y reservados
        v.capacidad_operacional - 
        COUNT(vu.usuario_id) FILTER (WHERE vu.estado = 'Aprobado') -
        COUNT(vu.usuario_id) FILTER (WHERE vu.estado = 'Pendiente') AS cupos_disponibles,
        
        -- Lista de usuarios y su estado
        json_agg(
          json_build_object(
            'usuario_id', u.id,
            'nombre', u.nombre,
            'email', u.email,
            'estado', vu.estado
          )
        ) AS usuarios,
        
        -- Información del chofer
        c.nombre AS nombre_chofer,
        c.email AS email_chofer
      FROM trayectos t
      LEFT JOIN vehiculo_usuarios vu ON t.id = vu.trayecto_id AND vu.vehiculo_id = $1
      LEFT JOIN usuarios u ON vu.usuario_id = u.id
      LEFT JOIN vehiculos v ON v.id = vu.vehiculo_id
      LEFT JOIN choferes c ON v.chofer_id = c.id
      WHERE v.id = $1
      GROUP BY t.id, v.id, c.nombre, c.email
    `;
    const response = await pool.query(query, [vehiculo_id]);
    return response.rows;
  } catch (error) {
    console.error(
      "Error al obtener la lista de usuarios por vehículo y trayecto:",
      error
    );
    throw new Error(
      "Error al obtener la lista de usuarios por vehículo y trayecto"
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
