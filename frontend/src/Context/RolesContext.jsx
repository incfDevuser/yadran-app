import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const RolesContext = createContext();
const BaseUrl = import.meta.env.VITE_BASE_URL;
export const RolesProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener roles
  const obtenerRoles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BaseUrl}/roles`);
      setRoles(response.data);
    } catch (err) {
      setError(err.message || "Error al obtener los roles");
      console.error("Error al obtener los roles:", err);
    } finally {
      setLoading(false);
    }
  };

  // Crear un rol
  const crearRol = async (nuevoRol) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BaseUrl}/roles/crearRol`,
        nuevoRol
      );
      // Actualizar la lista de roles con el nuevo rol creado
      setRoles((prevRoles) => [...prevRoles, response.data]);
    } catch (err) {
      setError(err.message || "Error al crear el rol");
      console.error("Error al crear el rol:", err);
    } finally {
      setLoading(false);
    }
  };

  // Asignar un rol a un usuario
  const asignarRol = async (datosAsignacion) => {
    setLoading(true);
    try {
      await axios.put(
        `${BaseUrl}/roles/modificar-rol-usuario`,
        datosAsignacion
      );
    } catch (err) {
      setError(err.message || "Error al asignar el rol");
      console.error("Error al asignar el rol:", err);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar un rol
  const eliminarRol = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${BaseUrl}/roles/${id}`);
      // Actualizar la lista de roles eliminando el rol correspondiente
      setRoles((prevRoles) => prevRoles.filter((rol) => rol.id !== id));
    } catch (err) {
      setError(err.message || "Error al eliminar el rol");
      console.error("Error al eliminar el rol:", err);
    } finally {
      setLoading(false);
    }
  };

  // Efecto para obtener roles al cargar el componente
  useEffect(() => {
    obtenerRoles();
  }, []);

  return (
    <RolesContext.Provider
      value={{
        roles,
        loading,
        error,
        obtenerRoles,
        crearRol,
        asignarRol,
        eliminarRol,
      }}
    >
      {children}
    </RolesContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useRoles = () => useContext(RolesContext);
