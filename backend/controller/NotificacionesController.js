import { NotificacionesModel } from "../models/NotificacionesModel.js";

const obtenerNotificaciones = async (req, res) => {
  try {
    const notificaciones = await NotificacionesModel.obtenerNotificaciones();
    return res.status(200).json({
      message: "Lista de notificaciones",
      notificaciones,
    });
  } catch (error) {
    console.error("Error al obtener notificaciones:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

const crearNotificacion = async (req, res) => {
  const { titulo, descripcion, tipo, destinatario_id = null } = req.body;
  try {
    const nuevaNotificacion = await NotificacionesModel.crearNotificacion({
      titulo,
      descripcion,
      tipo,
      destinatario_id,
    });
    return res.status(201).json({
      message: "Notificación creada",
      notificacion: nuevaNotificacion,
    });
  } catch (error) {
    console.error("Error al crear notificación:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

const eliminarNotificacion = async (req, res) => {
  const { id } = req.params;
  try {
    await NotificacionesModel.eliminarNotificacion(id);
    return res.status(200).json({
      message: "Notificación eliminada con éxito",
    });
  } catch (error) {
    console.error("Error al eliminar notificación:", error);
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
    console.error("Error al crear notificación global:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

const obtenerNotificacionesPorUsuario = async (req, res) => {
  const usuario_id = req.user.id;
  try {
    const notificaciones =
      await NotificacionesModel.obtenerNotificacionesPorUsuario(usuario_id);
    return res.status(200).json({
      message: "Notificaciones del usuario obtenidas con éxito",
      notificaciones,
    });
  } catch (error) {
    console.error("Error al obtener notificaciones por usuario:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
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
    console.error("Error al marcar notificación como leída:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
const actualizarNotificacion = async (req, res) => {
  const { id } = req.params;
  const campos = req.body;

  try {
    if (!Object.keys(campos).length) {
      return res
        .status(400)
        .json({ message: "No se enviaron campos para actualizar" });
    }

    const notificacionActualizada =
      await NotificacionesModel.actualizarNotificacion(id, campos);

    if (!notificacionActualizada) {
      return res.status(404).json({ message: "Notificación no encontrada" });
    }

    res.status(200).json({
      message: "Notificación actualizada con éxito",
      notificacion: notificacionActualizada,
    });
  } catch (error) {
    console.error("Error al actualizar notificación:", error);
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const NotificacionesController = {
  obtenerNotificaciones,
  crearNotificacion,
  actualizarNotificacion,
  eliminarNotificacion,
  crearNotificacionGlobal,
  obtenerNotificacionesPorUsuario,
  marcarNotificacionComoLeida,
};
