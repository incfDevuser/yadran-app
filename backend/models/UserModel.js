import pool from "../config/db.js";

const obtenerUsuarios = async () => {
  try {
    const query = `
      SELECT usuarios.*, roles.nombre_rol 
      FROM usuarios 
      JOIN roles ON usuarios.rol_id = roles.id
    `;
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operación obtenerUsuarios");
  }
};
const obtenerUsuario = async (id) => {
  try {
    const query = `
      SELECT usuarios.*, roles.nombre_rol 
      FROM usuarios 
      JOIN roles ON usuarios.rol_id = roles.id 
      WHERE usuarios.id = $1
    `;
    const values = [id];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operación obtenerUsuario");
  }
};
const obtenerUsuarioConViajes = async (id) => {
  try {
    const query = `
      SELECT 
        usuarios.*,
        roles.nombre_rol,
        COALESCE(
          json_agg(
            json_build_object(
              'id', viajes.id,
              'nombre', viajes.nombre,
              'descripcion', viajes.descripcion,
              'fecha_inicio', usuarios_viajes.fecha_inicio,
              'fecha_fin', usuarios_viajes.fecha_fin,
              'comentario_usuario', usuarios_viajes.comentario_usuario,
              'estado', usuarios_viajes.estado,
              'solicitud_id', usuarios_viajes.id, -- Agregamos el id de la solicitud
              'trayectos', (
                SELECT COALESCE(
                  json_agg(
                    json_build_object(
                      'id', trayectos.id,
                      'origen', trayectos.origen,
                      'destino', trayectos.destino,
                      'estado', trayectos.estado,
                      'vehiculo_id', trayectos.vehiculo_id,
                      'tipo_vehiculo', vehiculos.tipo_vehiculo,
                      'duracion_estimada', trayectos.duracion_estimada
                    )
                  ) FILTER (WHERE trayectos.id IS NOT NULL), '[]'
                )
                FROM trayectos
                JOIN rutas ON trayectos.ruta_id = rutas.id
                LEFT JOIN vehiculos ON trayectos.vehiculo_id = vehiculos.id
                WHERE rutas.id = viajes.ruta_id
              )
            )
          ) FILTER (WHERE viajes.id IS NOT NULL), '[]'
        ) AS viajes
      FROM usuarios
      JOIN roles ON usuarios.rol_id = roles.id
      LEFT JOIN usuarios_viajes ON usuarios.id = usuarios_viajes.usuario_id
      LEFT JOIN viajes ON usuarios_viajes.viaje_id = viajes.id
      WHERE usuarios.id = $1
      GROUP BY usuarios.id, roles.nombre_rol
    `;
    const values = [id];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operación obtenerUsuarioConViajes");
  }
};


const eliminarUsuario = async (id) => {
  try {
    const query = "DELETE FROM usuarios WHERE id = $1";
    const values = [id];
    await pool.query(query, values);
    return { message: "Usuario eliminado con éxito" };
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operación eliminarUsuario");
  }
};

const findUser = async (email) => {
  try {
    const query = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);
    return query.rows[0];
  } catch (error) {
    console.error("Error en FINDUSER:", error.message);
    throw new Error("Hubo un error con la operación FINDUSER");
  }
};

export const UserModel = {
  obtenerUsuarios,
  obtenerUsuario,
  eliminarUsuario,
  findUser,
  obtenerUsuarioConViajes,
};
