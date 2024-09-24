import { TrayectosModel } from "../../models/Trayectos/TrayectosModel.js";

const obtenerTrayectos = async (req, res) => {
  try {
    const trayectos = await TrayectosModel.obtenerTrayectos();
    res.status(200).json({
      message: "Lista de trayectos",
      trayectos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener trayectos",
      error: error.message,
    });
  }
};
const obtenerTrayecto = async (req, res) => {
  const { id } = req.params;
  try {
    const trayecto = await TrayectosModel.obtenerTrayecto(id);
    if (!trayecto) {
      return res.status(404).json({
        message: "Trayecto no encontrado",
      });
    }
    res.status(200).json({
      message: "Trayecto encontrado",
      trayecto,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el trayecto",
      error: error.message,
    });
  }
};
const crearTrayecto = async (req, res) => {
  const {
    ruta_id,
    origen,
    destino,
    duracion_estimada,
    orden,
    estado = "Pendiente",
    vehiculo_id,
  } = req.body;

  try {
    const nuevoTrayecto = await TrayectosModel.crearTrayecto({
      ruta_id,
      origen,
      destino,
      duracion_estimada,
      orden,
      estado,
      vehiculo_id,
    });
    res.status(201).json({
      message: "Trayecto creado exitosamente",
      nuevoTrayecto,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el trayecto",
      error: error.message,
    });
  }
};

const actualizarTrayecto = async (req, res) => {};
const eliminarTrayecto = async (req, res) => {
  const { id } = req.params;

  try {
    const trayectoEliminado = await TrayectosModel.eliminarTrayecto(id);
    res.status(200).json({
      message: "Trayecto eliminado",
      trayectoEliminado,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el trayecto",
      error: error.message,
    });
  }
};
export const TrayectosController = {
  obtenerTrayectos,
  obtenerTrayecto,
  crearTrayecto,
  actualizarTrayecto,
  eliminarTrayecto,
};
