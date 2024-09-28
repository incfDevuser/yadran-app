import axios from "axios";
import React, { useState, useEffect, createContext, useContext } from "react";

const CentrosContext = createContext();

export const CentrosProvider = ({ children }) => {
  const [centros, setCentros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerCentros = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/centros/`
        );
        const data = response.data.centros;
        console.log(data)
        setCentros(data);
      } catch (error) {
        setError(error.message || "Hubo un error al cargar los centros");
      } finally {
        setLoading(false);
      }
    };
    obtenerCentros();
  }, []);
  return (
    <CentrosContext.Provider value={{ centros, loading, error }}>
      {children}
    </CentrosContext.Provider>
  );
};
export const useCentros = () => useContext(CentrosContext);
