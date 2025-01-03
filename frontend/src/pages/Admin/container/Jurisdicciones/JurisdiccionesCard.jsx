import React, { useState, useEffect } from "react";
import { useJurisdiccion } from "../../../../Context/JurisdiccionContext";
import CreateJurisdiccionModal from "./CreateJurisdiccionModal";
import ListaJurisdiccionesModal from "./ListaJurisdiccionesModal";
import { GoLaw } from "react-icons/go";

const JurisdiccionesCard = () => {
  const { jurisdicciones, obtenerJurisdicciones } = useJurisdiccion(); // Incluye la función del contexto
  const [isCrearModalOpen, setIsCrearModalOpen] = useState(false);
  const [isListaModalOpen, setIsListaModalOpen] = useState(false);
  useEffect(() => {
    obtenerJurisdicciones();
  }, []);
  const handleVerLista = () => {
    console.log("Jurisdicciones actuales:", jurisdicciones);
    setIsListaModalOpen(true);
  };
  return (
    <div className="shadow-md rounded-lg p-4 bg-white flex flex-col justify-between">
      <div className="flex justify-start items-center gap-2">
        <GoLaw className="shadow rounded-full p-1 text-2xl text-amber-700" />
        <p className="font-semibold">Jurisdicciones</p>
      </div>
      <div className="flex flex-col">
        <p className="text-2xl font-bold text-black">{jurisdicciones.length}</p>
        <p className="text-gray-500">Jurisdicciones Totales</p>
      </div>
      <p className="w-[200px]">Visualiza o crea una nueva Jurisdicción</p>
      <div className="flex gap-2 mt-4">
        <button
          onClick={handleVerLista}
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
      <CreateJurisdiccionModal
        isOpen={isCrearModalOpen}
        onClose={() => setIsCrearModalOpen(false)}
      />
      <ListaJurisdiccionesModal
        isOpen={isListaModalOpen}
        onClose={() => setIsListaModalOpen(false)}
      />
    </div>
  );
};

export default JurisdiccionesCard;
