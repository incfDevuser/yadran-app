import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import axios from "axios";

const TrayectosContext = createContext();
const BaseUrl = import.meta.env.VITE_BASE_URL;

export const TrayectosProvider = ({ children }) => {
  const [trayectos, setTrayectos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const obtenerTrayectos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BaseUrl}/trayectos/`, {
        withCredentials: true,
      });
      setTrayectos(response.data.trayectos || []);
    } catch (error) {
      setError(error.message || "Hubo un error al cargar los trayectos");
      console.error("Error al obtener trayectos:", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const crearTrayecto = useCallback(async (nuevoTrayecto) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/trayectos/create`,
        nuevoTrayecto,
        { withCredentials: true }
      );
      if (response.status === 201) {
        setTrayectos((prevTrayectos) => [...prevTrayectos, response.data]);
      } else {
        throw new Error(response.data.message || "Error al crear el trayecto");
      }
    } catch (error) {
      console.error("Error al crear el trayecto:", error.message);
      throw error;
    }
  }, []);

  const eliminarTrayecto = useCallback(async (trayectoId) => {
    try {
      await axios.delete(`${BaseUrl}/trayectos/${trayectoId}`, {
        withCredentials: true,
      });
      setTrayectos((prevTrayectos) =>
        prevTrayectos.filter((trayecto) => trayecto.id !== trayectoId)
      );
    } catch (error) {
      console.error("Error al eliminar el trayecto:", error.message);
      throw error;
    }
  }, []);

  useEffect(() => {
    obtenerTrayectos();
  }, [obtenerTrayectos]);

  return (
    <TrayectosContext.Provider
      value={{
        trayectos,
        loading,
        error,
        obtenerTrayectos,
        crearTrayecto,
        eliminarTrayecto,
      }}
    >
      {children}
    </TrayectosContext.Provider>
  );
};

export const useTrayectos = () => useContext(TrayectosContext);
