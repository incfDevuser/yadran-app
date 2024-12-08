import { CentrosModel } from "../models/CentrosModel.js";
import obtenerClimaPorUbicacion from "../Services/ClimaService.js";

const obtenerCentros = async (req, res) => {
  try {
    // Obtiene todos los centros desde la base de datos
    const centros = await CentrosModel.obtenerCentros();
    
    const centrosConClima = await Promise.all(
      centros.map(async (centro) => {
        if (centro.latitud && centro.longitud) {
          try {
            const clima = await obtenerClimaPorUbicacion(centro.latitud, centro.longitud);
            return { ...centro, clima };
          } catch (error) {
            console.error(`Error obteniendo el clima para el centro ${centro.nombre_centro}`, error);
            return { ...centro, clima: null };
          }
        } else {
          return { ...centro, clima: null };
        }
      })
    );

    return res.status(200).json({
      message: "Lista de centros con clima",
      centros: centrosConClima,
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
    estructura,
    ponton_id,
    ruta_id,
    latitud,
    longitud,
  } = req.body;
  //Instanciar un centro
  const centro = {
    nombre_centro,
    fecha_apertura_productiva,
    fecha_cierre_productivo,
    jefe_centro,
    etapa_ciclo_cultivo,
    estructura,
    ponton_id,
    ruta_id,
    latitud,
    longitud,
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
