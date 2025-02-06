import axios from "axios";
import React, { useState, useCallback, createContext, useContext } from "react";

const BaseUrl = import.meta.env.VITE_BASE_URL;
const AeropuertosContext = createContext();

export const AeropuertosProvider = ({ children }) => {
  const [aeropuertos, setAeropuertos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const obtenerAeropuertos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BaseUrl}/aeropuertos/`);
      const data = response.data.aeropuertos;
      setAeropuertos(data);
    } catch (error) {
      setError(error.message || "Hubo un error al cargar los aeropuertos");
    } finally {
      setLoading(false);
    }
  }, []);

  const crearAeropuerto = async (nuevoAeropuerto) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/aeropuertos/create`,
        nuevoAeropuerto
      );
      if (response.status === 201) {
        setAeropuertos((prev) => [...prev, response.data]);
        return response.data;
      } else {
        throw new Error(
          response.data.message || "Error al crear el aeropuerto"
        );
      }
    } catch (error) {
      console.error("Hubo un error al crear el aeropuerto:", error.message);
      throw error;
    }
  };

  const actualizarAeropuerto = async (id, datosActualizados) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${BaseUrl}/aeropuertos/${id}`,
        datosActualizados
      );
      if (response.status === 200) {
        setAeropuertos((prev) =>
          prev.map((aero) =>
            aero.id === id ? { ...aero, ...datosActualizados } : aero
          )
        );
      }
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el aeropuerto:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AeropuertosContext.Provider
      value={{
        aeropuertos,
        loading,
        error,
        obtenerAeropuertos,
        crearAeropuerto,
        actualizarAeropuerto,
      }}
    >
      {children}
    </AeropuertosContext.Provider>
  );
};

export const useAeropuertos = () => useContext(AeropuertosContext);
