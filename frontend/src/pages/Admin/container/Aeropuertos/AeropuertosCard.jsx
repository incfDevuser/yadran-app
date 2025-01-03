import React, { useEffect, useState } from "react";
import { useAeropuertos } from "../../../../Context/AeropuertosContext";
import ListaAeropuertoModal from "./ListaAeropuertoModal";
import CreateAeropuertoModal from "./CreateAeropuertoModal";
import { MdLocalAirport } from "react-icons/md";
const AeropuertosCard = () => {
  const { aeropuertos, obtenerAeropuertos } = useAeropuertos();
  const [isListaModalOpen, setIsListaModalOpen] = useState(false);
  const [isCrearModalOpen, setIsCrearModalOpen] = useState(false);

  useEffect(() => {
    obtenerAeropuertos();
  }, [obtenerAeropuertos]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
      <div className="flex justify-start items-center gap-2">
        <MdLocalAirport className="shadow rounded-full p-1 text-2xl text-gray-600" />
        <p className="font-semibold">Aeropuertos</p>
      </div>
      <div className="flex flex-col">
        <p className="text-2xl font-bold text-black">{aeropuertos.length}</p>
        <p className="text-gray-500">Aeropuertos Totales</p>
      </div>
      <p className="w-[200px]">Visualiza o crea un nuevo Aeropuerto</p>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setIsListaModalOpen(true)}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
        >
          Ver Lista
        </button>
        <button
          onClick={() => setIsCrearModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Crear Nuevo
        </button>
      </div>
      {/* Modales */}
      <ListaAeropuertoModal
        isOpen={isListaModalOpen}
        onClose={() => setIsListaModalOpen(false)}
      />
      <CreateAeropuertoModal
        isOpen={isCrearModalOpen}
        onClose={() => setIsCrearModalOpen(false)}
      />
    </div>
  );
};

export default AeropuertosCard;
