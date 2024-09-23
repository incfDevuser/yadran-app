import { ZonasModel } from "../models/ZonasModel.js";
import { JurisdiccionesModel } from "../models/JurisdiccionesModel.js";

const obtenerZonas = async (req, res) => {
  try {
    const zonas = await ZonasModel.obtenerZonas();
    return res.status(200).json({
      message: "Zonas obtenidas",
      zonas,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
const obtenerZona = async (req, res) => {
  const { id } = req.params;
  try {
    const zona = await ZonasModel.obtenerZona(id);
    if (!zona) {
      return res.status(400).json({
        message: "Zona no encontrada",
      });
    }
    return res.status(200).json({
      message: "Zona encontrada",
      zona,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
const crearZona = async (req, res) => {
  const {
    nombre_zona,
    ubicacion_geografica,
    pais,
    region,
    fecha_apertura = new Date(),
    fecha_cierre = new Date(),
    jurisdiccion_id,
    estado_zona,
    descripcion,
    ruta_id,
  } = req.body;

  const jurisdiccionExiste = await JurisdiccionesModel.obtenerJurisdiccion(
    jurisdiccion_id
  );

  if (!jurisdiccionExiste) {
    return res.status(400).json({
      message: "La jurisdicción proporcionada no existe",
    });
  }
  const zona = {
    nombre_zona,
    ubicacion_geografica,
    pais,
    region,
    fecha_apertura,
    fecha_cierre,
    jurisdiccion_id,
    estado_zona,
    descripcion,
    ruta_id,
  };

  try {
    // Crear la zona
    const nuevaZona = await ZonasModel.crearZona(zona);
    if (!nuevaZona) {
      return res.status(400).json({
        message: "Error al crear una zona",
      });
    }
    return res.status(201).json({
      message: "Zona creada correctamente",
      nuevaZona,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
const actualizarZona = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const zonaActualizada = await ZonasModel.actualizarZona(id, data);
    if (!zonaActualizada) {
      return res.status(400).json({
        message: "Zona no encontrada",
      });
    }
    return res.status(200).json({
      message: "Zona actualizada",
      zonaActualizada,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar la zona",
      error: error.message,
    });
  }
};
const eliminarZona = async (req, res) => {
  const { id } = req.params;
  try {
    // Primero verificar si la zona existe
    const ifExist = await ZonasModel.obtenerZona(id);
    if (!ifExist) {
      return res.status(404).json({
        message: "Zona no encontrada",
      });
    }
    const deletedZona = await ZonasModel.eliminarZona(id);
    return res.status(200).json({
      message: "Zona eliminada correctamente",
      Zona_eliminada: ifExist,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

export const ZonasController = {
  obtenerZonas,
  obtenerZona,
  crearZona,
  actualizarZona,
  eliminarZona,
};
