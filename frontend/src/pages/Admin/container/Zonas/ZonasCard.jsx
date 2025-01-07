import React, { useState, useEffect } from "react";
import { useZonas } from "../../../../Context/ZonasContext";
import CreateZonaModal from "./CreateZonaModal";
import ListaZonasModal from "./ListaZonasModal";
import { LuRadar } from "react-icons/lu";

const ZonasCard = () => {
  const { zonas, obtenerZonas } = useZonas();
  const [isCrearModalOpen, setIsCrearModalOpen] = useState(false);
  const [isListaModalOpen, setIsListaModalOpen] = useState(false);
  useEffect(() => {
    obtenerZonas();
  }, []);
  const handleVerLista = () => {
    setIsListaModalOpen(true);
  };
  return (
    <div className="shadow-md rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-start items-center gap-2">
        <LuRadar className="shadow rounded-full p-1 text-2xl text-blue-900" />
        <p className="font-semibold">Zonas</p>
      </div>
      <div className="flex flex-col">
        <p className="text-2xl font-bold text-black">{zonas.length}</p>
        <p className="text-gray-500">Zonas Totales</p>
      </div>
      <p className="w-[200px]">Visualiza o crea una nueva Zona</p>
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
      <CreateZonaModal
        isOpen={isCrearModalOpen}
        onClose={() => setIsCrearModalOpen(false)}
      />
      <ListaZonasModal
        isOpen={isListaModalOpen}
        onClose={() => setIsListaModalOpen(false)}
      />
    </div>
  );
};

export default ZonasCard;
