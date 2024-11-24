import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const ChoferContext = createContext();

export const ChoferProvider = ({ children }) => {
  const [choferes, setChoferes] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const obtenerChoferes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/api/choferes/");
      setChoferes(response.data.choferes);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const crearChofer = async (nuevoChofer) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/choferes/crear",
        nuevoChofer
      );
      setChoferes((prevChoferes) => [...prevChoferes, response.data]);
    } catch (err) {
      setError(err.message);
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
