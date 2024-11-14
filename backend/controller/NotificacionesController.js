import { NotificacionesModel } from "../models/NotificacionesModel.js";

const obtenerNotificaciones = async (req, res) => {
  try {
    const notificaciones = await NotificacionesModel.obtenerNotificaciones();
    return res.status(200).json({
      message: "Lista de notificaciones",
      notificaciones,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
const crearNotificacion = async (req, res) => {
  const { titulo, descripcion, tipo } = req.body;
  const nuevaNotificacion = {
    titulo,
    descripcion,
    tipo,
  };
  try {
    const crear = await NotificacionesModel.crearNotificacion(
      nuevaNotificacion
    );
    return res.status(201).json({
      message: "Notificacion creada",
      nuevaNotificacion,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
const eliminarNotificacion = async (req, res) => {
  const { id } = req.params;
  try {
    const solicitudEliminar = await NotificacionesModel.eliminarNotificacion(
      id
    );
    return res.status(200).json({
      message: "Notificacion Eliminada",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
const crearNotificacionGlobal = async (req, res) => {
  const { titulo, descripcion, tipo } = req.body;
  try {
    const notificacion = await NotificacionesModel.crearNotificacionGlobal({
      titulo,
      descripcion,
      tipo,
    });
    return res.status(201).json({
      message: "Notificación global creada y enviada a todos los usuarios",
      notificacion,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error al crear la notificación global",
    });
  }
};
const obtenerNotificacionesPorUsuario = async (req, res) => {
  const usuario_id = req.user.id;
  try {
    const notificaciones =
      await NotificacionesModel.obtenerNotificacionesPorUsuario(usuario_id);
    return res.status(200).json({
      message: "Notificaciones del usuario",
      notificaciones,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error al obtener las notificaciones del usuario",
    });
  }
};
const marcarNotificacionComoLeida = async (req, res) => {
  const usuario_id = req.user.id;
  const { notificacion_id } = req.params;
  try {
    const notificacionLeida =
      await NotificacionesModel.marcarNotificacionComoLeida({
        usuario_id,
        notificacion_id,
      });
    return res.status(200).json({
      message: "Notificación marcada como leída",
      notificacion: notificacionLeida,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error al marcar la notificación como leída",
    });
  }
};
export const NotificacionesController = {
  obtenerNotificaciones,
  crearNotificacion,
  eliminarNotificacion,
  crearNotificacionGlobal,
  obtenerNotificacionesPorUsuario,
  marcarNotificacionComoLeida,
};
