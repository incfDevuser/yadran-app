import axios from "axios";
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from "react";

const ConcesionesContext = createContext();
const BaseUrl = import.meta.env.VITE_BASE_URL;

export const ConcesionesProvider = ({ children }) => {
  const [concesiones, setConcesiones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Obtener concesiones
  const obtenerConcesiones = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BaseUrl}/concesiones/`);
      setConcesiones(response.data.concesiones || []);
    } catch (error) {
      setError(error.message || "Hubo un error al cargar las concesiones.");
    } finally {
      setLoading(false);
    }
  };
  const crearConcesion = async (nuevaConcesion) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/concesiones/create`,
        nuevaConcesion
      );
      if (response.status === 201) {
        const concesionCreada = response.data;
        setConcesiones((prev) => [...prev, concesionCreada]);
        return concesionCreada;
      } else {
        throw new Error(
          response.data.message || "Error al crear la concesión."
        );
      }
    } catch (error) {
      setError(error.message || "Hubo un error al crear la concesión.");
      throw error;
    }
  };

  const actualizarConcesion = async (id, datosActualizados) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${BaseUrl}/concesiones/${id}`,
        datosActualizados
      );
      const concesionActualizada = response.data;
      setConcesiones((prev) =>
        prev.map((c) => (c.id === id ? concesionActualizada : c))
      );
      return concesionActualizada;
    } catch (error) {
      setError(error.message || "Hubo un error al actualizar la concesión.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const contextValue = useMemo(
    () => ({
      concesiones,
      loading,
      error,
      obtenerConcesiones,
      crearConcesion,
      actualizarConcesion,
    }),
    [concesiones, loading, error]
  );

  return (
    <ConcesionesContext.Provider value={contextValue}>
      {children}
    </ConcesionesContext.Provider>
  );
};

export const useConcesion = () => useContext(ConcesionesContext);
