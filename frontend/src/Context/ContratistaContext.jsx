import axios from "axios";
import React, { createContext, useEffect, useState, useContext } from "react";

const ContratistaContext = createContext();

export const ContratistaProvider = ({ children }) => {
  const [trabajadores, setTrabajadores] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [ solicitudesIntercentro, setSolicitudesIntercentro ] = useState([])

  const obtenerTrabajadores = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/contratista/misTrabajadores",
        { withCredentials: true }
      );
      setTrabajadores(response.data.trabajadores);
    } catch (error) {
      console.error("Error al obtener trabajadores:", error.message);
    }
  };
  //Obtener solicitudes de viajes normales
  const obtenerSolicitudes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/contratista/solicitudes-trabajadores`,
        { withCredentials: true }
      );
      setSolicitudes(response.data.solicitudes);
    } catch (error) {
      console.error("Error al obtener las solicitudes de trabajadores:", error);
    }
  };
  //Agregar trabajadores
  const agregarTrabajadores = async (nuevoTrabajador) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/contratista/trabajadores`,
        nuevoTrabajador,
        { withCredentials: true }
      );
      setTrabajadores((prev) => [...prev, response.data]);
      return response.data;
    } catch (error) {
      console.error("Error al agregar trabajador:", error.message);
    }
  };
  //Agendar ruta de intercentro
  const agendarTrabajadores = async (
    movimientoId,
    trabajadoresIds,
    comentario
  ) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/contratista/agendarTrabajadores`,
        {
          movimientoId,
          trabajadoresIds,
          comentario,
        },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error al agendar viaje para trabajadores:", error.message);
    }
  };
  const obtenerSolicitudesIntercentro = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/contratista/solicitudes-trabajadores/intercentro`,
        { withCredentials: true }
      );
      setSolicitudesIntercentro(response.data)
    } catch (error) {
      console.error("Error al agendar intercentro:", error.message);
    }
  };
  //Cancelar solicitud viaje normal 
  const cancelarSolicitudTrabajador = async (solicitudId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/viajes/cancelar-solicitud/${solicitudId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error al cancelar solicitud de trabajadores:",
        error.message
      );
    }
  };
  //Agendar para viajes normales
  const agendarNormal = async (solicitud) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/viajes/solicitar-trabajadores`,
        solicitud,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error al agendar viaje normal:", error.message);
    }
  };
  //Cancelar solicitud normal
  const cancelarSolicitudNormal = async (solicitudId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/viajes/cancelar-solicitud/${solicitudId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error al cancelar solicitud de viaje normal:",
        error.message
      );
    }
  };
  return (
    <ContratistaContext.Provider
      value={{
        trabajadores,
        solicitudes,
        solicitudesIntercentro,
        obtenerTrabajadores,
        obtenerSolicitudes,
        agregarTrabajadores,
        agendarTrabajadores,
        obtenerSolicitudesIntercentro,
        cancelarSolicitudTrabajador,
        agendarNormal,
        cancelarSolicitudNormal,
      }}
    >
      {children}
    </ContratistaContext.Provider>
  );
};
export const useContratista = () => {
  return useContext(ContratistaContext);
};
