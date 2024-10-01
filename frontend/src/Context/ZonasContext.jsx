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
        const response = await axios.get(`http://localhost:5000/api/zonas/`);
        const data = response.data.zonas;
        console.log(data);
        setZonas(data);
      } catch (error) {
        setError(error.message || "Hubo un error al cargar las zonas");
      } finally {
        setLoading(false);
      }
    };
    obtenerZonas();
  }, []);
  const crearZona = async (nuevaZona) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/zonas/create",
        nuevaZona
      );
      if (response.status === 201) {
        //Actualizar la lista de zonas
        setZonas([...zonas, response.data]);
        return response.data;
      } else {
        console.error("Error al crear la zona", response.data);
        throw new Error(response.data.message || "Error al crear la zona");
      }
    } catch (error) {
      console.error("Hubo un error al crear la zona", error.message);
      throw error;
    }
  };
  return (
    <ZonasContext.Provider value={{ zonas, loading, error, crearZona }}>
      {children}
    </ZonasContext.Provider>
  );
};
export const useZonas = () => useContext(ZonasContext);
