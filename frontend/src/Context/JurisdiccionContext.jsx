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
          `http://localhost:5000/api/jurisdicciones/`,
          { withCredentials: true }
        );
        const data = response.data.jurisdicciones;
        console.log(data);
        setJurisdicciones(data);
      } catch (error) {
        setError(error.message || "Hubo un error al cargar las jurisdicciones");
      } finally {
        setLoading(false);
      }
    };
    obtenerJurisdicciones();
  }, []);
  const crearJurisdiccion = async (nuevaJurisdiccion) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/jurisdicciones/create`,
        nuevaJurisdiccion
      );
      if (response.status === 201) {
        //Actualizar la lista de jurisdicciones
        setJurisdicciones([...jurisdicciones, response.data]);
      } else {
        console.error("Error al crear la jurisdiccion", response.data);
        throw new Error(
          response.data.message || "Error al crear la jurisdiccion"
        );
      }
    } catch (error) {
      console.error("Hubo un error al crear el vehiculo:", error.message);
      throw error;
    }
  };
  const actualizarJurisdiccion = async (id, datosActualizados) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/jurisdicciones/${id}`,
        datosActualizados
      );
      const jurisdiccionActualizada = response.data;

      setJurisdicciones((prev) =>
        prev.map((j) => (j.id === id ? jurisdiccionActualizada : j))
      );
      return jurisdiccionActualizada;
    } catch (error) {
      console.error("Error al actualizar la jurisdicción:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <JurisdiccionContext.Provider
      value={{
        jurisdicciones,
        loading,
        error,
        crearJurisdiccion,
        actualizarJurisdiccion,
      }}
    >
      {children}
    </JurisdiccionContext.Provider>
  );
};
export const useJurisdiccion = () => useContext(JurisdiccionContext);
