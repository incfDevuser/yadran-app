import axios from "axios";
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from "react";

const ZonasContext = createContext();
const BaseUrl = import.meta.env.VITE_BASE_URL;

export const ZonasProvider = ({ children }) => {
  const [zonas, setZonas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const obtenerZonas = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BaseUrl}/zonas/`);
      setZonas(response.data.zonas || []);
    } catch (error) {
      setError(error.message || "Hubo un error al cargar las zonas.");
    } finally {
      setLoading(false);
    }
  };
  const crearZona = async (nuevaZona) => {
    setLoading(true);
    try {
      const response = await axios.post(`${BaseUrl}/zonas/create`, nuevaZona);
      if (response.status === 201) {
        const zonaCreada = response.data;
        setZonas((prevZonas) => [...prevZonas, zonaCreada]);
        return zonaCreada;
      } else {
        throw new Error(response.data.message || "Error al crear la zona.");
      }
    } catch (error) {
      setError(error.message || "Hubo un error al crear la zona.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar una zona existente
  const actualizarZona = async (id, datosActualizados) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${BaseUrl}/zonas/${id}`,
        datosActualizados
      );
      const zonaActualizada = response.data;
      setZonas((prevZonas) =>
        prevZonas.map((zona) => (zona.id === id ? zonaActualizada : zona))
      );
      return zonaActualizada;
    } catch (error) {
      setError(error.message || "Hubo un error al actualizar la zona.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Memoizar el valor del contexto
  const contextValue = useMemo(
    () => ({
      zonas,
      loading,
      error,
      obtenerZonas,
      crearZona,
      actualizarZona,
    }),
    [zonas, loading, error]
  );

  return (
    <ZonasContext.Provider value={contextValue}>
      {children}
    </ZonasContext.Provider>
  );
};

export const useZonas = () => useContext(ZonasContext);
