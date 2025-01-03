import React, { useEffect, useState } from "react";
import { usePuertos } from "../../../../Context/PuertosContext";
import ListaPuertosModal from "./ListaPuertosModal";
import CreatePuertoModal from "./CreatePuertoModal";
import { MdDirectionsBoatFilled } from "react-icons/md";
const PuertosCard = () => {
  const { puertos, obtenerPuertos } = usePuertos();
  const [isListaModalOpen, setIsListaModalOpen] = useState(false);
  const [isCrearModalOpen, setIsCrearModalOpen] = useState(false);

  useEffect(() => {
    obtenerPuertos();
  }, [obtenerPuertos]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
      <div className="flex justify-start items-center gap-2">
        <MdDirectionsBoatFilled className="shadow rounded-full p-1 text-2xl text-blue-700" />
        <p className="font-semibold">Puertos</p>
      </div>
      <div className="flex flex-col">
        <p className="text-2xl font-bold text-black">{puertos.length}</p>
        <p className="text-gray-500">Puertos Totales</p>
      </div>
      <p className="w-[200px]">Visualiza o crea un nuevo Puerto</p>
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
      <ListaPuertosModal
        isOpen={isListaModalOpen}
        onClose={() => setIsListaModalOpen(false)}
      />
      <CreatePuertoModal
        isOpen={isCrearModalOpen}
        onClose={() => setIsCrearModalOpen(false)}
      />
    </div>
  );
};

export default PuertosCard;
