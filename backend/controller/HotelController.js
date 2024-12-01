import { HotelModel } from "../models/HotelModel.js";

const obtenerHoteles = async (req, res) => {
  try {
    const hoteles = await HotelModel.obtenerHoteles();
    return res.status(200).json({
      message: "Lista de hoteles",
      hoteles,
    });
  } catch (error) {
    console.error("Error al obtener los hoteles:", error.message);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
const crearHotel = async (req, res) => {
  const { nombre, ciudad, direccion, telefono, capacidad } = req.body;
  if (!nombre || !ciudad || !direccion || !telefono || !capacidad) {
    return res.status(400).json({
      message: "Todos los campos son obligatorios",
    });
  }
  try {
    const nuevoHotel = await HotelModel.insertarHotel({
      nombre,
      ciudad,
      direccion,
      telefono,
      capacidad,
    });
    return res.status(201).json({
      message: "Hotel creado exitosamente",
      hotel: nuevoHotel,
    });
  } catch (error) {
    console.error("Error al crear el hotel:", error.message);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
const asignarHotel = async (req, res) => {
  const { hotel_id, ruta_id } = req.body;
  try {
    const hotel = await HotelModel.obtenerHotelPorId(hotel_id);
    if (!hotel) {
      return res.status(404).json({
        message: "Hotel no encontrado",
      });
    }
    const trayecto = await HotelModel.insertarHotelComoTrayecto(hotel, ruta_id);
    return res.status(201).json({
      message: "Hotel agregado al trayecto",
      trayecto,
    });
  } catch (error) {
    console.error("Error al asignar hotel al trayecto:", error.message);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
const obtenerHotelesConUsuariosYTrabajadores = async (req, res) => {
  try {
    const hoteles = await HotelModel.obtenerHotelesConUsuariosYTrabajadores();
    return res.status(200).json({
      message: "Lista de hoteles con usuarios y trabajadores",
      hoteles,
    });
  } catch (error) {
    console.error("Error al obtener hoteles con usuarios y trabajadores:", error.message);
    return res.status(500).json({
      message: "Error al obtener hoteles con usuarios y trabajadores",
    });
  }
};

export const HotelController = {
  obtenerHoteles,
  asignarHotel,
  crearHotel,
  obtenerHotelesConUsuariosYTrabajadores
};
