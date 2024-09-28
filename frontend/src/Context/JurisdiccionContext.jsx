import axios from "axios";
import React, { useState, useEffect, createContext, useContext } from "react";

const JurisdiccionContext = createContext();

export const JurisdiccionProvider = ({ children }) => {
  const [jurisdicciones, setJurisdicciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerJurisdicciones = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/jurisdicciones/`
        );
        const data = response.data.jurisdicciones;
        console.log(data)
        setJurisdicciones(data);
      } catch (error) {
        setError(error.message || "Hubo un error al cargar las jurisdicciones");
      } finally {
        setLoading(false);
      }
    };
    obtenerJurisdicciones();
  }, []);
  return (
    <JurisdiccionContext.Provider value={{ jurisdicciones, loading, error }}>
      {children}
    </JurisdiccionContext.Provider>
  );
};
export const useJurisdiccion = () => useContext(JurisdiccionContext);
