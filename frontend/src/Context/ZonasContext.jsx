import axios from "axios";
import React, { useState, useEffect, createContext, useContext } from "react";

const ZonasContext = createContext();

export const ZonasProvider = ({ children }) => {
  const [zonas, setZonas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerZonas = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/zonas/`
        );
        const data = response.data.zonas;
        console.log(data)
        setZonas(data);
      } catch (error) {
        setError(error.message || "Hubo un error al cargar las zonas");
      } finally {
        setLoading(false);
      }
    };
    obtenerZonas();
  }, []);
  return (
    <ZonasContext.Provider value={{ zonas, loading, error }}>
      {children}
    </ZonasContext.Provider>
  );
};
export const useZonas = () => useContext(ZonasContext);
