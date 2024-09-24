import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const RutasContext = createContext();

export const RutasProvider = ({ children }) => {
  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Renderizar las rutas, cuando se carga el componente
  useEffect(() => {
    const obtenerRutas = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/rutas/`, {
          withCredentials: true,
        });
        const data = response.data.rutas;
        console.log(data);
        setRutas(data);
      } catch (error) {
        setError(error.message || "Hubo un error al cargar las rutas");
      } finally {
        setLoading(false);
      }
    };
    obtenerRutas();
  }, []);

  //Crear una ruta
  const crearRuta = async (nuevaRuta) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/rutas/create`,
        nuevaRuta
      );
      if (response.status === 201) {
        console.log("Rutas creado con exito:", response.data);
        //Actualizar la lista de rutas
        setRutas([...rutas, response.data]);
      } else {
        console.error("Error al crear la ruta", response.data);
        throw new Error(response.data.message || "Error al crear la ruta");
      }
    } catch (error) {
      console.error("Error al agregar la ruta:", error.message);
      throw error;
    }
  };
  const eliminarRuta = async (rutaId) => {
    try {
      await axios.delete(`http://localhost:5000/api/rutas/${rutaId}`);
      setRutas((prevRutas) => prevRutas.filter((ruta) => ruta.id !== rutaId));
    } catch (error) {
      console.error("Error al eliminar la ruta:", error.message);
      throw error;
    }
  };
  //Bloque return
  return (
    <RutasContext.Provider
      value={{ rutas, loading, error, crearRuta, eliminarRuta}}
    >
      {children}
    </RutasContext.Provider>
  );
};

export const useRutas = () => useContext(RutasContext);
