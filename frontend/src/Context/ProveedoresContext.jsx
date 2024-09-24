import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

//Crear el contexto
const ProveedoresContext = createContext();

export const ProveedoresProvider = ({ children }) => {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Renderizar los proveedores
  useEffect(() => {
    const obtenerProveedores = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/proveedores/`,
          {
            withCredentials: true,
          }
        );
        const data = response.data.proveedores;
        setProveedores(data);
      } catch (error) {
        setError(error.message || "Hubo un error al cargar los proveedores");
      } finally {
        setLoading(false);
      }
    };
    obtenerProveedores();
  }, []);
  const agregarProveedor = async (nuevoProveedor) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/proveedores/create`,
        nuevoProveedor
      );
      if (response.status === 201) {
        //Actualiza la lista de proveedores
        setProveedores([...proveedores, response.data]);
        return response.data;
      } else {
        console.error("Error al crear el proveedor", response.data);
        throw new Error(response.data.message || "Error al crear el proveedor");
      }
    } catch (error) {
      console.error("Error al agregar proveedor:", error.message);
      throw error;
    }
  };
  const eliminarProveedor = async (proveedorId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/proveedores/${proveedorId}`
      );
      setProveedores((prevProveedores) =>
        prevProveedores.filter((proveedor) => proveedor.id !== proveedorId)
      );
    } catch (error) {
      console.error("Error al eliminar al proveedor:", error.message);
      throw error;
    }
  };
  return (
    <ProveedoresContext.Provider
      value={{
        proveedores,
        loading,
        error,
        agregarProveedor,
        eliminarProveedor,
      }}
    >
      {children}
    </ProveedoresContext.Provider>
  );
};

export const useProveedores = ()=> useContext(ProveedoresContext)