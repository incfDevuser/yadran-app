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
          u.*,
          r.nombre_rol,
          p.nombre_proveedor,
          p.rut AS proveedor_rut,
          p.encargado,
          p.contacto,
          p.email_encargado,
          p.tipo_servicio,
          p.ciclo_cultivo,
          p.tarea_realizar,
          p.frecuencia_servicio,
          p.duracion,
          -- Viajes del usuario
          COALESCE(
              json_agg(
                  DISTINCT jsonb_build_object(
                      'id', v.id,
                      'nombre', v.nombre,
                      'descripcion', v.descripcion,
                      'fecha_inicio', uv.fecha_inicio,
                      'fecha_fin', uv.fecha_fin,
                      'comentario_usuario', uv.comentario_usuario,
                      'estado', uv.estado,
                      'solicitud_id', uv.id,
                      'trayectos', trayectos_ordenados.trayectos
                  )
              ) FILTER (WHERE v.id IS NOT NULL), '[]'
          ) AS viajes,
          -- Solicitudes intercentro
          COALESCE(
              json_agg(
                  DISTINCT jsonb_build_object(
                      'solicitud_id', si.id,
                      'movimiento_id', si.movimiento_id,
                      'estado', si.estado,
                      'comentario', si.comentario,
                      'fecha_movimiento', mi.fecha,
                      'centro_origen', co.nombre_centro,
                      'centro_destino', cd.nombre_centro,
                      'lancha', l.nombre
                  )
              ) FILTER (WHERE si.id IS NOT NULL), '[]'
          ) AS solicitudes_intercentro
      FROM usuarios u
      JOIN roles r ON u.rol_id = r.id
      LEFT JOIN proveedores p ON u.proveedor_id = p.id
      LEFT JOIN usuarios_viajes uv ON u.id = uv.usuario_id
      LEFT JOIN viajes v ON uv.viaje_id = v.id
      LEFT JOIN usuariosmovimientosintercentro si ON u.id = si.usuario_id
      LEFT JOIN movimientosintercentro mi ON si.movimiento_id = mi.id
      LEFT JOIN centro co ON mi.centro_origen_id = co.id
      LEFT JOIN centro cd ON mi.centro_destino_id = cd.id
      LEFT JOIN lanchas l ON mi.lancha_id = l.id
      LEFT JOIN LATERAL (
          SELECT 
              json_agg(
                  json_build_object(
                      'id', t.id,
                      'origen', t.origen,
                      'destino', t.destino,
                      'estado', t.estado,
                      'vehiculo_id', t.vehiculo_id,
                      'tipo_vehiculo', vh.tipo_vehiculo,
                      'duracion_estimada', t.duracion_estimada
                  ) ORDER BY t.id ASC
              ) AS trayectos
          FROM trayectos t
          LEFT JOIN vehiculos vh ON t.vehiculo_id = vh.id
          WHERE t.ruta_id = v.ruta_id
      ) trayectos_ordenados ON TRUE
      WHERE u.id = $1
      GROUP BY 
          u.id, 
          r.nombre_rol, 
          p.nombre_proveedor, 
          p.rut, 
          p.encargado, 
          p.contacto, 
          p.email_encargado,
          p.tipo_servicio, 
          p.ciclo_cultivo, 
          p.tarea_realizar, 
          p.frecuencia_servicio, 
          p.duracion;
    `;
    const values = [id];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error("Error al obtener el usuario con viajes y proveedor:", error);
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

// const register = async ({
//   nombre,
//   rut,
//   genero,
//   telefono,
//   email,
//   fecha_nacimiento,
//   ciudad_origen,
//   empresa,
//   cargo,
//   numero_contacto,
//   password,
//   rol_id = 4,
// }) => {
//   try {
//     const query = `
//       INSERT INTO usuarios (
//         nombre,
//         rut,
//         genero,
//         telefono,
//         email,
//         fecha_nacimiento,
//         ciudad_origen,
//         empresa,
//         cargo,
//         numero_contacto,
//         password,
//         rol_id
//       )
//       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
//       RETURNING *;
//     `;
//     const values = [
//       nombre,
//       rut,
//       genero,
//       telefono,
//       email,
//       fecha_nacimiento,
//       ciudad_origen,
//       empresa,
//       cargo,
//       numero_contacto,
//       password,
//       rol_id,
//     ];
//     const response = await pool.query(query, values);
//     return response.rows[0];
//   } catch (error) {
//     console.error(error);
//     throw new Error("Hubo un error con la operación register");
//   }
// };
const registerProveedores = async ({
  nombre,
  rut,
  genero,
  telefono,
  email,
  fecha_nacimiento,
  ciudad_origen,
  empresa,
  cargo,
  numero_contacto,
  password,
  rol_id = 7,
}) => {
  try {
    await pool.query("BEGIN");
    const proveedorInsertQuery = `
      INSERT INTO proveedores (
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
         frecuencia_servicio,
         duracion
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING id;
    `;
    const proveedorValues = [
      nombre, // nombre_proveedor
      rut, // rut
      cargo, // encargado (se usa el campo "cargo" para el nombre del encargado)
      numero_contacto, // contacto
      email, // email_encargado
      null, // representante_interno (no disponible en este registro)
      "Activo", // estado
      empresa, // tipo_servicio (se utiliza el valor "empresa")
      null, // ciclo_cultivo
      null, // tarea_realizar
      null, // frencuencia_servicio
      null, // duracion
    ];
    const proveedorResult = await pool.query(
      proveedorInsertQuery,
      proveedorValues
    );
    const proveedorId = proveedorResult.rows[0].id;
    const userQuery = `
      INSERT INTO usuarios (
        nombre,
        rut,
        genero,
        telefono,
        email,
        fecha_nacimiento,
        ciudad_origen,
        empresa,
        cargo,
        numero_contacto,
        password,
        rol_id,
        proveedor_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *;
    `;
    const userValues = [
      nombre,
      rut,
      genero,
      telefono,
      email,
      fecha_nacimiento,
      ciudad_origen,
      empresa,
      cargo,
      numero_contacto,
      password,
      rol_id,
      proveedorId,
    ];
    const userResult = await pool.query(userQuery, userValues);
    await pool.query("COMMIT");
    return userResult.rows[0];
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error(error);
    throw new Error("Hubo un error con la operación register");
  }
};

