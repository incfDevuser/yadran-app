import axios from "axios";
import React, { useState, useEffect, createContext, useContext } from "react";

const CentrosContext = createContext();
const BaseUrl = import.meta.env.VITE_BASE_URL;

export const CentrosProvider = ({ children }) => {
  const [centros, setCentros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Obtener Centros
  const obtenerCentros = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BaseUrl}/centros/`);
      const data = response.data.centros;
      setCentros(data);
    } catch (error) {
      setError(error.message || "Hubo un error al cargar los centros");
    } finally {
      setLoading(false);
    }
  };
  const crearCentro = async (nuevoCentro) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/centros/create`,
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
  const actualizarCentro = async (id, datosActualizados) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${BaseUrl}/centros/${id}`,
        datosActualizados
      );
      const centroActualizado = response.data;

      setCentros((prev) =>
        prev.map((c) => (c.id === id ? centroActualizado : c))
      );
      return centroActualizado;
    } catch (error) {
      console.error("Error al actualizar el centro:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CentrosContext.Provider
      value={{ centros, loading, error, obtenerCentros, crearCentro, actualizarCentro }}
    >
      {children}
    </CentrosContext.Provider>
  );
};
export const useCentros = () => useContext(CentrosContext);
