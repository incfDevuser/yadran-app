import React, { createContext, useContext, useState } from "react";
import axios from "axios";

// Crear el contexto
const IntercentrosContext = createContext();

// Proveedor del contexto
export const IntercentrosProvider = ({ children }) => {
  const [lanchas, setLanchas] = useState([]);
  const [rutasIntercentro, setRutasIntercentro] = useState([]);
  const [solicitudesIntercentro, setSolicitudesIntercentro] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Función para obtener las lanchas
  const obtenerLanchas = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/intercentro/lanchas",
        {
          withCredentials: true,
        }
      );
      setLanchas(response.data.lanchas);
    } catch (err) {
      setError(err.message || "Error al obtener las lanchas");
    } finally {
      setLoading(false);
    }
  };

  //Función para crear una lancha
  const crearLancha = async (nuevaLancha) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/intercentro/crearLancha",
        nuevaLancha,
        { withCredentials: true }
      );
      setLanchas([...lanchas, response.data]);
      return response.data;
    } catch (err) {
      throw new Error(err.message || "Error al crear la lancha");
    }
  };

  //Función para obtener las rutas de intercentros
  const obtenerRutasIntercentro = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/intercentro/movimientos",
        {
          withCredentials: true,
        }
      );
      setRutasIntercentro(response.data.rutas);
    } catch (err) {
      setError(err.message || "Error al obtener las rutas intercentro");
    } finally {
      setLoading(false);
    }
  };

  // Función para crear una ruta de intercentros
  const crearRutaIntercentro = async (nuevaRuta) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/intercentro/crearMovimiento",
        nuevaRuta,
        { withCredentials: true }
      );
      setRutasIntercentro([...rutasIntercentro, response.data]);
      return response.data;
    } catch (err) {
      throw new Error(err.message || "Error al crear la ruta de intercentro");
    }
  };

  //Función para agendar una ruta (usuarios)
  const agendarRutaIntercentro = async (nuevaSolicitud) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/intercentro/solicitar",
        nuevaSolicitud,
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      throw new Error(err.message || "Error al agendar la ruta de intercentro");
    }
  };

  //Función para obtener solicitudes de intercentros
  const obtenerSolicitudesIntercentro = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/intercentro/solicitudes",
        { withCredentials: true }
      );
      setSolicitudesIntercentro(response.data.solicitudes);
    } catch (err) {
      setError(
        err.message || "Error al obtener las solicitudes de intercentro"
      );
    } finally {
      setLoading(false);
    }
  };

  //Función para aprobar una solicitud
  const aprobarSolicitudIntercentro = async (solicitudId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/intercentro/solicitudes/${solicitudId}/aprobar`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      throw new Error(
        err.message || "Error al aprobar la solicitud de intercentro"
      );
    }
  };

  //Función para rechazar una solicitud
  const rechazarSolicitudIntercentro = async (solicitudId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/intercentro/solicitudes/${solicitudId}/rechazar`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      throw new Error(
        err.message || "Error al rechazar la solicitud de intercentro"
      );
    }
  };

  //Función para cancelar una solicitud (usuarios)
  const cancelarSolicitudIntercentro = async (solicitudId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/intercentro/cancelarSolicitud/${solicitudId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      throw new Error(
        err.message || "Error al cancelar la solicitud de intercentro"
      );
    }
  };

  return (
    <IntercentrosContext.Provider
      value={{
        lanchas,
        rutasIntercentro,
        solicitudesIntercentro,
        loading,
        error,
        obtenerLanchas,
        crearLancha,
        obtenerRutasIntercentro,
        crearRutaIntercentro,
        agendarRutaIntercentro,
        obtenerSolicitudesIntercentro,
        aprobarSolicitudIntercentro,
        rechazarSolicitudIntercentro,
        cancelarSolicitudIntercentro,
      }}
    >
      {children}
    </IntercentrosContext.Provider>
  );
};

// Hook para usar el contexto
export const useIntercentros = () => {
  return useContext(IntercentrosContext);
};
