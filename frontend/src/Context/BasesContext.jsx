import axios from "axios";
import React, { createContext, useContext, useMemo, useState } from "react";

const BasesContext = createContext();
const BaseUrl = import.meta.env.VITE_BASE_URL;

export const BasesProvider = ({ children }) => {
  const [bases, setBases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const obtenerBases = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BaseUrl}/bases/`);
      setBases(response.data.bases);
    } catch (error) {
      console.error("Hubo un error al cargar las bases:", error.message);
      throw new Error(error.message || "Error al cargar las bases");
    } finally {
      setLoading(false);
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

  const actualizarBase = async (id, datosActualizados) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${BaseUrl}/bases/${id}`,
        datosActualizados
      );
      if (response.status === 200) {
        setBases((prevBases) =>
          prevBases.map((base) =>
            base.id === id ? { ...base, ...datosActualizados } : base
          )
        );
      }
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el centro:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const contextValue = useMemo(
    () => ({ bases, obtenerBases, crearBase, actualizarBase, loading, error }),
    [bases, loading, error]
  );

  return (
    <BasesContext.Provider value={contextValue}>
      {children}
    </BasesContext.Provider>
  );
};

export const useBases = () => useContext(BasesContext);
