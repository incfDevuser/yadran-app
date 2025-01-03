import React, { useState, useEffect } from "react";
import { useBases } from "../../../../Context/BasesContext";
import ListaBaseModal from "./ListaBaseModal";
import CreateBaseModal from "./CreateBaseModal";
import { MdHouseboat } from "react-icons/md";

const BasesCard = () => {
  const { bases, obtenerBases } = useBases();
  const [isListaModalOpen, setIsListaModalOpen] = useState(false);
  const [isCrearModalOpen, setIsCrearModalOpen] = useState(false);

  useEffect(() => {
    obtenerBases();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
      <div className="flex justify-start items-center gap-2">
        <MdHouseboat className="shadow rounded-full p-1 text-2xl text-amber-950" />
        <p className="font-semibold">Bases</p>
      </div>
      <div className="flex flex-col">
        <p className="text-2xl font-bold text-black">{bases.length}</p>
        <p className="text-gray-500">Bases Totales</p>
      </div>
      <p className="w-[200px]">Visualiza o crea una nueva Base</p>
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
          Crear Nueva
        </button>
      </div>
      {/* Modales */}
      <ListaBaseModal
        isOpen={isListaModalOpen}
        onClose={() => setIsListaModalOpen(false)}
      />
      <CreateBaseModal
        isOpen={isCrearModalOpen}
        onClose={() => setIsCrearModalOpen(false)}
      />
    </div>
  );
};

export default BasesCard;
