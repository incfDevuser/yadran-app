import React, { useState, createContext, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotificacionesContext = createContext();
const BaseUrl = import.meta.env.VITE_BASE_URL;

export const NotificacionesProvider = ({ children }) => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(false);

  const obtenerNotificaciones = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BaseUrl}/notificaciones`, {
        withCredentials: true,
      });
      setNotificaciones(response.data.notificaciones);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Error al obtener notificaciones"
      );
      console.error("Error al obtener notificaciones:", err);
    } finally {
      setLoading(false);
    }
  };
  const obtenerNotificacionesPorUsuario = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BaseUrl}/notificaciones/notificaciones-usuario`,
        {
          withCredentials: true,
        }
      );
      setNotificaciones(response.data.notificaciones);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Error al obtener notificaciones"
      );
      console.error("Error al obtener notificaciones:", err);
    } finally {
      setLoading(false);
    }
  };
  const crearNotificacionGlobal = async (
    titulo,
    descripcion,
    tipo = "alerta"
  ) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BaseUrl}/notificaciones/crear-notificacion`,
        { titulo, descripcion, tipo },
        { withCredentials: true }
      );
      toast.success("Notificación global creada exitosamente");
      setNotificaciones((prev) => [...prev, response.data.notificacion]);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Error al crear notificación global"
      );
      console.error("Error al crear notificación global:", err);
    } finally {
      setLoading(false);
    }
  };
  const editarNotificacion = async (id, campos) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${BaseUrl}/notificaciones/actualizar/${id}`,
        campos,
        { withCredentials: true }
      );
      toast.success("Notificación actualizada exitosamente");
      setNotificaciones((prev) =>
        prev.map((n) => (n.id === id ? response.data.notificacion : n))
      );
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Error al editar notificación"
      );
      console.error("Error al editar notificación:", err);
    } finally {
      setLoading(false);
    }
  };
  const eliminarNotificacion = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${BaseUrl}/notificaciones/eliminar/${id}`, {
        withCredentials: true,
      });
      toast.success("Notificación eliminada exitosamente");
      // Actualizar localmente la lista
      setNotificaciones((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Error al eliminar notificación"
      );
      console.error("Error al eliminar notificación:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <NotificacionesContext.Provider
      value={{
        notificaciones,
        loading,
        obtenerNotificaciones,
        obtenerNotificacionesPorUsuario,
        crearNotificacionGlobal,
        editarNotificacion,
        eliminarNotificacion,
      }}
    >
      {children}
    </NotificacionesContext.Provider>
  );
};
export const useNotificaciones = () => {
  return useContext(NotificacionesContext);
};
