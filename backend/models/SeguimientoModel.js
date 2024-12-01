import pool from "../config/db.js";

const getDetalleCompletoViaje = async (viajeId) => {
  const baseQuery = `
    SELECT 
        v.id AS viaje_id,
        v.nombre AS nombre_viaje,
        v.descripcion AS descripcion_viaje,
        r.id AS ruta_id,
        r.nombre_ruta,
        p.id AS ponton_id,
        p.nombre_ponton
    FROM viajes v
    JOIN rutas r ON v.ruta_id = r.id
    LEFT JOIN centro c ON c.ruta_id = r.id
    LEFT JOIN ponton p ON c.ponton_id = p.id
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
    WHERE t.ruta_id = $1;
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
    WHERE t.ruta_id = $1;
  `;

  const usuariosPontonQuery = `
    SELECT 
        up.usuario_id,
        COALESCE(u.nombre, t.nombre) AS nombre_usuario,
        COALESCE(u.email, t.email) AS email_usuario,
        up.trabajador_id,
        up.estado AS estado_usuario,
        p.id AS ponton_id,
        p.nombre_ponton AS nombre_ponton
    FROM usuarios_pontones up
    LEFT JOIN usuarios u ON up.usuario_id = u.id
    LEFT JOIN trabajadores t ON up.trabajador_id = t.id
    JOIN ponton p ON up.ponton_id = p.id
    WHERE p.id = $1;
  `;

  const baseResult = await pool.query(baseQuery, [viajeId]);

  // Usa ruta_id y ponton_id del primer resultado
  const { ruta_id, ponton_id } = baseResult.rows[0] || {};

  // Ejecuta consultas adicionales
  const [trayectosResult, usuariosVehiculosResult, usuariosPontonResult] =
    await Promise.all([
      pool.query(trayectosQuery, [ruta_id]),
      pool.query(usuariosVehiculosQuery, [ruta_id]),
      pool.query(usuariosPontonQuery, [ponton_id]),
    ]);

  return {
    viaje: baseResult.rows[0],
    trayectos: trayectosResult.rows,
    usuariosVehiculos: usuariosVehiculosResult.rows,
    usuariosPonton: usuariosPontonResult.rows,
  };
};

const getDetalleCompletoIntercentro = async (intercentroId) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Obtener información básica del movimiento intercentro
    const intercentroQuery = `
      SELECT 
        mi.id AS movimiento_id,
        mi.fecha,
        mi.estado,
        mi.comentarios,
        c_origen.id AS origen_centro_id,
        c_origen.nombre_centro AS origen_centro_nombre,
        c_destino.id AS destino_centro_id,
        c_destino.nombre_centro AS destino_centro_nombre,
        l.id AS lancha_id,
        l.nombre AS lancha_nombre
      FROM movimientosintercentro mi
      LEFT JOIN centro c_origen ON mi.centro_origen_id = c_origen.id
      LEFT JOIN centro c_destino ON mi.centro_destino_id = c_destino.id
      LEFT JOIN lanchas l ON mi.lancha_id = l.id
      WHERE mi.id = $1;
    `;
    const intercentroResult = await client.query(intercentroQuery, [
      intercentroId,
    ]);

    if (intercentroResult.rows.length === 0) {
      throw new Error("Movimiento intercentro no encontrado.");
    }

    const intercentroData = intercentroResult.rows[0];

    // Obtener usuarios asociados al pontón del centro de origen
    const usuariosPontonQuery = `
      SELECT 
        up.id AS usuario_ponton_id,
        COALESCE(u.id, t.id) AS persona_id,
        COALESCE(u.nombre, t.nombre) AS nombre,
        COALESCE(u.email, t.email) AS email,
        CASE
          WHEN u.id IS NOT NULL THEN 'usuario'
          ELSE 'trabajador'
        END AS tipo,
        p.id AS ponton_id,
        p.nombre_ponton AS ponton_nombre
      FROM usuarios_pontones up
      LEFT JOIN usuarios u ON up.usuario_id = u.id
      LEFT JOIN trabajadores t ON up.trabajador_id = t.id
      JOIN ponton p ON up.ponton_id = p.id
      WHERE p.id = (
        SELECT c.ponton_id
        FROM centro c
        WHERE c.id = $1
      );
    `;
    const usuariosPontonResult = await client.query(usuariosPontonQuery, [
      intercentroData.origen_centro_id,
    ]);

    const usuariosPonton = usuariosPontonResult.rows;

    // Obtener usuarios asociados a la lancha del movimiento intercentro
    const usuariosLanchaQuery = `
      SELECT 
        umi.id AS usuario_movimiento_id,
        COALESCE(u.id, t.id) AS persona_id,
        COALESCE(u.nombre, t.nombre) AS nombre,
        COALESCE(u.email, t.email) AS email,
        CASE
          WHEN u.id IS NOT NULL THEN 'usuario'
          ELSE 'trabajador'
        END AS tipo,
        l.id AS lancha_id,
        l.nombre AS lancha_nombre
      FROM usuariosmovimientosintercentro umi
      LEFT JOIN usuarios u ON umi.usuario_id = u.id
      LEFT JOIN trabajadores t ON umi.trabajador_id = t.id
      JOIN lanchas l ON umi.lancha_id = l.id
      WHERE umi.movimiento_id = $1;
    `;
    const usuariosLanchaResult = await client.query(usuariosLanchaQuery, [
      intercentroId,
    ]);

    const usuariosLancha = usuariosLanchaResult.rows;

    await client.query("COMMIT");

    return {
      intercentro: intercentroData,
      usuariosPonton,
      usuariosLancha,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(
      "Error al obtener el detalle del movimiento intercentro:",
      error.message
    );
    throw new Error("Error al obtener el detalle del movimiento intercentro");
  } finally {
    client.release();
  }
};

export const SeguimientoModel = {
  getDetalleCompletoViaje,
  getDetalleCompletoIntercentro,
};
