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
const actualizarVehiculo = async (id, data) => {
  try {
    const query = `
      UPDATE vehiculos 
      SET 
        num_tripulantes = $1,
        tipo_vehiculo = $2,
        tipo_servicio = $3,
        capacidad_total = $4,
        capacidad_operacional = $5,
        estado = $6,
        documentacion_ok = $7,
        velocidad_promedio = $8,
        chofer_id = $9 
      WHERE id = $10
      RETURNING *;
    `;
    
    const values = [
      data.num_tripulantes,
      data.tipo_vehiculo,
      data.tipo_servicio,
      data.capacidad_total,
      data.capacidad_operacional,
      data.estado,
      data.documentacion_ok,
      data.velocidad_promedio,
      data.chofer_id,
      id
    ];

    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error('Error al actualizar el vehículo:', error);
    throw new Error('Error al actualizar el vehículo');
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
const asignarTripulante = async ({ vehiculo_id, nombre_tripulante, rut_tripulante, fecha_nacimiento, empresa, cargo }) => {
  try {
    const query = `
      INSERT INTO vehiculo_tripulantes (
        vehiculo_id, nombre_tripulante, rut_tripulante, fecha_nacimiento, empresa, cargo
      ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `;
    const values = [vehiculo_id, nombre_tripulante, rut_tripulante, fecha_nacimiento, empresa, cargo];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error("Error al asignar el tripulante al vehículo:", error);
    throw new Error("Error al asignar el tripulante al vehículo");
  }
};

const obtenerVehiculosPorProveedor = async (proveedor_id) => {
  try {
    const query = `
      SELECT 
        v.*, 
        p.nombre_proveedor,
        c.nombre AS nombre_chofer,
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
      LEFT JOIN choferes c ON v.chofer_id = c.id
      LEFT JOIN vehiculo_tripulantes t ON v.id = t.vehiculo_id
      WHERE v.proveedor_id = $1
      GROUP BY v.id, p.nombre_proveedor, c.nombre;
    `;
    const response = await pool.query(query, [proveedor_id]);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener los vehículos del proveedor");
  }
};

const obtenerPasajerosPorVehiculo = async (vehiculo_id) => {
  try {
    const query = `
      SELECT 
        t.id AS trayecto_id,
        t.origen AS trayecto_origen,
        t.destino AS trayecto_destino,
        json_agg(
          json_build_object(
            'usuario_id', vu.usuario_id,
            'trabajador_id', vu.trabajador_id,
            'estado_usuario', vu.estado,
            'nombre_usuario', COALESCE(u.nombre, t2.nombre),
            'email_usuario', COALESCE(u.email, t2.email)
          )
        ) AS pasajeros
      FROM trayectos t
      JOIN vehiculo_usuarios vu ON t.id = vu.trayecto_id
      LEFT JOIN usuarios u ON vu.usuario_id = u.id
      LEFT JOIN trabajadores t2 ON vu.trabajador_id = t2.id
      WHERE vu.vehiculo_id = $1
      GROUP BY t.id, t.origen, t.destino
      ORDER BY t.id;
    `;
    const response = await pool.query(query, [vehiculo_id]);
    return response.rows;
  } catch (error) {
    console.error("Error al obtener los pasajeros del vehículo:", error);
    throw new Error("Error al obtener los pasajeros del vehículo");
  }
};

const obtenerRutasYTrayectosPorVehiculo = async (proveedor_id) => {
  try {
    const query = `
      SELECT 
        r.id AS ruta_id,
        r.nombre_ruta AS nombre_ruta,
        v.id AS vehiculo_id,
        v.tipo_vehiculo,
        v.capacidad_total,
        v.capacidad_operacional,
        v.estado AS estado_vehiculo,
        v.velocidad_promedio,
        c.nombre AS nombre_chofer,
        c.email AS email_chofer,
        p.nombre_proveedor,
        json_agg(
          json_build_object(
            'trayecto_id', t.id,
            'origen', t.origen,
            'destino', t.destino,
            'duracion_estimada', t.duracion_estimada,
            'pasajeros', (
              SELECT json_agg(
                json_build_object(
                  'usuario_id', vu.usuario_id,
                  'trabajador_id', vu.trabajador_id,
                  'estado', vu.estado,
                  'nombre', COALESCE(u.nombre, tr.nombre),
                  'email', COALESCE(u.email, tr.email)
                )
              )
              FROM vehiculo_usuarios vu
              LEFT JOIN usuarios u ON vu.usuario_id = u.id
              LEFT JOIN trabajadores tr ON vu.trabajador_id = tr.id
              WHERE vu.trayecto_id = t.id AND vu.vehiculo_id = v.id
            )
          )
        ) AS trayectos
      FROM rutas r
      JOIN trayectos t ON t.ruta_id = r.id
      JOIN vehiculos v ON v.proveedor_id = $1
      LEFT JOIN choferes c ON v.chofer_id = c.id
      JOIN proveedores p ON v.proveedor_id = p.id
      WHERE EXISTS (
        SELECT 1 FROM vehiculo_usuarios vu 
        WHERE vu.trayecto_id = t.id AND vu.vehiculo_id = v.id
      )
      GROUP BY r.id, r.nombre_ruta, v.id, c.nombre, c.email, p.nombre_proveedor;
    `;
    const response = await pool.query(query, [proveedor_id]);
    return response.rows;
  } catch (error) {
    console.error("Error al obtener las rutas y trayectos del vehículo:", error);
    throw new Error("Error al obtener las rutas y trayectos del vehículo");
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
  asignarTripulante,
  obtenerVehiculosPorProveedor,
  obtenerPasajerosPorVehiculo,
  obtenerRutasYTrayectosPorVehiculo,
};
