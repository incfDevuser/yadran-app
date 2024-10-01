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
        const response = await axios.get(`http://localhost:5000/api/puertos/`);
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
  const crearPuerto = async (nuevoPuerto) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/puertos/create",
        nuevoPuerto
      );
      if (response.status === 201) {
        //ACTUALIZAR LA LISTA DE PUERTOS
        setPuertos([...puertos, response.data]);
        return response.data;
      } else {
        console.error("Error al crear el puerto", response.data);
        throw new Error(response.data.message || "Error al crear el puerto");
      }
    } catch (error) {
      console.error("Hubo un error al crear el puerto", error.message);
      throw error;
    }
  };
  return (
    <PuertosContext.Provider value={{ puertos, loading, error, crearPuerto }}>
      {children}
    </PuertosContext.Provider>
  );
};
export const usePuertos = () => useContext(PuertosContext);
