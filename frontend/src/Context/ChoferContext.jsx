import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const ChoferContext = createContext();
const BaseUrl = import.meta.env.VITE_BASE_URL;

export const ChoferProvider = ({ children }) => {
  const [choferes, setChoferes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const obtenerChoferes = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${BaseUrl}/choferes/`);
      setChoferes(data.choferes);
    } catch (err) {
      setError(`Error al obtener los choferes: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };


  const crearChofer = async (nuevoChofer) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(
        `${BaseUrl}/choferes/crear`,
        nuevoChofer
      );
      setChoferes((prevChoferes) => [...prevChoferes, data]);
    } catch (err) {
      setError(`Error al crear el chofer: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    obtenerChoferes();
  }, []);

  return (
    <ChoferContext.Provider
      value={{
        choferes,
        loading,
        error,
        obtenerChoferes,
        crearChofer,
      }}
    >
      {children}
    </ChoferContext.Provider>
  );
};


export const useChofer = () => useContext(ChoferContext);
