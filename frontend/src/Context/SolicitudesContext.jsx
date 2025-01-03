import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const SolicitudesContext = createContext();
const BaseUrl = import.meta.env.VITE_BASE_URL;
export const SolicitudesProvider = ({ children }) => {
  const [solicitudesNormales, setSolicitudesNormales] = useState([]);
  const [solicitudesTrabajadores, setSolicitudesTrabajadores] = useState([]);
  const [solicitudesIntercentro, setSolicitudesIntercentro] = useState([]);
  const [loadingSolicitudes, setLoadingSolicitudes] = useState(false);
  const [errorSolicitudes, setErrorSolicitudes] = useState(null);

  const obtenerSolicitudesNormales = async () => {
    try {
      setLoadingSolicitudes(true);
      const response = await axios.get(
        `${BaseUrl}/viajes/solicitudes-usuarios`
      );
      setSolicitudesNormales(response.data.solicitudes);
    } catch (error) {
      setErrorSolicitudes(error.message);
    } finally {
      setLoadingSolicitudes(false);
    }
  };

  const obtenerSolicitudesTrabajadores = async () => {
    try {
      setLoadingSolicitudes(true);
      const response = await axios.get(
        `${BaseUrl}/viajes/solicitudes-trabajadores`
      );
      setSolicitudesTrabajadores(response.data.solicitudes);
    } catch (error) {
      setErrorSolicitudes(error.message);
    } finally {
      setLoadingSolicitudes(false);
    }
  };

  const obtenerSolicitudesIntercentro = async () => {
    try {
      setLoadingSolicitudes(true);
      const response = await axios.get(
        `${BaseUrl}/intercentro/solicitudes`
      );
      setSolicitudesIntercentro(response.data.solicitudes);
    } catch (error) {
      setErrorSolicitudes(error.message);
    } finally {
      setLoadingSolicitudes(false);
    }
  };

  const aprobarViaje = async (id) => {
    try {
      const response = await axios.put(
        `${BaseUrl}/viajes/solicitud/${id}/aprobar`
      );
      return response.data;
    } catch (error) {
      console.error("Error al aprobar la solicitud de viaje", error);
    }
  };

  const rechazarViaje = async (id) => {
    try {
      const response = await axios.patch(
        `${BaseUrl}/viajes/solicitud/${id}/rechazar`
      );
      return response.data;
    } catch (error) {
      console.error("Error al rechazar la solicitud de viaje", error);
    }
  };

  const aprobarIntercentro = async (id) => {
    try {
      const response = await axios.put(
        `${BaseUrl}/intercentro/solicitudes/${id}/aprobar`
      );
      return response.data;
    } catch (error) {
      console.error("Error al aprobar la solicitud de intercentro", error);
    }
  };

  const rechazarIntercentro = async (id) => {
    try {
      const response = await axios.put(
        `${BaseUrl}/intercentro/solicitudes/${id}/cancelar`
      );
      return response.data;
    } catch (error) {
      console.error("Error al rechazar la solicitud de intercentro", error);
    }
  };

  return (
    <SolicitudesContext.Provider
      value={{
        solicitudesNormales,
        solicitudesTrabajadores,
        solicitudesIntercentro,
        loadingSolicitudes,
        errorSolicitudes,
        obtenerSolicitudesNormales,
        obtenerSolicitudesTrabajadores,
        obtenerSolicitudesIntercentro,
        aprobarViaje,
        rechazarViaje,
        aprobarIntercentro,
        rechazarIntercentro,
      }}
    >
      {children}
    </SolicitudesContext.Provider>
  );
};

export const useSolicitudes = () => useContext(SolicitudesContext);
