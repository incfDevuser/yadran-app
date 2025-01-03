import React, { useEffect } from "react";
import TrabajadorCard from "./TrabajadorCard";
import { useContratista } from "../../Context/ContratistaContext";

const ListaTrabajadores = () => {
  const { trabajadores, obtenerTrabajadores } = useContratista();

  useEffect(() => {
    obtenerTrabajadores();
  }, [obtenerTrabajadores]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Lista de Trabajadores
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trabajadores.length === 0 ? (
          <p className="text-gray-600 text-center">
            No hay trabajadores disponibles.
          </p>
        ) : (
          trabajadores.map((trabajador) => (
            <TrabajadorCard
              key={trabajador.trabajador_id}
              trabajador={trabajador}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ListaTrabajadores;
