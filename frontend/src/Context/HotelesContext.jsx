import axios from "axios";
import React, { useState, createContext, useContext, useEffect } from "react";

const HotelesContext = createContext();
const BaseUrl = import.meta.env.VITE_BASE_URL;

export const HotelesProvider = ({ children }) => {
  const [hoteles, setHoteles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener la lista de hoteles
  const obtenerHoteles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BaseUrl}/hoteles/`);
      if (response.status === 200) {
        setHoteles(response.data.hoteles || []);
      } else {
        console.error("Error al obtener hoteles:", response.data.message);
        throw new Error(response.data.message || "Error al obtener hoteles");
      }
    } catch (error) {
      console.error("Error al obtener hoteles:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Crear un hotel
  const crearHotel = async (nuevoHotel) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BaseUrl}/hoteles/agregarHotel`,
        nuevoHotel,
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        console.log("Hotel creado exitosamente:", response.data);
        setHoteles((prevHoteles) => [...prevHoteles, response.data.hotel]);
      } else {
        console.error("Error al crear el hotel:", response.data.message);
        throw new Error(response.data.message || "Error al crear el hotel");
      }
    } catch (error) {
      console.error("Error al crear el hotel:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const obtenerUsuariosPorHotelId = async (hotel_id) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BaseUrl}/hoteles/${hotel_id}/usuariosPorHotel`
      );
      if (response.status === 200) {
        return response.data.usuarios;
      } else {
        console.error("Error al obtener usuarios:", response.data.message);
        throw new Error(response.data.message || "Error al obtener usuarios.");
      }
    } catch (error) {
      console.error("Error al obtener usuarios:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const asignarHotel = async (hotelId, rutaId) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BaseUrl}/hoteles/asignarHotel`,
        { hotel_id: hotelId, ruta_id: rutaId },
        { withCredentials: true }
      );

      if (response.status === 201) {
        console.log("Hotel asignado correctamente:", response.data);
        return response.data;
      } else {
        console.error("Error al asignar el hotel:", response.data.message);
        throw new Error(response.data.message || "Error al asignar el hotel");
      }
    } catch (error) {
      console.error("Error al asignar el hotel:", error.message);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    obtenerHoteles();
  }, []);

  return (
    <HotelesContext.Provider
      value={{
        hoteles,
        loading,
        error,
        obtenerHoteles,
        crearHotel,
        obtenerUsuariosPorHotelId,
        asignarHotel,
      }}
    >
      {children}
    </HotelesContext.Provider>
  );
};

export const useHoteles = () => useContext(HotelesContext);
