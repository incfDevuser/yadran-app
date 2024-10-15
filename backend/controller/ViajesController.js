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
const solicitarViaje = async (req, res) => {
  //El id del usuario se obtiene del req.user
  const { id } = req.user
  console.log("id del usuario:", id)
  const { viaje_id, fecha_inicio, fecha_fin, comentario_usuario } =
    req.body;
  //Instanciar al usuario
  const nuevaSolicitud = {
    usuario_id: id,
    viaje_id,
    fecha_inicio,
    fecha_fin,
    comentario_usuario
  }
  try {
    const solicitud = await ViajesModel.solicitarViaje(nuevaSolicitud)
    res.status(201).json({
      message: "Solicitud de viaje creada con éxito",
      solicitud,
    });
  } catch (error) {
    console.error("Error al crear la solicitud de viaje:", error);
    res.status(500).json({ message: "Error al crear la solicitud de viaje" });
  }
};

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

const aprobarRechazarViaje = async (req, res) => {
  const { viaje_usuario_id } = req.params;
  const { estado } = req.body;
  try {
    const solicitudActualizada = await ViajesModel.aprobarRechazarViaje(
      viaje_usuario_id,
      estado
    );
    res.status(200).json({
      message: `Solicitud de viaje ${estado.toLowerCase()} con éxito`,
      solicitud: solicitudActualizada,
    });
  } catch (error) {
    console.error(
      "Error al actualizar el estado de la solicitud de viaje:",
      error
    );
    res.status(500).json({
      message: "Error al actualizar el estado de la solicitud de viaje",
    });
  }
};
//Obtener solicitudes de viaje
const solicitudes = async (req, res) => {
  try {
    const solicitudes = await ViajesModel.obtenerSolicitudes();
    return res.status(200).json({
      message: "Lista de solicitudes",
      solicitudes,
    });
  } catch (error) {
    console.error("Error al obtener solicitudes:", error);
    res.status(500).json({
      message: "Error al obtener solicitudes",
    });
  }
};

export const ViajesController = {
  crearViaje,
  solicitarViaje,
  obtenerViajes,
  aprobarRechazarViaje,
  solicitudes
};
