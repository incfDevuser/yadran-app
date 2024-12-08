import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const ViajesContext = createContext();

export const ViajesProvider = ({ children }) => {
  const [viajes, setViajes] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [detalleViaje, setDetalleViaje] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerViajes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/viajes/`, {
          withCredentials: true,
        });
        const data = response.data.viajes;
        console.log(data);
        setViajes(data);
      } catch (error) {
        setError(error.message || "Hubo un error al cargar los viajes");
      } finally {
        setLoading(false);
      }
    };

    if (viajes.length === 0) {
      obtenerViajes();
    }
  }, [viajes.length]);
  const crearViaje = async (nuevoViaje) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/viajes/crear`,
        nuevoViaje,
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        setViajes([...viajes, response.data]);
        return response.data;
      } else {
        console.error("Error al crear el viaje", response.data);
        throw new Error(response.data.message || "Error al crear el viaje");
      }
    } catch (error) {
      console.error("Error al crear el viaje:", error.message);
      throw error;
    }
  };
  const solicitarViaje = async (nuevaSolicitud) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/viajes/solicitar`,
        nuevaSolicitud,
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        setSolicitudes([...solicitudes, response.data]);
        return response.data;
      } else {
        console.error("Error al crear la solicitud de viaje", response.data);
        throw new Error(
          response.data.message || "Error al crear la solicitud de viaje"
        );
      }
    } catch (error) {
      console.error("Error al crear la solicitud de viaje:", error.message);
      throw error;
    }
  };
  const obtenerDetalleViaje = async (idViaje) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/seguimiento/viajes/${idViaje}/detalle`,
        {
          withCredentials: true,
        }
      );
      setDetalleViaje(response.data.detalleViaje);
      return response.data.detalleViaje;
    } catch (error) {
      console.error("Error al obtener el detalle del viaje:", error.message);
      setError(error.message || "Hubo un error al cargar el detalle del viaje");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const limpiarEntidades = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/limpieza/limpiarUsuarios"
      );
    } catch (error) {
      console.error("Error al limpiar las entidades:", error);
    }
  };
  return (
    <ViajesContext.Provider
      value={{
        viajes,
        solicitudes,
        loading,
        error,
        detalleViaje,
        obtenerDetalleViaje,
        solicitarViaje,
        crearViaje,
        limpiarEntidades
      }}
    >
      {children}
    </ViajesContext.Provider>
  );
};

export const useViajes = () => useContext(ViajesContext);
