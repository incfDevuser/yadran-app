import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import axios from "axios";

const ViajesContext = createContext();
const BaseUrl = import.meta.env.VITE_BASE_URL;

export const ViajesProvider = ({ children }) => {
  const [viajes, setViajes] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [detalleViaje, setDetalleViaje] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const obtenerViajes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BaseUrl}/viajes/`, {
        withCredentials: true,
      });
      setViajes(response.data.viajes || []);
    } catch (error) {
      console.error("Error al cargar los viajes:", error.message);
      setError(error.message || "Hubo un error al cargar los viajes");
    } finally {
      setLoading(false);
    }
  }, []);
  const crearViaje = async (nuevoViaje) => {
    try {
      const response = await axios.post(`${BaseUrl}/viajes/crear`, nuevoViaje, {
        withCredentials: true,
      });
      if (response.status === 201) {
        return response.data;
      } else {
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
        `${BaseUrl}/viajes/solicitar`,
        nuevaSolicitud,
        { withCredentials: true }
      );
      if (response.status === 201) {
        setSolicitudes((prevSolicitudes) => [
          ...prevSolicitudes,
          response.data,
        ]);
        return response.data;
      } else {
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
    setError(null);
    try {
      const response = await axios.get(
        `${BaseUrl}/seguimiento/viajes/${idViaje}/detalle`,
        { withCredentials: true }
      );
      setDetalleViaje(response.data.detalleViaje || null);
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
      await axios.post(
        `${BaseUrl}/limpieza/limpiarUsuarios`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error al limpiar las entidades:", error.message);
    }
  };

  const eliminarViaje = async (id) => {
    try {
      await axios.delete(`${BaseUrl}/viajes/${id}`, {
        withCredentials: true,
      });
      setViajes(viajes.filter((viaje) => viaje.id !== id));
      return true;
    } catch (error) {
      console.error("Error al eliminar el viaje:", error);
      throw error;
    }
  };

  const eliminarUsuarioSeguimiento = async (usuarioData) => {
    try {
      const id = usuarioData.usuario_id || usuarioData.trabajador_id;
      const tipo = usuarioData.usuario_id ? "usuario" : "trabajador";

      await axios.delete(`${BaseUrl}/seguimiento/usuarios/${id}?tipo=${tipo}`, {
        withCredentials: true,
      });
      if (detalleViaje) {
        const viajeActualizado = await obtenerDetalleViaje(
          detalleViaje.viaje.viaje_id
        );
        setDetalleViaje(viajeActualizado);
      }
      return true;
    } catch (error) {
      console.error("Error al eliminar usuario del seguimiento:", error);
      throw error;
    }
  };

  useEffect(() => {
    obtenerViajes();
  }, [obtenerViajes]);

  return (
    <ViajesContext.Provider
      value={{
        viajes,
        solicitudes,
        loading,
        error,
        detalleViaje,
        obtenerViajes,
        crearViaje,
        solicitarViaje,
        obtenerDetalleViaje,
        limpiarEntidades,
        eliminarViaje,
        eliminarUsuarioSeguimiento,
      }}
    >
      {children}
    </ViajesContext.Provider>
  );
};

export const useViajes = () => useContext(ViajesContext);
