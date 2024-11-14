import { RolesModel } from "../models/RolesModel.js";

//Obtener todos los roles
const obtenerRoles = async (req, res) => {
  try {
    const roles = await RolesModel.obtenerRoles();
    res.status(200).json(roles);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener roles", error: error.message });
  }
};
//Crear un nuevo rol
const crearRol = async (req, res) => {
  const { nombreRol, descripcion } = req.body;
  try {
    const nuevoRol = await RolesModel.crearRol(nombreRol, descripcion);
    res.status(201).json({ message: "Rol creado exitosamente", rol: nuevoRol });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear rol", error: error.message });
  }
};
//Eliminar un rol
const eliminarRol = async (req, res) => {
  const { rolId } = req.params;
  try {
    const rolEliminado = await RolesModel.eliminarRol(rolId);
    res
      .status(200)
      .json({ message: "Rol eliminado exitosamente", rol: rolEliminado });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar rol", error: error.message });
  }
};
//Modificar el rol de un usuario
const modificarRolUsuario = async (req, res) => {
  const { usuarioId, rolId } = req.body;
  try {
    const usuarioActualizado = await RolesModel.modificarRolUsuario(
      usuarioId,
      rolId
    );
    res.status(200).json({
      message: "Rol del usuario actualizado exitosamente",
      usuario: usuarioActualizado,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al modificar rol del usuario",
      error: error.message,
    });
  }
};
export const RolesController = {
  obtenerRoles,
  crearRol,
  eliminarRol,
  modificarRolUsuario,
};
