import { IntercentroModel } from "../models/IntercentroModel";

const obtenerLanchas = async (req, res) => {
  try {
    const lanchas = await IntercentroModel.obtenerLanchas();
    res.status(200).json({ message: "Lista de lanchas", lanchas });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
const obtenerRutasIntercentro = async (req, res) => {
  try {
    const rutas = await IntercentroModel.obtenerRutasIntercentro();
    res.status(200).json({ message: "Lista de rutas de intercentro", rutas });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
const solicitarRuta = async (req, res) => {
  const { movimiento_id, comentario, estado } = req.body;
  const { usuario_id } = req.user;
  try {
    const solicitud = await IntercentroModel.solicitarRuta({
      movimiento_id,
      usuario_id,
      comentario,
      estado,
    });
    res
      .status(201)
      .json({ message: "Ruta de intercentro solicitada", solicitud });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
const estadoSolicitud = async (req, res) => {
  const { solicitudId } = req.params;
  const { nuevoEstado } = req.body;
  try {
    const solicitudActualizada = await IntercentroModel.estadoSolicitud(
      solicitudId,
      nuevoEstado
    );
    res.status(200).json({
      message: "Estado de solicitud actualizado",
      solicitud: solicitudActualizada,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
const cancelarSolicitud = async (req, res) => {
  const { solicitudId } = req.params;
  try {
    const solicitudCancelada = await IntercentroModel.cancelarSolicitud(
      solicitudId
    );
    res.status(200).json({
      message: "Solicitud cancelada correctamente",
      solicitud: solicitudCancelada,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
export const IntercentroController = {
  obtenerLanchas,
  obtenerRutasIntercentro,
  solicitarRuta,
  estadoSolicitud,
  cancelarSolicitud,
};
