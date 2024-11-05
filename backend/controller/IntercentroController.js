import { IntercentroModel } from "../models/IntercentroModel.js";

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
//Crear lanchas
const crearLanchas = async (req, res) => {
  const { nombre, capacidad, disponible } = req.body;
  //Instanciamos una nueva lancha
  const nuevaLancha = {
    nombre,
    capacidad,
    disponible,
  };
  try {
    const lancha = await IntercentroModel.crearLanchas(nuevaLancha);
    return res.status(201).json({
      message: "Lancha Creada",
      lancha,
    });
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
const crearRutaIntercentro = async (req, res) => {
  const {
    fecha,
    centro_origen_id,
    centro_destino_id,
    lancha_id,
    estado,
    comentarios,
  } = req.body;

  try {
    const nuevaRuta = await IntercentroModel.crearRuta({
      fecha,
      centro_origen_id,
      centro_destino_id,
      lancha_id,
      estado,
      comentarios,
    });

    res.status(201).json({
      message: "Ruta de intercentro creada correctamente",
      ruta: nuevaRuta,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear la ruta de intercentro",
      error: error.message,
    });
  }
};
const solicitarRuta = async (req, res) => {
  const { movimiento_id, comentario, estado } = req.body;
  const { id } = req.user;

  try {
    const solicitud = await IntercentroModel.solicitarRutaConUsuario({
      movimiento_id,
      usuario_id: id,
      comentario,
    });
    res.status(201).json({
      message: "Ruta de intercentro solicitada y usuario agregado a la lancha",
      solicitud,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
const aprobarSolicitud = async (req, res) => {
  const { solicitud_id } = req.params;
  try {
    const solicitudAprobada = await IntercentroModel.aprobarSolicitud(
      solicitud_id
    );
    return res.status(200).json({
      message: "Solicitud aprobada",
      solicitud: solicitudAprobada,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error interno del servidor al aprobar la solicitud",
      error: error.message,
    });
  }
};
const cancelarSolicitud = async (req, res) => {
  const { solicitudId } = req.params;
  try {
    const solicitudCancelada = await IntercentroModel.rechazarSolicitud(
      solicitudId
    );
    res.status(200).json({
      message: "Solicitud cancelada correctamente",
      solicitud: solicitudCancelada,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error interno del servidor al cancelar la solicitud",
      error: error.message,
    });
  }
};
const finalizarMovimiento = async (req, res) => {
  const { movimientoId } = req.params;
  try {
    const result = await completarMovimiento(movimientoId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error al finalizar el movimiento",
      error: error.message,
    });
  }
};
const obtenerSolicitudes = async (req, res) => {
  try {
    const solicitudes = await IntercentroModel.obtenerSolicitudesIntercentro();
    res.status(200).json({
      message: "Lista de solicitudes de intercentro",
      solicitudes,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Error interno del servidor al obtener las solicitudes de intercentro",
      error: error.message,
    });
  }
};
const cancelarSolicitudUsuario = async (req, res) => {
  const { id: solicitudId } = req.params;
  const { id: usuarioId } = req.user;
  try {
    const solicitud = await IntercentroModel.obtenerSolicitudPorId(solicitudId);
    if (solicitud.usuario_id !== usuarioId) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para cancelar esta solicitud" });
    }
    const solicitudCancelada = await IntercentroModel.cancelarSolicitudUsuario(
      solicitudId
    );
    res.status(200).json({
      message:
        "Solicitud cancelada correctamente y usuario eliminado de la lancha",
      solicitud: solicitudCancelada,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error interno del servidor al cancelar la solicitud",
      error: error.message,
    });
  }
};
export const IntercentroController = {
  obtenerLanchas,
  crearLanchas,
  obtenerRutasIntercentro,
  crearRutaIntercentro,
  solicitarRuta,
  aprobarSolicitud,
  cancelarSolicitud,
  finalizarMovimiento,
  obtenerSolicitudes,
  cancelarSolicitudUsuario
};
