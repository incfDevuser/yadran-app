import pool from "../config/db.js";

//Función para crear un chofer
const crearChofer = async ({ nombre, telefono, email }) => {
  const query = `
    INSERT INTO choferes (nombre, telefono, email)
    VALUES ($1, $2, $3) RETURNING *
  `;
  const values = [nombre, telefono, email];
  const response = await pool.query(query, values);
  return response.rows[0];
};
//Función para obtener todos los choferes
const obtenerChoferes = async () => {
  const query = `
    SELECT * FROM choferes
  `;
  const response = await pool.query(query);
  return response.rows;
};
//Obtener lista de usuarios para el chofer
const obtenerUsuariosPorTrayectoParaChofer = async (chofer_id) => {
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
        
        -- Capacidad ocupada: Usuarios y trabajadores con estado 'Aprobado' en el vehículo
        COUNT(vu.usuario_id) FILTER (WHERE vu.estado = 'Aprobado') +
        COUNT(vu.trabajador_id) FILTER (WHERE vu.estado = 'Aprobado') AS capacidad_ocupada,
        
        -- Lista de usuarios y trabajadores y sus estados
        COALESCE(json_agg(
          json_build_object(
            'usuario_id', u.id,
            'trabajador_id', tr.id,
            'nombre', COALESCE(u.nombre, tr.nombre),
            'email', COALESCE(u.email, tr.email),
            'estado', vu.estado
          )
        ) FILTER (WHERE u.id IS NOT NULL OR tr.id IS NOT NULL), '[]') AS participantes
      FROM trayectos t
      LEFT JOIN vehiculo_usuarios vu ON t.id = vu.trayecto_id
      LEFT JOIN usuarios u ON vu.usuario_id = u.id
      LEFT JOIN trabajadores tr ON vu.trabajador_id = tr.id
      LEFT JOIN vehiculos v ON v.id = vu.vehiculo_id
      WHERE v.chofer_id = $1
      GROUP BY t.id, v.tipo_vehiculo, v.capacidad_total, v.capacidad_operacional
      ORDER BY t.id;
    `;
    const response = await pool.query(query, [chofer_id]);
    return response.rows;
  } catch (error) {
    console.error("Error al obtener usuarios por trayecto para el chofer:", error);
    throw new Error("Error al obtener la lista de usuarios por trayecto");
  }
};
export const ChoferesModel = {
  crearChofer,
  obtenerChoferes,
  obtenerUsuariosPorTrayectoParaChofer,
};
