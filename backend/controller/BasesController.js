import { BasesModel } from "../models/BasesModel.js";

const obtenerBases = async (req, res) => {
  try {
    const bases = await BasesModel.obtenerBases();
    return res.status(200).json({
      message: "Lista de bases",
      bases,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
const obtenerBase = async (req, res) => {
  const { id } = req.params;
  try {
    const base = await BasesModel.obtenerBase(id);
    if (!base) {
      return res.status(404).json({
        message: "Base no encontrada",
      });
    }
    return res.status(200).json({
      message: "Base encontrada",
      base,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
const crearBase = async (req, res) => {
  const { nombre_base, jefe_base, ponton_id } = req.body;
  const base = {
    nombre_base,
    jefe_base,
    ponton_id,
  };
  try {
    const nuevaBase = await BasesModel.crearBase(base);
    return res.status(201).json({
      message: "Base creada correctamente",
      nuevaBase,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
const actualizarBase = async (req, res) => {
  try {
  } catch (error) {}
};
const eliminarBase = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

export const BaseController = {
  obtenerBases,
  obtenerBase,
  crearBase,
  actualizarBase,
  eliminarBase,
};
