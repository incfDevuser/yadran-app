import axios from "axios";
import React, { useState, useEffect, createContext, useContext } from "react";

const AeropuertosContext = createContext();

export const AeropuertosProvider = ({ children }) => {
  const [aeropuertos, setAeropuertos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerAeropuertos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/aeropuertos/`
        );
        const data = response.data.aeropuertos;
        console.log(data);
        setAeropuertos(data);
      } catch (error) {
        setError(error.message || "Hubo un error al cargar las bases");
      } finally {
        setLoading(false);
      }
    };
    obtenerAeropuertos();
  }, []);
  const crearAeropuerto = async (nuevoAeropuerto) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/aeropuertos/create",
        nuevoAeropuerto
      );
      if (response.status === 201) {
        //ACTUALIZAR LA LISTA
        setAeropuertos([...aeropuertos, response.data]);
        return response.data;
      } else {
        console.error("Error al crear el aeropuerto", response.data);
        throw new Error(
          response.data.message || "Error al crear el aeropuerto"
        );
      }
    } catch (error) {
      console.error("Hubo un error al crear el aeropuerto", error.message);
      throw error;
    }
  };
  return (
    <AeropuertosContext.Provider value={{ aeropuertos, loading, error, crearAeropuerto }}>
      {children}
    </AeropuertosContext.Provider>
  );
};
export const useAeropuertos = () => useContext(AeropuertosContext);
