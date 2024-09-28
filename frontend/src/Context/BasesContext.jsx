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
        const response = await axios.get(
          `http://localhost:5000/api/bases/`
        );
        const data = response.data.bases;
        console.log(data)
        setBases(data);
      } catch (error) {
        setError(error.message || "Hubo un error al cargar las bases");
      } finally {
        setLoading(false);
      }
    };
    obtenerBases();
  }, []);
  return (
    <BasesContext.Provider value={{ bases, loading, error }}>
      {children}
    </BasesContext.Provider>
  );
};
export const useBases = () => useContext(BasesContext);
