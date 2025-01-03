import axios from "axios";
import React, { createContext, useContext, useMemo, useState } from "react";

const BasesContext = createContext();
const BaseUrl = import.meta.env.VITE_BASE_URL;

export const BasesProvider = ({ children }) => {
  const [bases, setBases] = useState([]);
  const obtenerBases = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/bases/`);
      return response.data.bases;
    } catch (error) {
      console.error("Hubo un error al cargar las bases:", error.message);
      throw new Error(error.message || "Error al cargar las bases");
    }
  };
  const crearBase = async (nuevaBase) => {
    try {
      const response = await axios.post(`${BaseUrl}/bases/create`, nuevaBase);
      if (response.status === 201) {
        return response.data;
      } else {
        throw new Error(response.data.message || "Error al crear la base");
      }
    } catch (error) {
      console.error("Hubo un error al crear la base:", error.message);
      throw error;
    }
  };

  // Contexto memoizado
  const contextValue = useMemo(() => ({ obtenerBases, bases, crearBase }), []);

  return (
    <BasesContext.Provider value={contextValue}>
      {children}
    </BasesContext.Provider>
  );
};

export const useBases = () => useContext(BasesContext);
