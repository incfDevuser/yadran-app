import { ViajesModel } from "../models/ViajesModel.js";

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
//Controlador para agendar un viaje para un usuario natural
const solicitarViajeUsuarioNatural = async (req, res) => {
  const { viaje_id, fecha_inicio, fecha_fin, comentario_usuario } = req.body;
  const usuario_id = req.user.id;
  try {
    const solicitud = await ViajesModel.solicitarViajeParaUsuario({
      usuario_id,
      viaje_id,
      fecha_inicio,
      fecha_fin,
      comentario_usuario,
    });

    res.status(201).json({
      message: "Viaje solicitado exitosamente para el usuario natural",
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
      message: "Solicitud de viaje aprobada exitosamente"
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
  aprobarSolicitudViaje
};
