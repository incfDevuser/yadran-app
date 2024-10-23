import { VuelosModel } from "../models/VuelosModel.js";

const vuelos = async (req, res) => {
  try {
    const vuelos = await VuelosModel.obtenerVuelos();
    return res.status(200).json({
      message: "Lista de Vuelos",
      vuelos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
const asignarVuelo = async (req, res) => {
  const { numero_vuelo, ruta_id } = req.body;
  try {
    //Primero obtener el vuelo para ver si existe
    const vuelo = await VuelosModel.obtenerVueloPorNumero(numero_vuelo);
    if (!vuelo) {
      return res.status(404).json({
        message: "Vuelo no encontrado",
      });
    }
    //Insertar el vuelo como trayecto si es que existe
    const trayecto = await VuelosModel.insertarVueloComoTrayecto(
      vuelo,
      ruta_id
    );
    return res.status(201).json({
      message: "Vuelo agregado al trayecto",
      trayecto,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
export const VuelosController = {
  vuelos,
  asignarVuelo
};
