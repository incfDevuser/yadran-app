import { JurisdiccionesModel } from "../models/JurisdiccionesModel.js";

const obtenerJurisdicciones = async (req, res) => {
  try {
    //Llamar a la funcion del modelo para obtener todas las jurisdicciones
    const jurisdicciones = await JurisdiccionesModel.obtenerJurisdicciones();
    return res.status(200).json({
      message: "Lista de Jurisdicciones",
      jurisdicciones,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
const obtenerJurisdiccion = async (req, res) => {
  const { id } = req.params;
  try {
    const jurisdiccion = await JurisdiccionesModel.obtenerJurisdiccion(id);
    if (!jurisdiccion) {
      return res.status(404).json({
        message: "Jurisdiccion no encontrada",
      });
    }
    return res.status(200).json({
      message: "Jurisdiccion",
      jurisdiccion,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
const crearJurisdiccion = async (req, res) => {
  // Obtener del body para la consulta
  const {
    nombre_jurisdiccion,
    ubicacion_geografica,
    sectores,
    estado,
    tipo_embarcacion,
    contacto,
    integracion,
    fecha_ultima_modificacion = new Date()
  } = req.body;

  const jurisdiccion = {
    nombre_jurisdiccion,
    ubicacion_geografica,
    sectores,
    estado,
    tipo_embarcacion,
    contacto,
    integracion,
    fecha_ultima_modificacion
  };

  try {
    // Crear la jurisdicción en la base de datos
    const nuevaJurisdiccion = await JurisdiccionesModel.crearJurisdiccion(
      jurisdiccion
    );
    if (!nuevaJurisdiccion) {
      return res.status(400).json({
        message: "Error al crear la jurisdicción",
      });
    }
    return res.status(201).json({
      message: "Jurisdicción creada correctamente",
      nuevaJurisdiccion,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
const eliminarJurisdiccion = async (req, res) => {
  const { id } = req.params;
  //Primero verificar si la jurisdiccion existe
  const ifExist = await JurisdiccionesModel.obtenerJurisdiccion(id);
  if (!ifExist) {
    return res.status(404).json({
      message: "Jurisdiccion no encontrada",
    });
  }
  try {
    const deletedJurisdiccion = await JurisdiccionesModel.eliminarJurisdiccion(
      id
    );
    return res.status(200).json({
      message: "Jurisdiccion correctamente eliminada",
      Jurisdiccion_Eliminada: ifExist,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

export const JurisdiccionesControllers = {
  obtenerJurisdicciones,
  obtenerJurisdiccion,
  crearJurisdiccion,
  eliminarJurisdiccion,
};
