import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
const VehiculosContext = createContext();

export const VehiculosProvider = ({ children }) => {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Renderizar la lista de vehiculos cuando se llama al componente
  useEffect(() => {
    const obtenerVehiculos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/vehiculos/`,
          {
            withCredentials: true,
          }
        );
        const data = response.data.vehiculos;
        setVehiculos(data);
      } catch (error) {
        setError(error.message || "Hubo un error al cargar los vehiculos");
      } finally {
        setLoading(false);
      }
    };
    obtenerVehiculos();
  }, []);

  //Crear un vehiculos
  const crearVehiculo = async (nuevoVehiculo) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/vehiculos/create`,
        nuevoVehiculo
      );
      if (response.status === 201) {
        //Actualizar la lsita de vehiculos
        setVehiculos([...vehiculos, response.data]);
      } else {
        console.error("Error al crear el vehiculo", response.data);
        throw new Error(response.data.message || "Error al crear el vehiculo");
      }
    } catch (error) {
      console.error("Error al crear el vehiculo:", error.message);
      throw error;
    }
  };
  //Eliminar un vehiculo
  const eliminarVehiculo = async (vehiculoId) => {
    try {
      await axios.delete(`http://localhost:5000/api/vehiculos/${vehiculoId}`);
      setTrayectos((prevVehiculos) =>
        prevVehiculos.filter((vehiculo) => vehiculo.id !== vehiculoId)
      );
    } catch (error) {
      console.error("Error al eliminar el vehiculo:", error.message);
      throw error;
    }
  };

  return (
    <VehiculosContext.Provider
      value={{ vehiculos, loading, error, crearVehiculo, eliminarVehiculo }}
    >
      {children}
    </VehiculosContext.Provider>
  );
};
export const useVehiculos = () => useContext(VehiculosContext);
