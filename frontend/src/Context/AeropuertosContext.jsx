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
        console.log(data)
        setAeropuertos(data);
      } catch (error) {
        setError(error.message || "Hubo un error al cargar las bases");
      } finally {
        setLoading(false);
      }
    };
    obtenerAeropuertos();
  }, []);
  return (
    <AeropuertosContext.Provider value={{ aeropuertos, loading, error }}>
      {children}
    </AeropuertosContext.Provider>
  );
};
export const useAeropuertos = () => useContext(AeropuertosContext);
