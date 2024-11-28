import { ViajesModel } from "../models/ViajesModel.js";
import { SeguimientoModel } from "../models/SeguimientoModel.js";
import { emailHelper } from "../Services/MailHelper.js";

const crearViaje = async (req, res) => {
  const { nombre, descripcion, ruta_id } = req.body;

  try {
    const viaje = await ViajesModel.crearViaje({
      nombre,
      descripcion,
      ruta_id,
    });
    res.status(201).json({
      message: "Viaje creado con éxito",
      viaje,
    });
  } catch (error) {
    console.error("Error al crear el viaje:", error);
    res.status(500).json({ message: "Error al crear el viaje" });
  }
};
//Obtener viajes
const obtenerViajes = async (req, res) => {
  try {
    const viajes = await ViajesModel.obtenerViajes();
    res.status(200).json({
      message: "Lista de viajes",
      viajes,
    });
  } catch (error) {
    console.error("Error al obtener los viajes:", error);
    res.status(500).json({ message: "Error al obtener los viajes" });
  }
};
//Obtener solicitudes de viaje
const obtenerSolicitudesUsuariosNaturales = async (req, res) => {
  try {
    const result = await ViajesModel.obtenerSolicitudesUsuariosNaturales();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Obtener solicitudes de viaje contratista
const obtenerSolicitudesContratista = async (req, res) => {
  try {
    const result = await ViajesModel.obtenerSolicitudesTrabajadores();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Controlador para agendar un viaje para un usuario natural
const solicitarViajeUsuarioNatural = async (req, res) => {
  const { viaje_id, fecha_inicio, fecha_fin, comentario_usuario } = req.body;
  const usuario_id = req.user.id;
  const emailCliente = req.user.email;
  const nombreUsuario = req.user.nombre_completo || "Usuario";
  try {
    const solicitud = await ViajesModel.solicitarViajeParaUsuario({
      usuario_id,
      viaje_id,
      fecha_inicio,
      fecha_fin,
      comentario_usuario,
    });
    const detallesViaje = await SeguimientoModel.getDetalleCompletoViaje(
      viaje_id
    );
    const emailData = {
      fechaInicio: fecha_inicio,
      fechaFin: fecha_fin,
      estadoSolicitud: "Pendiente",
      viaje: detallesViaje.viaje,
      trayectos: detallesViaje.trayectos,
      ponton: detallesViaje.viaje.nombre_ponton || "No especificado",
    };
    await emailHelper.sendEmail(emailCliente, emailData);
    res.status(201).json({
      message: "Viaje solicitado exitosamente y detalles enviados al correo.",
      solicitud,
    });
  } catch (error) {
    console.error("Error al solicitar viaje para el usuario natural:", error);
    res.status(500).json({
      message: "Error al solicitar viaje para el usuario natural",
      error: error.message,
    });
  }
};
//Cancelar Viaje Usuario
const cancelarViajeUsuarioHandler = async (req, res) => {
  console.log(req.params);
  const { solicitudId } = req.params;
  try {
    if (!solicitudId) {
      throw new Error("El ID de la solicitud es requerido");
    }
    const response = await ViajesModel.cancelarViajeUsuarioYTrabajadores(
      solicitudId
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Error al cancelar la solicitud de viaje",
      error: error.message,
    });
  }
};
//Agendar viaje para trabajadores - hacer nodemailer
const agendarViajeParaTrabajadores = async (req, res) => {
  const contratista_id = req.user.id;
  const emailCliente = req.user.email; // Email del contratista
  const {
    viaje_id,
    trabajadores,
    fecha_inicio,
    fecha_fin,
    comentario_contratista,
  } = req.body;

  if (!emailCliente) {
    return res.status(400).json({
      message: "El contratista no tiene un correo registrado",
    });
  }

  try {
    // Agendar viaje para trabajadores
    const response = await ViajesModel.agendarViajeParaTrabajadores({
      contratista_id,
      viaje_id,
      trabajadores,
      fecha_inicio,
      fecha_fin,
      comentario_contratista,
    });

    // Obtener detalles del viaje y trabajadores asociados
    const detallesViaje = await ViajesModel.getDetallesViajeConTrabajadores(
      viaje_id
    );

    if (!detallesViaje || detallesViaje.length === 0) {
      return res.status(404).json({
        message: "No se encontraron detalles del viaje o trabajadores asociados.",
      });
    }

    const viaje = {
      nombre: detallesViaje[0]?.nombre_viaje,
      descripcion: detallesViaje[0]?.descripcion_viaje,
      fecha_inicio,
      fecha_fin,
    };

    const trabajadoresInfo = detallesViaje
      .filter((item) => item.trabajador_id)
      .map((item) => ({
        id: item.trabajador_id,
        nombre: item.nombre_trabajador,
        email: item.email_trabajador,
        estado: item.estado_trabajador || "Pendiente",
      }));

    const emailData = {
      ...viaje,
      trabajadores: trabajadoresInfo,
    };

    // Enviar correo al contratista
    await emailHelper.sendEmailContratista(emailCliente, emailData);

    res.status(201).json({
      message: "Viaje para trabajadores agendado exitosamente y correo enviado.",
      solicitudes: response.solicitudes,
    });
  } catch (error) {
    console.error("Error al agendar viaje para trabajadores:", error);
    res.status(500).json({
      message: "Error al agendar viaje para trabajadores",
      error: error.message,
    });
  }
};


//Rechazar la solicitud de viaje
const rechazarSolicitudViaje = async (req, res) => {
  const { solicitudId } = req.params;

  try {
    const result = await ViajesModel.rechazarSolicitudViaje(solicitudId);
    res.json({ message: result.message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Aprobar solicitud de viaje para un usuario o trabajador
const aprobarSolicitudViaje = async (req, res) => {
  const { solicitud_id } = req.params;

  try {
    const resultado = await ViajesModel.aprobarSolicitudViaje(solicitud_id);

    res.status(200).json({
      message: "Solicitud de viaje aprobada exitosamente",
    });
  } catch (error) {
    console.error("Error al aprobar la solicitud de viaje:", error);
    res.status(500).json({
      message: "Hubo un error al aprobar la solicitud de viaje",
      error: error.message,
    });
  }
};
export const ViajesController = {
  crearViaje,
  obtenerViajes,
  solicitarViajeUsuarioNatural,
  rechazarSolicitudViaje,
  obtenerSolicitudesUsuariosNaturales,
  aprobarSolicitudViaje,
  agendarViajeParaTrabajadores,
  obtenerSolicitudesContratista,
  cancelarViajeUsuarioHandler,
};
