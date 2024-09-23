import { CentrosModel } from "../models/CentrosModel.js";

const obtenerCentros = async (req, res) => {
  try {
    const centros = await CentrosModel.obtenerCentros();
    return res.status(200).json({
      message: "Lista de centros",
      centros,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
const obtenerCentro = async (req, res) => {
  const { id } = req.params;
  try {
    const centro = await CentrosModel.obtenerCentro(id);
    if (!centro) {
      return res.status(404).json({
        message: "Centro no encontrado",
      });
    }
    return res.status(200).json({
      message: "Centro encontrado",
      centro,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
const crearCentro = async (req, res) => {
  const {
    nombre_centro,
    fecha_apertura_productiva,
    fecha_cierre_productivo,
    jefe_centro,
    etapa_ciclo_cultivo,
    estructuras,
  } = req.body;
  //Instanciar un centro
  const centro = {
    nombre_centro,
    fecha_apertura_productiva,
    fecha_cierre_productivo,
    jefe_centro,
    etapa_ciclo_cultivo,
    estructuras,
  };
  try {
    const nuevoCentro = await CentrosModel.crearCentro(centro);
    return res.status(201).json({
      message: "Centro creado correctamente",
      centro,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
const actualizarCentro = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
const eliminarCentro = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
export const CentrosController = {
  obtenerCentros,
  obtenerCentro,
  crearCentro,
  actualizarCentro,
  eliminarCentro,
};
