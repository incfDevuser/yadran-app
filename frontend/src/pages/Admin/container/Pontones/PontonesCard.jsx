import React, { useState, useEffect } from "react";
import ListaPontonesModal from "./ListaPontonesModal";
import CreatePontonModal from "./CreatePontonModal";
import { usePontones } from "../../../../Context/PontonesContext";
import { IoFish } from "react-icons/io5";

const PontonesCard = () => {
  const { pontones, obtenerPontones } = usePontones();
  const [isListaModalOpen, setIsListaModalOpen] = useState(false);
  const [isCrearModalOpen, setIsCrearModalOpen] = useState(false);
  useEffect(() => {
    obtenerPontones();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
      <div className="flex justify-start items-center gap-2">
        <IoFish className="shadow rounded-full p-1 text-2xl text-blue-300" />
        <p className="font-semibold">Pontones</p>
      </div>
      <div className="flex flex-col">
        <p className="text-2xl font-bold text-black">{pontones.length}</p>
        <p className="text-gray-500">Pontones Totales</p>
      </div>
      <p className="w-[200px]">Visualiza o crea un nuevo Ponton</p>
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
      <ListaPontonesModal
        isOpen={isListaModalOpen}
        onClose={() => setIsListaModalOpen(false)}
      />
      <CreatePontonModal
        isOpen={isCrearModalOpen}
        onClose={() => setIsCrearModalOpen(false)}
      />
    </div>
  );
};

export default PontonesCard;
