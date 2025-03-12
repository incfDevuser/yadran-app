import { ConcesionesModel } from "../models/ConcesionesModel.js";
import { ZonasModel } from "../models/ZonasModel.js";

const obtenerConcesiones = async (req, res) => {
  try {
    const concesiones = await ConcesionesModel.obtenerConcesiones();
    return res.status(200).json({
      message: "Lista de concesiones",
      concesiones,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
const obtenerConcesion = async (req, res) => {
  const { id } = req.params;
  try {
    const concesion = await ConcesionesModel.obtenerConcesion(id);
    if (!concesion) {
      return res.status(400).json({
        message: "Concesion no encontrada",
      });
    }
    return res.status(200).json({
      message: "Concesion encontrada",
      concesion,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
const crearConcesion = async (req, res) => {
  const { nombre_concesion, zona_id } = req.body;
  //Verificar si la zona existe
  const zonaExiste = await ZonasModel.obtenerZona(zona_id);
  if (!zonaExiste) {
    return res.status(404).json({
      message: "La zona proporcionada no existe",
    });
  }
  //Instanciar la nueva concesion
  const concesion = {
    nombre_concesion,
    zona_id,
  };
  try {
    const nuevaConcesion = await ConcesionesModel.crearConcesion(concesion);
    return res.status(201).json({
      message: "Concecion creada",
      nuevaConcesion,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
const actualizarConcesion = async (req, res) => {
  const { id } = req.params;
  const camposActualizados = req.body;

  try {
    const concesionExistente = await ConcesionesModel.obtenerConcesion(id);
    if (!concesionExistente) {
      return res.status(404).json({
        message: "Concesión no encontrada",
      });
    }

    const concesionActualizada = await ConcesionesModel.actualizarConcesion(
      id,
      camposActualizados
    );
    return res.status(200).json({
      message: "Concesión actualizada correctamente",
      concesionActualizada,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

const eliminarConcesion = async (req, res) => {
  const { id } = req.params;
  //Verificar si la concesion existe
  const ifExist = await ConcesionesModel.obtenerConcesion(id);
  if (!ifExist) {
    return res.status(404).json({
      message: "Concesion no existe",
    });
  }
  try {
    const deletedConcesion = await ConcesionesModel.eliminarConcesion(id);
    return res.status(200).json({
      message: "Concesion eliminada correctamente",
      Concesion_eliminada: ifExist,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

export const ConcesionController = {
  obtenerConcesiones,
  obtenerConcesion,
  crearConcesion,
  actualizarConcesion,
  eliminarConcesion,
};
