import { PuertosModel } from "../models/PuertosModel.js";

const obtenerTodosLosPuertos = async (req, res) => {
  try {
    const puertos = await PuertosModel.obtenerPuertos();
    res.status(200).json({
      message: "Lista de puertos",
      puertos,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los puertos" });
  }
};
const obtenerPuertoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const puerto = await PuertosModel.obtenerPuerto(id);
    if (!puerto) {
      return res.status(404).json({ message: "Puerto no encontrado" });
    }
    res.status(200).json({
      message: "Puerto encontrado",
      puerto,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el puerto" });
  }
};
const crearNuevoPuerto = async (req, res) => {
  const {
    nombre_puerto,
    ubicacion_puerto,
    localidad,
    jurisdiccion_id,
    estado,
  } = req.body;
  try {
    const nuevoPuerto = await PuertosModel.crearPuerto({
      nombre_puerto,
      ubicacion_puerto,
      localidad,
      jurisdiccion_id,
      estado,
    });
    res.status(201).json({
      message: "Puerto creado",
      nuevoPuerto,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el puerto" });
  }
};

const actualizarPuerto = async (req, res) => {
  const { id } = req.params;
  const camposActualizados = req.body;

  try {
    const puertoExistente = await PuertosModel.obtenerPuerto(id);
    if (!puertoExistente) {
      return res.status(404).json({
        message: "Puerto no encontrado",
      });
    }

    const puertoActualizado = await PuertosModel.actualizarPuerto(
      id,
      camposActualizados
    );
    return res.status(200).json({
      message: "Puerto actualizado correctamente",
      puertoActualizado,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

const eliminarPuerto = async (req, res) => {
  const { id } = req.params;
  try {
    const puertoEliminado = await PuertosModel.eliminarPuerto(id);
    if (!puertoEliminado) {
      return res.status(404).json({ message: "Puerto no encontrado" });
    }
    res.status(200).json({ message: "Puerto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el puerto" });
  }
};

export const PuertosController = {
  obtenerTodosLosPuertos,
  obtenerPuertoPorId,
  crearNuevoPuerto,
  actualizarPuerto,
  eliminarPuerto,
};
