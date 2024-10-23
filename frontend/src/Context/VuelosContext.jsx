import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const VuelosContext = createContext();

export const VuelosProvider = ({ children }) => {
  const [vuelos, setVuelos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerVuelos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/vuelos/`, {
          withCredentials: true,
        });
        const data = response.data.vuelos;
        setVuelos(data);
      } catch (error) {
        setError(error.message || "Hubo un error al cargar los vuelos");
      } finally {
        setLoading(false);
      }
    };
    obtenerVuelos();
  }, []);
  //Agregar un vuelo como trayecto
  const asignarVuelo = async (numero_vuelo, ruta_id) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/vuelos/asignar",
        {
          numero_vuelo,
          ruta_id,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        console.log("Vuelo asignado como trayecto correctamente");
      } else {
        console.error("Error al asignar vuelo", response.data.message);
      }
    } catch (error) {
      console.error("Error al asignar vuelo", error.message);
    }
  };
  return (
    <VuelosContext.Provider value={{ vuelos, loading, error, asignarVuelo }}>
      {children}
    </VuelosContext.Provider>
  );
};
export const useVuelos = () => useContext(VuelosContext);
