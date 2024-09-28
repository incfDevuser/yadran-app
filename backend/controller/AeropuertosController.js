import { AeropuertosModel } from "../models/AeropuertosModel.js";

const obtenerTodosLosAeropuertos = async (req, res) => {
  try {
    const aeropuertos = await AeropuertosModel.obtenerAeropuertos();
    res.status(200).json({
      message: "Lista de aeropuertos",
      aeropuertos,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los aeropuertos" });
  }
};

const obtenerAeropuertoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const aeropuerto = await AeropuertosModel.obtenerAeropuerto(id);
    if (!aeropuerto) {
      return res.status(404).json({ message: "Aeropuerto no encontrado" });
    }
    res.status(200).json({
      message: "Aeropuerto encontrado",
      aeropuerto,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el aeropuerto" });
  }
};

const crearNuevoAeropuerto = async (req, res) => {
  const {
    nombre_aeropuerto,
    ubicacion_aeropuerto,
    localidad,
    jurisdiccion_id,
    estado,
  } = req.body;
  try {
    const nuevoAeropuerto = await AeropuertosModel.crearAeropuerto({
      nombre_aeropuerto,
      ubicacion_aeropuerto,
      localidad,
      jurisdiccion_id,
      estado,
    });
    res.status(201).json({
      message: "Aeropuerto creado",
      nuevoAeropuerto,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el aeropuerto" });
  }
};
const actualizarAeropuerto = async (req, res) => {};
const eliminarAeropuerto = async (req, res) => {
  const { id } = req.params;
  try {
    const aeropuertoEliminado = await AeropuertosModel.eliminarAeropuerto(id);
    if (!aeropuertoEliminado) {
      return res.status(404).json({ message: "Aeropuerto no encontrado" });
    }
    res.status(200).json({ message: "Aeropuerto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el aeropuerto" });
  }
};

export const AeropuertoController = {
  obtenerTodosLosAeropuertos,
  obtenerAeropuertoPorId,
  crearNuevoAeropuerto,
  actualizarAeropuerto,
  eliminarAeropuerto,
};
