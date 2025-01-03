import React, { useState, useEffect } from "react";
import ListaCentrosModal from "./ListaCentroModal";
import CreateCentroModal from "./CreateCentroModal";
import { useCentros } from "../../../../Context/CentrosContext";
import { HiMiniHomeModern } from "react-icons/hi2";

const CentrosCard = () => {
  const { centros, obtenerCentros } = useCentros();
  const [isListaModalOpen, setIsListaModalOpen] = useState(false);
  const [isCrearModalOpen, setIsCrearModalOpen] = useState(false);

  useEffect(() => {
    obtenerCentros();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
      <div className="flex justify-start items-center gap-2">
        <HiMiniHomeModern className="shadow rounded-full p-1 text-2xl text-black" />
        <p className="font-semibold">Centros</p>
      </div>
      <div className="flex flex-col">
        <p className="text-2xl font-bold text-black">{centros.length}</p>
        <p className="text-gray-500">Centros Totales</p>
      </div>
      <p className="w-[200px]">Visualiza o crea un nuevo Centro</p>
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
      <ListaCentrosModal
        isOpen={isListaModalOpen}
        onClose={() => setIsListaModalOpen(false)}
      />
      <CreateCentroModal
        isOpen={isCrearModalOpen}
        onClose={() => setIsCrearModalOpen(false)}
      />
    </div>
  );
};

export default CentrosCard;
