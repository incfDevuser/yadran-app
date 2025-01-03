import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Crear el contexto
const IntercentrosContext = createContext();
const BaseUrl = import.meta.env.VITE_BASE_URL;
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
      const response = await axios.get(`${BaseUrl}/intercentro/lanchas`, {
        withCredentials: true,
      });
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
        `${BaseUrl}/intercentro/crearLancha`,
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
      const response = await axios.get(`${BaseUrl}/intercentro/movimientos`, {
        withCredentials: true,
      });
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
        `${BaseUrl}/intercentro/crearMovimiento`,
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
        `${BaseUrl}/intercentro/solicitar`,
        nuevaSolicitud,
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      throw new Error(err.message || "Error al agendar la ruta de intercentro");
    }
  };
  //Funcion para agendar una ruta de intercentro para mis trabajadores
  const agendarIntercentroTrabajadores = async (nuevaSolicitud) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/contratista/agendarTrabajadores`,
        nuevaSolicitud,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.message || "Error al agendar la ruta de intercentro"
      );
    }
  };
  //Función para obtener solicitudes de intercentros
  const obtenerSolicitudesIntercentro = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BaseUrl}/intercentro/solicitudes`, {
        withCredentials: true,
      });
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
        `${BaseUrl}/intercentro/solicitudes/${solicitudId}/aprobar`,
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
        `${BaseUrl}/intercentro/solicitudes/${solicitudId}/rechazar`,
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
        `${BaseUrl}/intercentro/cancelarSolicitud/${solicitudId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      throw new Error(
        err.message || "Error al cancelar la solicitud de intercentro"
      );
    }
  };

  const obtenerLanchasPorMovimiento = async (movimientoId) => {
    try {
      const response = await axios.get(
        `${BaseUrl}/intercentro/movimientos/${movimientoId}/lanchas`,
        { withCredentials: true }
      );
      return response.data.lanchas;
    } catch (err) {
      throw new Error(
        err.message || "Error al obtener las lanchas del movimiento"
      );
    }
  };
  const obtenerPontonesPorMovimiento = async (movimientoId) => {
    try {
      const response = await axios.get(
        `${BaseUrl}/intercentro/movimientos/${movimientoId}/pontones`,
        { withCredentials: true }
      );
      return response.data.pontones;
    } catch (err) {
      throw new Error(
        err.message || "Error al obtener las lanchas del movimiento"
      );
    }
  };

  useEffect(() => {
    obtenerRutasIntercentro();
  }, []);

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
        agendarIntercentroTrabajadores,
        obtenerSolicitudesIntercentro,
        aprobarSolicitudIntercentro,
        rechazarSolicitudIntercentro,
        cancelarSolicitudIntercentro,
        obtenerLanchasPorMovimiento,
        obtenerPontonesPorMovimiento,
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
