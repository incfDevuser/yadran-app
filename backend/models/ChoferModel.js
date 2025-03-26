import pool from "../config/db.js";

const crearChofer = async ({
  nombre,
  telefono,
  email,
  proveedor_id,
  password,
  password_inicial,
}) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryChofer = `
      INSERT INTO choferes (nombre, telefono, email, proveedor_id, password, password_inicial)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, nombre, telefono, email, proveedor_id, password_inicial
    `;
    const valuesChofer = [
      nombre,
      telefono,
      email,
      proveedor_id,
      password,
      password_inicial,
    ];
    const choferResult = await client.query(queryChofer, valuesChofer);
    const chofer = choferResult.rows[0];
    const queryUsuario = `
      INSERT INTO usuarios (nombre, email, password, rol_id, chofer_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;
    const valuesUsuario = [nombre, email, password, 8, chofer.id];
    await client.query(queryUsuario, valuesUsuario);

    await client.query("COMMIT");
    return chofer;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const obtenerChoferesPorProveedor = async (proveedor_id) => {
  const query = `
    SELECT *
    FROM choferes
    WHERE proveedor_id = $1
  `;
  const response = await pool.query(query, [proveedor_id]);
  return response.rows;
};
const obtenerChoferes = async () => {
  const query = `
    SELECT * FROM choferes
  `;
  const response = await pool.query(query);
  return response.rows;
};
const obtenerUsuariosPorTrayectoParaChofer = async (chofer_id) => {
  try {
    const query = `
      SELECT 
        t.id AS trayecto_id,
        t.origen,
        t.destino,
        t.duracion_estimada,
        t.estado AS estado_trayecto,
        v.tipo_vehiculo,
        v.capacidad_total,
        v.capacidad_operacional,
        vi.nombre AS nombre_viaje,
        
        COUNT(vu.usuario_id) FILTER (WHERE vu.estado = 'Aprobado') +
        COUNT(vu.trabajador_id) FILTER (WHERE vu.estado = 'Aprobado') AS capacidad_ocupada,
        
        COALESCE(json_agg(
          json_build_object(
            'usuario_id', u.id,
            'trabajador_id', tr.id,
            'nombre', COALESCE(u.nombre, tr.nombre),
            'email', COALESCE(u.email, tr.email),
            'telefono', COALESCE(u.telefono, tr.telefono),
            'estado', vu.estado,
            'tipo', CASE 
              WHEN u.id IS NOT NULL THEN 'Usuario'
              WHEN tr.id IS NOT NULL THEN 'Trabajador'
            END
          )
        ) FILTER (WHERE u.id IS NOT NULL OR tr.id IS NOT NULL), '[]') AS participantes
      FROM trayectos t
      LEFT JOIN vehiculo_usuarios vu ON t.id = vu.trayecto_id
      LEFT JOIN usuarios u ON vu.usuario_id = u.id
      LEFT JOIN trabajadores tr ON vu.trabajador_id = tr.id
      LEFT JOIN vehiculos v ON v.id = vu.vehiculo_id
      LEFT JOIN rutas r ON t.ruta_id = r.id
      LEFT JOIN viajes vi ON vi.ruta_id = r.id
      WHERE v.chofer_id = $1
      GROUP BY t.id, v.tipo_vehiculo, v.capacidad_total, v.capacidad_operacional, vi.nombre
      ORDER BY t.id;
    `;
    const response = await pool.query(query, [chofer_id]);
    return response.rows;
  } catch (error) {
    console.error("Error al obtener usuarios por trayecto:", error);
    throw new Error("Error al obtener la lista de usuarios por trayecto");
  }
};
export const ChoferesModel = {
  crearChofer,
  obtenerChoferes,
  obtenerUsuariosPorTrayectoParaChofer,
  obtenerChoferesPorProveedor,
};
