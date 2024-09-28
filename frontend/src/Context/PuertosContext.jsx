import axios from "axios";
import React, { useState, useEffect, createContext, useContext } from "react";

const PuertosContext = createContext();

export const PuertosProvider = ({ children }) => {
  const [puertos, setPuertos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerPuertos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/puertos/`
        );
        const data = response.data.puertos;
        console.log(data);
        setPuertos(data);
      } catch (error) {
        setError(error.message || "Hubo un error al cargar las bases");
      } finally {
        setLoading(false);
      }
    };
    obtenerPuertos();
  }, []);
  return (
    <PuertosContext.Provider value={{ puertos, loading, error }}>
      {children}
    </PuertosContext.Provider>
  );
};
export const usePuertos = () => useContext(PuertosContext);
