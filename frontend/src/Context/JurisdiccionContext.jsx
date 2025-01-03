import axios from "axios";
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from "react";

const JurisdiccionContext = createContext();
const BaseUrl = import.meta.env.VITE_BASE_URL;

export const JurisdiccionProvider = ({ children }) => {
  const [jurisdicciones, setJurisdicciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleError = (error, mensajeDefault) => {
    console.error(error);
    setError(error.message || mensajeDefault);
  };
  const obtenerJurisdicciones = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BaseUrl}/jurisdicciones/`, {
        withCredentials: true,
      });
      console.log(response.data);
      setJurisdicciones(response.data.jurisdicciones || []);
    } catch (error) {
      handleError(error, "Hubo un error al cargar las jurisdicciones.");
    } finally {
      setLoading(false);
    }
  };
  const crearJurisdiccion = async (nuevaJurisdiccion) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BaseUrl}/jurisdicciones/create`,
        nuevaJurisdiccion,
        { withCredentials: true }
      );

      if (response.status === 201) {
        const jurisdiccionCreada = response.data;

        // Actualiza el estado local inmediatamente
        setJurisdicciones((prevJurisdicciones) => {
          const nuevasJurisdicciones = [
            ...prevJurisdicciones,
            jurisdiccionCreada,
          ];
          console.log("Estado actualizado:", nuevasJurisdicciones);
          return nuevasJurisdicciones;
        });

        return jurisdiccionCreada;
      } else {
        throw new Error(
          response.data.message || "Error al crear la jurisdicción."
        );
      }
    } catch (error) {
      setError(error.message || "Hubo un error al crear la jurisdicción.");
      throw error; 
    } finally {
      setLoading(false);
    }
  };
  const actualizarJurisdiccion = async (id, datosActualizados) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${BaseUrl}/jurisdicciones/${id}`,
        datosActualizados,
        { withCredentials: true }
      );
      setJurisdicciones((prev) =>
        prev.map((j) => (j.id === id ? response.data : j))
      );
      return response.data;
    } catch (error) {
      handleError(error, "Hubo un error al actualizar la jurisdicción.");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const contextValue = useMemo(
    () => ({
      jurisdicciones,
      loading,
      error,
      obtenerJurisdicciones,
      crearJurisdiccion,
      actualizarJurisdiccion,
    }),
    [jurisdicciones, loading, error]
  );

  return (
    <JurisdiccionContext.Provider value={contextValue}>
      {children}
    </JurisdiccionContext.Provider>
  );
};

export const useJurisdiccion = () => useContext(JurisdiccionContext);
