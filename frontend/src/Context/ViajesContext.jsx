import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const ViajesContext = createContext();

export const ViajesProvider = ({ children }) => {
  const [viajes, setViajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const obtenerViajes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/viajes/`, {
          withCredentials: true,
        });
        const data = response.data.viajes;
        console.log(data)
        setViajes(data);
      } catch (error) {
        setError(error.message || "Hubo un error al cargar los viajes");
      } finally {
        setLoading(false);
      }
    };
    obtenerViajes();
  }, []);
  const solicitarViaje = async (nuevaSolicitud) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/viajes/solicitar`,
        nuevaSolicitud
      );
      if (response.status === 201) {
        //Actualizar la lsita de viajes
        setViajes([...viajes, response.data]);
        return response.data;
      } else {
        console.error("Error al crear la solicitud de viaje", response.data);
        throw new Error(
          response.data.message || "Error al crear la solicitud de viaje"
        );
      }
    } catch (error) {
      console.error("Error al crear la solicitud de viaje:", error.message);
      throw error;
    }
  };
  //Actualizar estado del viaje
  const actualizarEstado = {};

  return (
    <ViajesContext.Provider value={{ viajes, loading, error, solicitarViaje }}>
      {children}
    </ViajesContext.Provider>
  );
};
export const useViajes = () => useContext(ViajesContext);