const findUser = async (email) => {
  try {
    const query = `
      SELECT 
        u.*,
        r.nombre_rol,
        p.nombre_proveedor,
        p.rut AS proveedor_rut,
        p.encargado,
        p.contacto,
        p.email_encargado,
        p.tipo_servicio,
        p.ciclo_cultivo,
        p.tarea_realizar,
        p.frecuencia_servicio,
        p.duracion
      FROM usuarios u
      JOIN roles r ON u.rol_id = r.id
      LEFT JOIN proveedores p ON u.proveedor_id = p.id
      WHERE u.email = $1
      LIMIT 1;
    `;
    const values = [email];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error en FINDUSER:", error.message);
    throw new Error("Hubo un error con la operación FINDUSER");
  }
};

const actualizarUsuario = async (id, camposActualizados) => {
  try {
    if (camposActualizados.email) {
      delete camposActualizados.email;
    }
    const keys = Object.keys(camposActualizados);
    const valores = Object.values(camposActualizados);

    if (keys.length === 0) {
      throw new Error("No se proporcionaron campos válidos para actualizar.");
    }
    const setQuery = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    const query = `
      UPDATE usuarios
      SET ${setQuery}
      WHERE id = $${keys.length + 1}
      RETURNING *;
    `;
    valores.push(id);
    const response = await pool.query(query, valores);
    return response.rows[0];
  } catch (error) {
    console.error("Error al actualizar el usuario:", error.message);
    throw new Error("Hubo un error al actualizar el usuario");
  }
};

export const UserModel = {
  obtenerUsuarios,
  obtenerUsuario,
  eliminarUsuario,
  findUser,
  obtenerUsuarioConViajes,
  actualizarUsuario,
  registerProveedores,
};
