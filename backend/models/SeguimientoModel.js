import pool from "../config/db.js";

const getDetalleCompletoViaje = async (viajeId) => {
  const viajeQuery = `
    SELECT 
      v.id AS viaje_id,
      v.nombre AS nombre_viaje,
      v.descripcion AS descripcion_viaje,
      r.id AS ruta_id,
      r.nombre_ruta
    FROM viajes v
    JOIN rutas r ON v.ruta_id = r.id
    WHERE v.id = $1;
  `;

  const trayectosQuery = `
    SELECT 
      t.id AS trayecto_id,
      t.origen AS trayecto_origen,
      t.destino AS trayecto_destino,
      t.duracion_estimada AS trayecto_duracion,
      v.id AS vehiculo_id,
      v.tipo_vehiculo AS tipo_vehiculo,
      c.nombre AS nombre_chofer,
      c.email AS email_chofer
    FROM trayectos t
    LEFT JOIN vehiculos v ON t.vehiculo_id = v.id
    LEFT JOIN choferes c ON v.chofer_id = c.id
    WHERE t.ruta_id = (SELECT ruta_id FROM viajes WHERE id = $1 LIMIT 1);
  `;

  const usuariosVehiculosQuery = `
    SELECT 
      t.id AS trayecto_id,
      vu.usuario_id,
      vu.trabajador_id,
      vu.estado AS estado_usuario,
      COALESCE(u.nombre, t2.nombre) AS nombre_usuario,
      COALESCE(u.email, t2.email) AS email_usuario,
      t.origen AS trayecto_origen,
      t.destino AS trayecto_destino,
      v.tipo_vehiculo AS tipo_vehiculo
    FROM trayectos t
    JOIN vehiculo_usuarios vu ON t.id = vu.trayecto_id
    LEFT JOIN usuarios u ON vu.usuario_id = u.id
    LEFT JOIN trabajadores t2 ON vu.trabajador_id = t2.id
    LEFT JOIN vehiculos v ON vu.vehiculo_id = v.id
    WHERE t.ruta_id = (SELECT ruta_id FROM viajes WHERE id = $1 LIMIT 1);
  `;

  const usuariosPontonQuery = `
    SELECT 
      up.usuario_id,
      COALESCE(u.nombre, t.nombre) AS nombre_usuario,
      COALESCE(u.email, t.email) AS email_usuario,
      up.trabajador_id,
      p.id AS ponton_id,
      p.nombre_ponton AS nombre_ponton
    FROM usuarios_pontones up
    LEFT JOIN usuarios u ON up.usuario_id = u.id
    LEFT JOIN trabajadores t ON up.trabajador_id = t.id
    JOIN ponton p ON up.ponton_id = p.id
    WHERE p.id = (
      SELECT c.ponton_id
      FROM centro c
      JOIN rutas r ON c.ruta_id = r.id
      JOIN viajes v ON r.id = v.ruta_id
      WHERE v.id = $1
      LIMIT 1
    );
  `;

  // Ejecutar todas las consultas en paralelo
  const [
    viajeResult,
    trayectosResult,
    usuariosVehiculosResult,
    usuariosPontonResult,
  ] = await Promise.all([
    pool.query(viajeQuery, [viajeId]),
    pool.query(trayectosQuery, [viajeId]),
    pool.query(usuariosVehiculosQuery, [viajeId]),
    pool.query(usuariosPontonQuery, [viajeId]),
  ]);

  return {
    viaje: viajeResult.rows[0],
    trayectos: trayectosResult.rows,
    usuariosVehiculos: usuariosVehiculosResult.rows,
    usuariosPonton: usuariosPontonResult.rows,
  };
};

export const SeguimientoModel = {
  getDetalleCompletoViaje,
};
