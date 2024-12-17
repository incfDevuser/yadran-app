import axios from "axios";
import React, { useState, useEffect, createContext, useContext } from "react";

const ConcesionesContext = createContext();

export const ConcesionesProvider = ({ children }) => {
  const [concesiones, setConcesiones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerConcesiones = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/concesiones/`
        );
        const data = response.data.concesiones;
        console.log(data);
        setConcesiones(data);
      } catch (error) {
        setError(error.message || "Hubo un error al cargar las concesiones");
      } finally {
        setLoading(false);
      }
    };
    obtenerConcesiones();
  }, []);
  const crearConcesion = async (nuevaConcesion) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/concesiones/create",
        nuevaConcesion
      );
      if (response.status === 201) {
        setConcesiones([...concesiones, response.data]);
        return response.data;
      } else {
        console.error("Error al crear la concesion", response.data);
        throw new Error(response.data.message || "Error al crear la concesion");
      }
    } catch (error) {
      console.error("Hubo un error al crear la concesion", error.message);
      throw error;
    }
  };
  const actualizarConcesion = async (id, datosActualizados) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/concesiones/${id}`,
        datosActualizados
      );
      const concesionActualizada = response.data;

      setConcesiones((prev) =>
        prev.map((c) => (c.id === id ? concesionActualizada : c))
      );
      return concesionActualizada;
    } catch (error) {
      console.error("Error al actualizar la concesión:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConcesionesContext.Provider
      value={{
        concesiones,
        loading,
        error,
        crearConcesion,
        actualizarConcesion,
      }}
    >
      {children}
    </ConcesionesContext.Provider>
  );
};
export const useConcesion = () => useContext(ConcesionesContext);
