import React, { useEffect, useState } from "react";
import TrabajadorCard from "./TrabajadorCard";
import { useContratista } from "../../Context/ContratistaContext";

const ListaTrabajadores = () => {
  const { trabajadores, obtenerTrabajadores } = useContratista();
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchTrabajadores = async () => {
      await obtenerTrabajadores();
      setCargando(false);
    };
    fetchTrabajadores();
  }, []);

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Lista de Trabajadores</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cargando ? (
          <p className="text-gray-600 text-center">Cargando trabajadores...</p>
        ) : trabajadores.length > 0 ? (
          trabajadores.map((trabajador) => (
            <TrabajadorCard key={trabajador.trabajador_id} trabajador={trabajador} />
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">No hay trabajadores disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default ListaTrabajadores;
