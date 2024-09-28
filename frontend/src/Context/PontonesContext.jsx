import axios from "axios";
import React, { useState, useEffect, createContext, useContext } from "react";

const PontonesContext = createContext();

export const PontonesProvider = ({ children }) => {
  const [pontones, setPontones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerPontones = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/pontones/`
        );
        const data = response.data.pontones;
        console.log(data)
        setPontones(data);
      } catch (error) {
        setError(error.message || "Hubo un error al cargar los pontones");
      } finally {
        setLoading(false);
      }
    };
    obtenerPontones();
  }, []);
  return (
    <PontonesContext.Provider value={{ pontones, loading, error }}>
      {children}
    </PontonesContext.Provider>
  );
};
export const usePontones = () => useContext(PontonesContext);
