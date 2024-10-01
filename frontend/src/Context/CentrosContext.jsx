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
        const response = await axios.get(`http://localhost:5000/api/centros/`);
        const data = response.data.centros;
        console.log(data);
        setCentros(data);
      } catch (error) {
        setError(error.message || "Hubo un error al cargar los centros");
      } finally {
        setLoading(false);
      }
    };
    obtenerCentros();
  }, []);
  const crearCentro = async (nuevoCentro) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/centros/create`,
        nuevoCentro
      );
      if (response.status === 201) {
        //Actualizar la lista
        setCentros([...centros, response.data]);
        return response.data;
      } else {
        console.error("Error al crear el centro", response.data);
        throw new Error(response.data.message || "Error al crear el centro");
      }
    } catch (error) {
      console.error("Hubo un error al crear el centro", error.message);
      throw error;
    }
  };
  return (
    <CentrosContext.Provider value={{ centros, loading, error, crearCentro }}>
      {children}
    </CentrosContext.Provider>
  );
};
export const useCentros = () => useContext(CentrosContext);
