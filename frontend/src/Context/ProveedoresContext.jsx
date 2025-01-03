import React, { useState, useEffect, createContext, useContext, useCallback } from "react";
import axios from "axios";

// Crear el contexto
const ProveedoresContext = createContext();

const BaseUrl = import.meta.env.VITE_BASE_URL;

export const ProveedoresProvider = ({ children }) => {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const obtenerProveedores = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BaseUrl}/proveedores/`, {
        withCredentials: true,
      });
      setProveedores(response.data.proveedores);
    } catch (error) {
      setError(error.message || "Hubo un error al cargar los proveedores");
    } finally {
      setLoading(false);
    }
  }, []);
  const agregarProveedor = useCallback(async (nuevoProveedor) => {
    try {
      const response = await axios.post(`${BaseUrl}/proveedores/create`, nuevoProveedor);
      if (response.status === 201) {
        setProveedores((prev) => [...prev, response.data]);
        return response.data;
      } else {
        throw new Error(response.data.message || "Error al crear el proveedor");
      }
    } catch (error) {
      console.error("Error al agregar proveedor:", error.message);
      throw error;
    }
  }, []);
  const eliminarProveedor = useCallback(async (proveedorId) => {
    try {
      await axios.delete(`${BaseUrl}/proveedores/${proveedorId}`);
      setProveedores((prev) => prev.filter((proveedor) => proveedor.id !== proveedorId));
    } catch (error) {
      console.error("Error al eliminar al proveedor:", error.message);
      throw error;
    }
  }, []);

  useEffect(() => {
    obtenerProveedores();
  }, [obtenerProveedores]);

  return (
    <ProveedoresContext.Provider
      value={{
        proveedores,
        loading,
        error,
        obtenerProveedores,
        agregarProveedor,
        eliminarProveedor,
      }}
    >
      {children}
    </ProveedoresContext.Provider>
  );
};

// Hook para consumir el contexto
export const useProveedores = () => useContext(ProveedoresContext);