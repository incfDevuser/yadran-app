import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const SolicitudesContext = createContext();

export const SolicitudesProvider = ({ children }) => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loadingSolicitudes, setLoadingSolicitudes] = useState(true);
  const [errorSolicitudes, setErrorSolicitudes] = useState(null);

  useEffect(() => {
    const obtenerSolicitudes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/viajes/solicitudes-usuarios"
        );
        setSolicitudes(response.data.solicitudes);
      } catch (error) {
        setErrorSolicitudes(error.message);
      } finally {
        setLoadingSolicitudes(false);
      }
    };

    obtenerSolicitudes();
  }, []);

  const aprobarSolicitud = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/viajes/${id}`,
        {
          estado: "Aprobado",
        }
      );
      setSolicitudes((prevSolicitudes) =>
        prevSolicitudes.map((solicitud) =>
          solicitud.id === id ? { ...solicitud, estado: "Aprobado" } : solicitud
        )
      );
      return response.data;
    } catch (error) {
      console.error("Error al aprobar la solicitud", error);
    }
  };

  const rechazarSolicitud = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/viajes/${id}`,
        {
          estado: "Rechazado",
        }
      );
      setSolicitudes((prevSolicitudes) =>
        prevSolicitudes.map((solicitud) =>
          solicitud.id === id
            ? { ...solicitud, estado: "Rechazado" }
            : solicitud
        )
      );
      return response.data;
    } catch (error) {
      console.error("Error al rechazar la solicitud", error);
    }
  };

  return (
    <SolicitudesContext.Provider
      value={{
        solicitudes,
        loadingSolicitudes,
        errorSolicitudes,
        aprobarSolicitud,
        rechazarSolicitud,
      }}
    >
      {children}
    </SolicitudesContext.Provider>
  );
};

export const useSolicitudes = () => useContext(SolicitudesContext);
