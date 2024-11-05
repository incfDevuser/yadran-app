import pool from "../config/db.js";

const obtenerLanchas = async () => {
  try {
    const query = `
      SELECT 
        l.id AS lancha_id,
        l.nombre AS lancha_nombre,
        l.capacidad AS lancha_capacidad,
        l.disponible AS lancha_disponible,
        COALESCE(
          json_agg(
            json_build_object(
              'usuario_id', u.id,
              'nombre', u.nombre,
              'email', u.email
            )
          ) FILTER (WHERE u.id IS NOT NULL),
          '[]'
        ) AS usuarios
      FROM lanchas l
      LEFT JOIN movimientosintercentro mi ON mi.lancha_id = l.id
      LEFT JOIN usuariosmovimientosintercentro umi ON umi.movimiento_id = mi.id
      LEFT JOIN usuarios u ON umi.usuario_id = u.id
      GROUP BY l.id;
    `;
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Hubo error con la función obtenerLanchas");
  }
};
//Crear lanchas
const crearLanchas = async ({ nombre, capacidad, disponible }) => {
  try {
    const query =
      "INSERT INTO lanchas(nombre, capacidad, disponible) values($1, $2, $3) RETURNING *";
    const values = [nombre, capacidad, disponible];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo error con la función crearLanchas");
  }
};
//Crer ruta de intercentro
const crearRuta = async ({
  fecha,
  centro_origen_id,
  centro_destino_id,
  lancha_id,
  estado = "pendiente",
  comentarios,
}) => {
  try {
    const query = `
      INSERT INTO movimientosintercentro (
        fecha, centro_origen_id, centro_destino_id, lancha_id, estado, comentarios
      ) VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *;
    `;
    const values = [
      fecha,
      centro_origen_id,
      centro_destino_id,
      lancha_id,
      estado,
      comentarios,
    ];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error("Error al crear la ruta de intercentro:", error);
    throw new Error("Hubo un error al crear la ruta de intercentro");
  }
};
const obtenerRutasIntercentro = async () => {
  try {
    const query = `
      SELECT 
        mi.id AS movimiento_id,
        mi.fecha,
        mi.estado,
        mi.comentarios,
        co.nombre_centro AS centro_origen_nombre,
        cd.nombre_centro AS centro_destino_nombre,
        l.nombre AS lancha_nombre,
        COALESCE(
          json_agg(
            json_build_object(
              'usuario_id', u.id,
              'nombre', u.nombre,
              'email', u.email
            )
          ) FILTER (WHERE u.id IS NOT NULL),
          '[]'
        ) AS usuarios
      FROM movimientosintercentro mi
      LEFT JOIN centro co ON mi.centro_origen_id = co.id
      LEFT JOIN centro cd ON mi.centro_destino_id = cd.id
      LEFT JOIN lanchas l ON mi.lancha_id = l.id
      LEFT JOIN usuariosmovimientosintercentro umi ON umi.movimiento_id = mi.id
      LEFT JOIN usuarios u ON umi.usuario_id = u.id
      GROUP BY mi.id, co.nombre_centro, cd.nombre_centro, l.nombre;
    `;
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Hubo error con la función obtenerRutasIntercentro");
  }
};
//Solicitar una ruta, asi el usuario se inserta en las tablas respectivas
const solicitarRutaConUsuario = async ({
  movimiento_id,
  usuario_id,
  comentario,
  estado,
}) => {
  try {
    const movimientoQuery = `SELECT lancha_id FROM movimientosintercentro WHERE id = $1`;
    const movimientoResult = await pool.query(movimientoQuery, [movimiento_id]);

    if (movimientoResult.rows.length === 0) {
      throw new Error("Movimiento no encontrado o no tiene lancha asignada");
    }
    const lanchaId = movimientoResult.rows[0].lancha_id;
    const insertQuery = `
      INSERT INTO usuariosmovimientosintercentro (movimiento_id, usuario_id, estado, comentario)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [
      movimiento_id,
      usuario_id,
      estado || "pendiente",
      comentario,
    ];
    const insertResult = await pool.query(insertQuery, values);

    return insertResult.rows[0];
  } catch (error) {
    console.error(
      "Error al solicitar ruta y agregar usuario a la lancha:",
      error
    );
    throw new Error("Error al solicitar ruta y agregar usuario a la lancha");
  }
};
const aprobarSolicitud = async (solicitud_id) => {
  try {
    const query = `
      UPDATE usuariosmovimientosintercentro
      SET estado = 'aprobado'
      WHERE id = $1
      RETURNING *;
    `;
    const response = await pool.query(query, [solicitud_id]);
    return response.rows[0];
  } catch (error) {
    console.error("Error al aprobar la solicitud:", error);
    throw new Error("Hubo un error al aprobar la solicitud");
  }
};
const rechazarSolicitud = async (solicitudId) => {
  try {
    const updateQuery = `
      UPDATE usuariosmovimientosintercentro
      SET estado = 'rechazado'
      WHERE id = $1
      RETURNING movimiento_id, usuario_id;
    `;
    const updateResponse = await pool.query(updateQuery, [solicitudId]);
    if (updateResponse.rows.length === 0) {
      throw new Error("Solicitud no encontrada");
    }
    const { movimiento_id, usuario_id } = updateResponse.rows[0];
    const deleteUserQuery = `
      DELETE FROM usuariosmovimientosintercentro
      WHERE movimiento_id = $1 AND usuario_id = $2 AND estado = 'rechazado';
    `;
    await pool.query(deleteUserQuery, [movimiento_id, usuario_id]);
    return updateResponse.rows[0];
  } catch (error) {
    console.error("Error al rechazar la solicitud:", error);
    throw new Error(
      "Hubo un error al rechazar la solicitud y eliminar al usuario de la lancha"
    );
  }
};
//Finalizar el viaje de los intercentro y eliminar los usuarios asociados
const completarMovimiento = async (movimientoId) => {
  try {
    await pool.query(
      `UPDATE movimientosintercentro SET estado = 'completado' WHERE id = $1`,
      [movimientoId]
    );
    await pool.query(
      `DELETE FROM usuariosmovimientosintercentro WHERE movimiento_id = $1`,
      [movimientoId]
    );
    return { message: "Movimiento completado y lista de usuarios vaciada" };
  } catch (error) {
    console.error("Error al completar el movimiento:", error);
    throw new Error("Error al completar el movimiento");
  }
};
const obtenerSolicitudesIntercentro = async () => {
  try {
    const query = `
      SELECT umi.id AS solicitud_id,
             umi.movimiento_id,
             umi.usuario_id,
             umi.estado,
             umi.comentario,
             u.nombre AS usuario_nombre,
             u.email AS usuario_email,
             mi.fecha,
             mi.centro_origen_id,
             co.nombre_centro AS centro_origen_nombre,
             mi.centro_destino_id,
             cd.nombre_centro AS centro_destino_nombre,
             mi.estado AS estado_movimiento,
             l.nombre AS lancha_nombre
      FROM usuariosmovimientosintercentro umi
      JOIN usuarios u ON umi.usuario_id = u.id
      JOIN movimientosintercentro mi ON umi.movimiento_id = mi.id
      LEFT JOIN lanchas l ON mi.lancha_id = l.id
      LEFT JOIN centro co ON mi.centro_origen_id = co.id
      LEFT JOIN centro cd ON mi.centro_destino_id = cd.id
    `;
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error("Error al obtener las solicitudes de intercentro:", error);
    throw new Error("Hubo un error al obtener las solicitudes de intercentro");
  }
};
const cancelarSolicitudUsuario = async (solicitudId) => {
  try {
    const updateQuery = `
      UPDATE usuariosmovimientosintercentro
      SET estado = 'cancelado'
      WHERE id = $1
      RETURNING movimiento_id, usuario_id;
    `;
    const updateResponse = await pool.query(updateQuery, [solicitudId]);
    if (updateResponse.rows.length === 0) {
      throw new Error("Solicitud no encontrada");
    }
    const { movimiento_id, usuario_id } = updateResponse.rows[0];
    const deleteUserQuery = `
      DELETE FROM usuariosmovimientosintercentro
      WHERE movimiento_id = $1 AND usuario_id = $2 AND estado = 'cancelado';
    `;
    await pool.query(deleteUserQuery, [movimiento_id, usuario_id]);
    return updateResponse.rows[0];
  } catch (error) {
    console.error("Error al cancelar la solicitud del usuario:", error);
    throw new Error(
      "Hubo un error al cancelar la solicitud y eliminar al usuario de la lancha"
    );
  }
};
const obtenerSolicitudPorId = async (solicitudId) => {
  try {
    const query = "SELECT * FROM usuariosmovimientosintercentro WHERE id = $1";
    const response = await pool.query(query, [solicitudId]);
    return response.rows[0];
  } catch (error) {
    console.error("Error al cancelar la solicitud del usuario:", error);
    throw new Error(
      "Hubo un error al cancelar la solicitud y eliminar al usuario de la lancha"
    );
  }
};
export const IntercentroModel = {
  obtenerLanchas,
  crearLanchas,
  obtenerRutasIntercentro,
  crearRuta,
  solicitarRutaConUsuario,
  aprobarSolicitud,
  rechazarSolicitud,
  completarMovimiento,
  obtenerSolicitudesIntercentro,
  cancelarSolicitudUsuario,
  obtenerSolicitudPorId
};
