import axios from "axios";
import React, { useState, useEffect, createContext, useContext } from "react";

const ConcesionesContext = createContext();

export const ConcesionesProvider = ({ children }) => {
  const [concesiones, setConcesiones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerConcesiones = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/concesiones/`
        );
        const data = response.data.concesiones;
        console.log(data)
        setConcesiones(data);
      } catch (error) {
        setError(error.message || "Hubo un error al cargar las concesiones");
      } finally {
        setLoading(false);
      }
    };
    obtenerConcesiones();
  }, []);
  return (
    <ConcesionesContext.Provider value={{ concesiones, loading, error }}>
      {children}
    </ConcesionesContext.Provider>
  );
};
export const useConcesion = () => useContext(ConcesionesContext);
