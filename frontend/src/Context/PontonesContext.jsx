import axios from "axios";
import React, { useState, useEffect, createContext, useContext } from "react";

const PontonesContext = createContext();
const BaseUrl = import.meta.env.VITE_BASE_URL;
export const PontonesProvider = ({ children }) => {
  const [pontones, setPontones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const obtenerPontones = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BaseUrl}/pontones/`);
      const data = response.data.pontones;
      setPontones(data);
    } catch (error) {
      setError(error.message || "Hubo un error al cargar los pontones");
    } finally {
      setLoading(false);
    }
  };
  const crearPonton = async (nuevoPonton) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/pontones/create`,
        nuevoPonton
      );
      if (response.status === 201) {
        setPontones([...pontones, response.data]);
        return response.data;
      } else {
        console.error("Error al crear el ponton", response.data);
        throw new Error(response.data.message || "Error al crear el ponton");
      }
    } catch (error) {
      console.error("Hubo un error al crear el ponton");
    }
  };
  const asignarQrPonton = async (id) => {
    try {
      const response = await axios.post(
        `${BaseUrl}i/qr/asignar-qr/${id}`
      );
      if (response.status === 200) {
        setPontones((prevPontones) =>
          prevPontones.map((ponton) =>
            ponton.id === id
              ? { ...ponton, qr_code: response.data.qr_code }
              : ponton
          )
        );
        return response.data.qr_code;
      } else {
        console.error("Error al asignar QR al pontón", response.data);
        throw new Error(
          response.data.message || "Error al asignar QR al pontón"
        );
      }
    } catch (error) {
      console.error("Hubo un error al asignar QR al pontón:", error);
      throw error;
    }
  };
  const actualizarPonton = async (id, datosActualizados) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${BaseUrl}/pontones/${id}`,
        datosActualizados
      );
      const pontonActualizado = response.data;

      setPontones((prev) =>
        prev.map((p) => (p.id === id ? pontonActualizado : p))
      );
      return pontonActualizado;
    } catch (error) {
      console.error("Error al actualizar el pontón:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <PontonesContext.Provider
      value={{
        pontones,
        loading,
        error,
        obtenerPontones,
        crearPonton,
        asignarQrPonton,
        actualizarPonton,
      }}
    >
      {children}
    </PontonesContext.Provider>
  );
};
export const usePontones = () => useContext(PontonesContext);
