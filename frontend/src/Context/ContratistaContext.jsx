import axios from "axios";
import React, { createContext, useCallback, useState, useContext } from "react";

const ContratistaContext = createContext();
const BaseUrl = import.meta.env.VITE_BASE_URL;
export const ContratistaProvider = ({ children }) => {
  const [trabajadores, setTrabajadores] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [solicitudesIntercentro, setSolicitudesIntercentro] = useState([]);

  // Obtener trabajadores (memoizado)
  const obtenerTrabajadores = useCallback(async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}/contratista/misTrabajadores`,
        { withCredentials: true }
      );
      setTrabajadores(response.data.trabajadores);
    } catch (error) {
      console.error("Error al obtener trabajadores:", error.message);
    }
  }, []);
  const obtenerSolicitudes = useCallback(async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}/contratista/solicitudes-trabajadores`,
        { withCredentials: true }
      );
      setSolicitudes(response.data.solicitudes);
    } catch (error) {
      console.error("Error al obtener las solicitudes de trabajadores:", error);
    }
  }, []);
  const agregarTrabajadores = useCallback(async (nuevoTrabajador) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/contratista/trabajadores`,
        nuevoTrabajador,
        { withCredentials: true }
      );
      if (response.status === 201) {
        setTrabajadores((prev) => [...prev, response.data.trabajador]); 
        return response.data.trabajador;
      }
    } catch (error) {
      console.error("Error al agregar trabajador:", error.message);
      throw error;
    }
  }, []);

  // Obtener solicitudes intercentro (memoizado)
  const obtenerSolicitudesIntercentro = useCallback(async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}/contratista/solicitudes-trabajadores/intercentro`,
        { withCredentials: true }
      );
      setSolicitudesIntercentro(response.data.solicitudes);
    } catch (error) {
      console.error("Error al obtener solicitudes intercentro:", error.message);
    }
  }, []);

  // Cancelar solicitud viaje normal
  const cancelarSolicitudTrabajador = useCallback(async (solicitudId) => {
    try {
      const response = await axios.delete(
        `${BaseUrl}/viajes/cancelar-solicitud/${solicitudId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error al cancelar solicitud de trabajadores:",
        error.message
      );
    }
  }, []);

  // Agendar para viajes normales
  const agendarNormal = useCallback(async (solicitud) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/viajes/solicitar-trabajadores`,
        solicitud,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error al agendar viaje normal:", error.message);
    }
  }, []);

  // Cancelar solicitud intercentro
  const cancelarSolicitudIntercentro = useCallback(async (solicitudId) => {
    try {
      const response = await axios.delete(
        `${BaseUrl}/intercentro/cancelarSolicitud/trabajador/${solicitudId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error al cancelar solicitud de viaje normal:",
        error.message
      );
    }
  }, []);

  return (
    <ContratistaContext.Provider
      value={{
        trabajadores,
        solicitudes,
        solicitudesIntercentro,
        obtenerTrabajadores,
        obtenerSolicitudes,
        agregarTrabajadores,
        obtenerSolicitudesIntercentro,
        cancelarSolicitudTrabajador,
        agendarNormal,
        cancelarSolicitudIntercentro,
      }}
    >
      {children}
    </ContratistaContext.Provider>
  );
};

export const useContratista = () => {
  return useContext(ContratistaContext);
};
