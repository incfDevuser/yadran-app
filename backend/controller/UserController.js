import { UserModel } from "../models/UserModel.js";
import dotenv from "dotenv";
dotenv.config();

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await UserModel.obtenerUsuarios();
    return res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return res.status(500).json({ error: "Error al obtener usuarios" });
  }
};
const obtenerUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await UserModel.obtenerUsuario(id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return res.status(500).json({ error: "Error al obtener el usuario" });
  }
};
const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await UserModel.obtenerUsuario(id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await UserModel.eliminarUsuario(id);
    return res.status(200).json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};
const myProfile = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await UserModel.obtenerUsuarioConViajes(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error en myProfile:", error.message);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const camposActualizados = req.body;

  try {
    const usuarioExistente = await UserModel.obtenerUsuario(id);

    if (!usuarioExistente) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const usuarioActualizado = await UserModel.actualizarUsuario(
      id,
      camposActualizados
    );

    return res.status(200).json({
      message: "Usuario actualizado exitosamente",
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error.message);
    return res
      .status(500)
      .json({ error: "Error interno al actualizar el usuario" });
  }
};

export const UserController = {
  obtenerUsuarios,
  obtenerUsuario,
  eliminarUsuario,
  myProfile,
  actualizarUsuario,
};
