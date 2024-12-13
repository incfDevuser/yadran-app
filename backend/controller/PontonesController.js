import { PontonesModel } from "../models/PontonesModel.js";
import { ConcesionesModel } from "../models/ConcesionesModel.js";
//Obtener todos los pontones
const obtenerPontones = async (req, res) => {
  try {
    const pontones = await PontonesModel.obtenerPontones();
    return res.status(200).json({
      message: "Lista de pontones",
      pontones,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
//Obtener un ponton mediante el ID
const obtenerPonton = async (req, res) => {
  const { id } = req.params;
  try {
    const ponton = await PontonesModel.obtenerPonton(id);
    if (!ponton) {
      return res.status(404).json({
        message: "Ponton no encontrado",
      });
    }
    return res.status(200).json({
      message: "Ponton encontrado",
      ponton,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
//Crear un ponton
const crearPonton = async (req, res) => {
  const {
    nombre_ponton,
    concesion_id,
    tipo_ponton,
    habitabilidad_general,
    habitabilidad_interna,
    habitabilidad_externa,
  } = req.body;
  //Validar si la concesion existe
  const concecionExiste = await ConcesionesModel.obtenerConcesion(concesion_id);
  if (!concecionExiste) {
    return res.status(404).json({
      message: "La concesion proporcionada no existe",
    });
  }
  //Instanciar un nuevo ponton
  const ponton = {
    nombre_ponton,
    concesion_id,
    tipo_ponton,
    habitabilidad_general,
    habitabilidad_interna,
    habitabilidad_externa,
  };
  try {
    const nuevoPonton = await PontonesModel.crearPonton(ponton);
    return res.status(201).json({
      message: "Ponton creado",
      nuevoPonton,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
//Eliminar un ponton
const eliminarPonton = async (req, res) => {
  const { id } = req.params;
  //Primero buscar si el ponton existe
  const ifExist = await PontonesModel.obtenerPonton(id);
  if (!ifExist) {
    return res.status(404).json({
      message: "Ponton no encontrado",
    });
  }
  try {
    const deletedPonton = await PontonesModel.eliminarPonton(id);
    return res.status(200).json({
      message: "Ponton Eliminado",
      ifExist,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
const actualizarPonton = async (req, res) => {
  const { id } = req.params;
  const camposActualizados = req.body;
  try {
    const pontonExistente = await PontonesModel.obtenerPonton(id);
    if (!pontonExistente) {
      return res.status(404).json({
        message: "Pontón no encontrado",
      });
    }
    const pontonActualizado = await PontonesModel.actualizarPonton(
      id,
      camposActualizados
    );
    return res.status(200).json({
      message: "Pontón actualizado correctamente",
      pontonActualizado,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
export const PontonesController = {
  obtenerPontones,
  obtenerPonton,
  crearPonton,
  eliminarPonton,
  actualizarPonton
};
