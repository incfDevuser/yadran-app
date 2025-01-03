import React, { useState, useEffect } from "react";
import { useConcesion } from "../../../../Context/ConcesionesContext";
import ListaConcesionesModal from "./ListaConcesionesModal";
import CreateConcesionModal from "./CreateConcesionModal";
import { FaHandsHelping } from "react-icons/fa";
const ConcesionesCard = () => {
  const { concesiones, obtenerConcesiones } = useConcesion();
  const [isCrearModalOpen, setIsCrearModalOpen] = useState(false);
  const [isListaModalOpen, setIsListaModalOpen] = useState(false);
  useEffect(() => {
    obtenerConcesiones();
  }, []);
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
      <div className="flex justify-start items-center gap-2">
        <FaHandsHelping className="shadow rounded-full p-1 text-2xl text-pink-300" />
        <p className="font-semibold">Concesiones</p>
      </div>
      <div className="flex flex-col">
        <p className="text-2xl font-bold text-black">{concesiones.length}</p>
        <p className="text-gray-500">Concesiones Totales</p>
      </div>
      <p className="w-[200px]">Visualiza o crea una nueva Concesión</p>
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
      <ListaConcesionesModal
        isOpen={isListaModalOpen}
        onClose={() => setIsListaModalOpen(false)}
      />
      <CreateConcesionModal
        isOpen={isCrearModalOpen}
        onClose={() => setIsCrearModalOpen(false)}
      />
    </div>
  );
};

export default ConcesionesCard;
