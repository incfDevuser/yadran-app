import axios from "axios";
import dotenv from "dotenv";
import pool from "../config/db.js";

dotenv.config();

const API_KEY = "b03daa3acd9dd7146f731ae3a8bcd871";

const obtenerVuelos = async () => {
  try {
    const response = await axios.get(
      `http://api.aviationstack.com/v1/flights`,
      {
        params: {
          access_key: API_KEY,
          arr_iata: "PMC",
          flight_status: "scheduled",
        },
      }
    );
    const vuelos = response.data.data;
    for (const vuelo of vuelos) {
      await insertarOActualizarVuelo(vuelo);
    }
    return vuelos;
  } catch (error) {
    console.error("Error al obtener vuelos:", error.message);
    throw new Error("No se pudieron obtener los vuelos desde la API.");
  }
};
const insertarOActualizarVuelo = async (vuelo) => {
  const query = `
    INSERT INTO vuelos (
      numero_vuelo, aerolinea, aeropuerto_salida, codigo_iata_salida, horario_salida,
      aeropuerto_llegada, codigo_iata_llegada, horario_llegada, duracion_estimada, estado_vuelo
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    ON CONFLICT (numero_vuelo) DO UPDATE 
    SET estado_vuelo = EXCLUDED.estado_vuelo,
        horario_salida = EXCLUDED.horario_salida,
        horario_llegada = EXCLUDED.horario_llegada;
  `;
  const values = [
    vuelo.flight.iata,
    vuelo.airline.name,
    vuelo.departure.airport,
    vuelo.departure.iata,
    vuelo.departure.scheduled,
    vuelo.arrival.airport,
    vuelo.arrival.iata,
    vuelo.arrival.scheduled,
    calcularDuracion(vuelo.departure.scheduled, vuelo.arrival.scheduled),
    vuelo.flight_status,
  ];

  try {
    await pool.query(query, values);
    console.log(
      `Vuelo ${vuelo.flight.iata} insertado/actualizado correctamente.`
    );
  } catch (error) {
    console.error("Error al insertar/actualizar el vuelo:", error.message);
  }
};
const calcularDuracion = (horaSalida, horaLlegada) => {
  const salida = new Date(horaSalida);
  const llegada = new Date(horaLlegada);
  const duracionMs = llegada - salida;
  return Math.floor(duracionMs / 60000);
};

export default obtenerVuelos;
