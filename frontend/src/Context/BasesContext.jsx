import axios from "axios";
import React, { useState, useEffect, createContext, useContext } from "react";

const BasesContext = createContext();

export const BasesProvider = ({ children }) => {
  const [bases, setBases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerBases = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/bases/`);
        const data = response.data.bases;
        console.log(data);
        setBases(data);
      } catch (error) {
        setError(error.message || "Hubo un error al cargar las bases");
      } finally {
        setLoading(false);
      }
    };
    obtenerBases();
  }, []);
  const crearBase = async (nuevaBase) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/bases/create",
        nuevaBase
      );
      if (response.status === 201) {
        //ACTUALIZAR LA LISTA
        setBases([...bases, response.data]);
        return response.data;
      } else {
        console.error("Error al crear la base", response.data);
        throw new Error(response.data.message || "Error al crear la base");
      }
    } catch (error) {
      console.error("Hubo un error al crear la base", error.message);
      throw error;
    }
  };
  return (
    <BasesContext.Provider value={{ bases, loading, error, crearBase }}>
      {children}
    </BasesContext.Provider>
  );
};
export const useBases = () => useContext(BasesContext);
