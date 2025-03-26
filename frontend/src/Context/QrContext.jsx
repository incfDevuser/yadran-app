import React, { createContext, useContext } from "react";
import axios from "axios";

const QrContext = createContext();
const BaseUrl = import.meta.env.VITE_BASE_URL;
export const QrProvider = ({ children }) => {
  const validarTrayecto = async ({ trayecto_id, vehiculo_id }) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/qr/registrar-en-trayecto`,
        {
          trayecto_id,
          vehiculo_id,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error al validar el trayecto:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "No se pudo validar el trayecto"
      );
    }
  };
  const validarPonton = async ({ ponton_id }) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/qr/registrar-ponton`,
        { ponton_id },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error al validar el pontón:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "No se pudo validar el pontón"
      );
    }
  };
  const validarPasajeroChofer = async () => {
    try {
    } catch (error) {}
  };
  return (
    <QrContext.Provider
      value={{ validarTrayecto, validarPonton, validarPasajeroChofer }}
    >
      {children}
    </QrContext.Provider>
  );
};
export const useQr = () => {
  const context = useContext(QrContext);
  if (!context) {
    throw new Error("useQr debe usarse dentro de un QrProvider");
  }
  return context;
};
