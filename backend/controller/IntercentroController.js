import { IntercentroModel } from "../models/IntercentroModel.js";
import { emailHelper } from "../Services/MailHelper.js";

const obtenerLanchas = async (req, res) => {
  try {
    const lanchas = await IntercentroModel.obtenerLanchas();
    return res.status(200).json({ message: "Lista de lanchas", lanchas });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
const obtenerLanchasPorMovimiento = async (req, res) => {
  const { movimientoId } = req.params;

  try {
    const lanchas = await IntercentroModel.obtenerLanchasPorMovimiento(
      movimientoId
    );

    if (!lanchas || lanchas.length === 0) {
      return res.status(404).json({
        message: `No se encontraron lanchas asociadas al movimiento con ID ${movimientoId}.`,
      });
    }

    res.status(200).json({
      message: `Lanchas del movimiento ${movimientoId} obtenidas exitosamente.`,
      lanchas,
    });
  } catch (error) {
    console.error(
      "Error al obtener las lanchas por movimiento:",
      error.message
    );
    res.status(500).json({
      error: "Hubo un error al obtener las lanchas por movimiento.",
    });
  }
};
//Obtener ponones por movimiento
const obtenerPontonesPorMovimiento = async (req, res) => {
  const { movimientoId } = req.params;

  try {
    const pontones = await IntercentroModel.obtenerPontonesPorMovimiento(
      movimientoId
    );
    res.status(200).json({
      message: `Pontones del movimiento ${movimientoId} obtenidos exitosamente.`,
      pontones,
    });
  } catch (error) {
    console.error("Error al obtener los pontones por movimiento:", error);
    res.status(500).json({
      message: "Hubo un error al obtener los pontones por movimiento.",
    });
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
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
const obtenerRutasIntercentro = async (req, res) => {
  try {
    const rutas = await IntercentroModel.obtenerRutasIntercentro();
    return res
      .status(200)
      .json({ message: "Lista de rutas de intercentro", rutas });
  } catch (error) {
    return res
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

    return res.status(201).json({
      message: "Ruta de intercentro creada correctamente",
      ruta: nuevaRuta,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al crear la ruta de intercentro",
      error: error.message,
    });
  }
};
//Solicitar intercetro para usuario - hacer nodemailer
const solicitarRuta = async (req, res) => {
  const { movimiento_id, comentario } = req.body;
  const usuario_id = req.user.id;
  const emailCliente = req.user.email; // Aquí obtienes el email directamente de req.user

  if (!emailCliente) {
    return res.status(400).json({ message: "El usuario no tiene un correo registrado" });
  }

  try {
    // Crear la solicitud de intercentro
    const solicitud = await IntercentroModel.solicitarRutaConUsuario({
      movimiento_id,
      usuario_id,
      comentario,
    });

    // Obtener los detalles completos del viaje solicitado
    const detallesSolicitud = await IntercentroModel.getDetalleIntercentro(solicitud.id);

    // Construir los datos para el correo
    const emailData = {
      solicitud_id: detallesSolicitud.solicitud_id,
      nombre: detallesSolicitud.nombre,
      email: emailCliente, // Usa el email del usuario autenticado
      fecha: detallesSolicitud.fecha,
      centro_origen_nombre: detallesSolicitud.centro_origen_nombre,
      centro_destino_nombre: detallesSolicitud.centro_destino_nombre,
      estado_movimiento: detallesSolicitud.estado_movimiento,
      comentario: detallesSolicitud.comentario,
      lancha_nombre: detallesSolicitud.lancha_nombre,
    };

    // Enviar el correo
    await emailHelper.sendEmailIntercentro(emailCliente, emailData);

    return res.status(201).json({
      message: "Ruta de intercentro solicitada exitosamente y correo enviado.",
      solicitud,
    });
  } catch (error) {
    console.error("Error al solicitar ruta de intercentro:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
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
    return res.status(500).json({
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
    return res.status(200).json({
      message: "Solicitud cancelada correctamente",
      solicitud: solicitudCancelada,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor al cancelar la solicitud",
      error: error.message,
    });
  }
};
const finalizarMovimiento = async (req, res) => {
  const { movimientoId } = req.params;
  try {
    const result = await completarMovimiento(movimientoId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Error al finalizar el movimiento",
      error: error.message,
    });
  }
};
const obtenerSolicitudes = async (req, res) => {
  try {
    const solicitudes = await IntercentroModel.obtenerSolicitudesIntercentro();
    return res.status(200).json({
      message: "Lista de solicitudes de intercentro",
      solicitudes,
    });
  } catch (error) {
    return res.status(500).json({
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
    return res.status(200).json({
      message:
        "Solicitud cancelada correctamente y usuario eliminado de la lancha",
      solicitud: solicitudCancelada,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor al cancelar la solicitud",
      error: error.message,
    });
  }
};
const cancelarSolicitudTrabajador = async (req, res) => {
  const { id: solicitudId } = req.params;
  const contratistaId = req.user.id;

  try {
    const response = await IntercentroModel.cancelarSolicitudTrabajador(
      solicitudId,
      contratistaId
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const IntercentroController = {
  obtenerLanchas,
  obtenerLanchasPorMovimiento,
  obtenerPontonesPorMovimiento,
  crearLanchas,
  obtenerRutasIntercentro,
  crearRutaIntercentro,
  solicitarRuta,
  aprobarSolicitud,
  cancelarSolicitud,
  finalizarMovimiento,
  obtenerSolicitudes,
  cancelarSolicitudUsuario,
  cancelarSolicitudTrabajador,
};
