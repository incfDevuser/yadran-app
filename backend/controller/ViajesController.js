import { ViajesModel } from "../models/ViajesModel.js";

const solicitarViaje = async (req, res) => {
  const {
    usuario_id,
    ruta_id,
    fecha_inicio,
    fecha_fin,
    estado,
    actividad,
    comentario_usuario,
  } = req.body;
  try {
    const solicitud = await ViajesModel.solicitarViaje({
      usuario_id,
      ruta_id,
      fecha_inicio,
      fecha_fin,
      estado: estado || "Pendiente",
      actividad,
      comentario_usuario,
    });
    res.status(201).json({
      message: "Solicitud de viaje creada con éxito",
      viaje: solicitud,
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
  const { viaje_id } = req.params;
  const { estado } = req.body;
  try {
    const viajeActualizado = await ViajesModel.aprobarRechazarViaje(
      viaje_id,
      estado
    );
    res.status(200).json({
      message: `Viaje ${estado} con éxito`,
      viaje: viajeActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar el estado del viaje:", error);
    res
      .status(500)
      .json({ message: "Error al actualizar el estado del viaje" });
  }
};

export const ViajesController = {
  solicitarViaje,
  obtenerViajes,
  aprobarRechazarViaje,
};
