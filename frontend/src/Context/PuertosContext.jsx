import axios from "axios";
import React, { useState, useCallback, createContext, useContext } from "react";

const BaseUrl = import.meta.env.VITE_BASE_URL;
const PuertosContext = createContext();

export const PuertosProvider = ({ children }) => {
  const [puertos, setPuertos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const obtenerPuertos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BaseUrl}/puertos/`);
      const data = response.data.puertos;
      setPuertos(data);
    } catch (error) {
      setError(error.message || "Hubo un error al cargar los puertos");
    } finally {
      setLoading(false);
    }
  }, []); // Memoizar para evitar referencias cambiantes

  const crearPuerto = async (nuevoPuerto) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/puertos/create`,
        nuevoPuerto
      );
      if (response.status === 201) {
        setPuertos((prev) => [...prev, response.data]);
        return response.data;
      } else {
        throw new Error(response.data.message || "Error al crear el puerto");
      }
    } catch (error) {
      console.error("Hubo un error al crear el puerto:", error.message);
      throw error;
    }
  };

  return (
    <PuertosContext.Provider
      value={{ puertos, loading, error, obtenerPuertos, crearPuerto }}
    >
      {children}
    </PuertosContext.Provider>
  );
};

export const usePuertos = () => useContext(PuertosContext);