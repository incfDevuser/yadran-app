import axios from "axios";
import React, { useState, useEffect, createContext, useContext } from "react";

const TrayectosContext = createContext();

export const TrayectosProvider = ({ children }) => {
  const [trayectos, setTrayectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerTrayectos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/trayectos/`,
          {
            withCredentials: true,
          }
        );
        const data = response.data.trayectos;
        setTrayectos(data);
      } catch (error) {
        setError(error.message || "Hubo un error al cargar los trayectos");
      } finally {
        setLoading(false);
      }
    };
    obtenerTrayectos();
  }, []);
  //Crear un trayecto
  const crearTrayecto = async (nuevoTrayecto) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/trayectos/create`,
        nuevoTrayecto
      );
      if (response.status === 201) {
        //Actualizar la lista de rutas
        setTrayectos([...trayectos, response.data]);
      } else {
        console.error("Error al crear el trayecto", response.data);
        throw new Error(response.data.message || "Error al crear el trayecto");
      }
    } catch (error) {
      console.error("Error al crear el trayecto:", error.message);
      throw error;
    }
  };
  //Eliminar trayecto
  const eliminarTrayecto = async (trayectoId) => {
    try {
      await axios.delete(`http://localhost:5000/api/trayectos/${trayectoId}`);
      setTrayectos((prevTrayectos) =>
        prevTrayectos.filter((trayecto) => trayecto.id !== trayectoId)
      );
    } catch (error) {
      console.error("Error al eliminar el trayecto:", error.message);
      throw error;
    }
  };
  //Bloque del return
  return (
    <TrayectosContext.Provider
      value={{
        trayectos,
        loading,
        error,
        crearTrayecto,
        eliminarTrayecto,
      }}
    >
      {children}
    </TrayectosContext.Provider>
  );
};

export const useTrayectos = () => useContext(TrayectosContext);
