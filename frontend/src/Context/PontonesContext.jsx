import axios from "axios";
import React, { useState, useEffect, createContext, useContext } from "react";

const PontonesContext = createContext();

export const PontonesProvider = ({ children }) => {
  const [pontones, setPontones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerPontones = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/pontones/`
        );
        const data = response.data.pontones;
        console.log(data)
        setPontones(data);
      } catch (error) {
        setError(error.message || "Hubo un error al cargar los pontones");
      } finally {
        setLoading(false);
      }
    };
    obtenerPontones();
  }, []);
  const crearPonton = async(nuevoPonton)=>{
    try {
      const response = await axios.post("http://localhost:5000/api/pontones/create", nuevoPonton)
      if(response.status === 201){
        setPontones([...pontones, response.data])
        return response.data
      }else{
        console.error("Error al crear el ponton", response.data);
        throw new Error(response.data.message || "Error al crear el ponton");
      }
    } catch (error) {
      console.error("Hubo un error al crear el ponton")
    }
  }
  return (
    <PontonesContext.Provider value={{ pontones, loading, error, crearPonton }}>
      {children}
    </PontonesContext.Provider>
  );
};
export const usePontones = () => useContext(PontonesContext);
