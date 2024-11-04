import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.WEATHER_API_KEY;

const obtenerClimaPorUbicacion = async (latitud, longitud) => {
  try {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&units=metric&lang=es&appid=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el clima:", error);
    throw new Error("Error con la operación obtenerClimaPorUbicacion");
  }
};

export default obtenerClimaPorUbicacion;
