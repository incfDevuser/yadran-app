import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import axios from "axios";

const RutasContext = createContext();
const BaseUrl = import.meta.env.VITE_BASE_URL;

export const RutasProvider = ({ children }) => {
  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const obtenerRutas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BaseUrl}/rutas/`, {
        withCredentials: true,
      });
      setRutas(response.data.rutas || []);
    } catch (error) {
      setError(error.message || "Hubo un error al cargar las rutas");
      console.error("Error al obtener rutas:", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const crearRuta = useCallback(async (nuevaRuta) => {
    try {
      const response = await axios.post(`${BaseUrl}/rutas/create`, nuevaRuta, {
        withCredentials: true,
      });
      if (response.status === 201) {
        setRutas((prevRutas) => [...prevRutas, response.data]);
      } else {
        throw new Error(response.data.message || "Error al crear la ruta");
      }
    } catch (error) {
      console.error("Error al crear la ruta:", error.message);
      throw error;
    }
  }, []);

  const eliminarRuta = useCallback(async (rutaId) => {
    try {
      await axios.delete(`${BaseUrl}/rutas/${rutaId}`, {
        withCredentials: true,
      });
      setRutas((prevRutas) => prevRutas.filter((ruta) => ruta.id !== rutaId));
    } catch (error) {
      console.error("Error al eliminar la ruta:", error.message);
      throw error;
    }
  }, []);

  useEffect(() => {
    obtenerRutas();
  }, [obtenerRutas]);

  return (
    <RutasContext.Provider
      value={{
        rutas,
        loading,
        error,
        obtenerRutas,
        crearRuta,
        eliminarRuta,
      }}
    >
      {children}
    </RutasContext.Provider>
  );
};

export const useRutas = () => useContext(RutasContext);
