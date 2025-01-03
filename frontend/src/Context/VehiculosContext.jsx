import React, { useState, useEffect, createContext, useContext, useCallback } from "react";
import axios from "axios";

const VehiculosContext = createContext();
const BaseUrl = import.meta.env.VITE_BASE_URL;

export const VehiculosProvider = ({ children }) => {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para obtener los vehículos
  const obtenerVehiculos = useCallback(async () => {
    setLoading(true);
    setError(null); 
    try {
      const response = await axios.get(`${BaseUrl}/vehiculos/`, {
        withCredentials: true,
      });
      setVehiculos(response.data.vehiculos);
    } catch (error) {
      setError(error.message || "Hubo un error al cargar los vehículos");
    } finally {
      setLoading(false);
    }
  }, []);

  const crearVehiculo = useCallback(async (nuevoVehiculo) => {
    try {
      const response = await axios.post(`${BaseUrl}/vehiculos/create`, nuevoVehiculo);
      if (response.status === 201) {
        setVehiculos((prev) => [...prev, response.data]);
      } else {
        throw new Error(response.data.message || "Error al crear el vehículo");
      }
    } catch (error) {
      console.error("Error al crear el vehículo:", error.message);
      throw error;
    }
  }, []);

  const eliminarVehiculo = useCallback(async (vehiculoId) => {
    try {
      await axios.delete(`${BaseUrl}/vehiculos/${vehiculoId}`);
      setVehiculos((prevVehiculos) =>
        prevVehiculos.filter((vehiculo) => vehiculo.id !== vehiculoId)
      );
    } catch (error) {
      console.error("Error al eliminar el vehículo:", error.message);
      throw error;
    }
  }, []);
  const asignarTripulante = useCallback(async (vehiculoId, tripulante) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/vehiculos/${vehiculoId}/tripulantes`,
        tripulante,
        { withCredentials: true }
      );

      setVehiculos((prevVehiculos) =>
        prevVehiculos.map((vehiculo) =>
          vehiculo.id === vehiculoId
            ? {
                ...vehiculo,
                tripulantes: [
                  ...(vehiculo.tripulantes || []),
                  response.data.tripulante,
                ],
              }
            : vehiculo
        )
      );
    } catch (error) {
      console.error("Error al asignar tripulante:", error.message);
      throw error;
    }
  }, []);
  useEffect(() => {
    obtenerVehiculos();
  }, [obtenerVehiculos]);

  return (
    <VehiculosContext.Provider
      value={{
        vehiculos,
        loading,
        error,
        obtenerVehiculos,
        crearVehiculo,
        eliminarVehiculo,
        asignarTripulante,
      }}
    >
      {children}
    </VehiculosContext.Provider>
  );
};

// Hook para consumir el contexto
export const useVehiculos = () => useContext(VehiculosContext);