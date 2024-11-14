import pool from "../config/db.js";

//Obtener todos los roles
const obtenerRoles = async () => {
  try {
    const query = `SELECT * FROM roles ORDER BY id;`;
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error("Error al obtener roles:", error);
    throw new Error("Error al obtener roles");
  }
};

//Crear un nuevo rol
const crearRol = async (nombreRol, descripcion) => {
  try {
    const query = `INSERT INTO roles (nombre_rol, descripcion) VALUES ($1, $2) RETURNING *;`;
    const response = await pool.query(query, [nombreRol, descripcion]);
    return response.rows[0];
  } catch (error) {
    console.error("Error al crear rol:", error);
    throw new Error("Error al crear rol");
  }
};
const eliminarRol = async (rolId) => {
  try {
    const query = `DELETE FROM roles WHERE id = $1 RETURNING *;`;
    const response = await pool.query(query, [rolId]);
    return response.rows[0];
  } catch (error) {
    console.error("Error al eliminar rol:", error);
    throw new Error("Error al eliminar rol");
  }
};
const modificarRolUsuario = async (usuarioId, rolId) => {
  try {
    const query = `
      UPDATE usuarios 
      SET rol_id = $1 
      WHERE id = $2 
      RETURNING *;
    `;
    const response = await pool.query(query, [rolId, usuarioId]);
    return response.rows[0];
  } catch (error) {
    console.error("Error al modificar rol del usuario:", error);
    throw new Error("Error al modificar rol del usuario");
  }
};
export const RolesModel = {
  obtenerRoles,
  crearRol,
  eliminarRol,
  modificarRolUsuario,
};
