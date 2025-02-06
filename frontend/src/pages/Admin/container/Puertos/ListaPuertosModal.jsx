import React, { useEffect, useState } from "react";
import { usePuertos } from "../../../../Context/PuertosContext";
import EditarPuerto from "./EditarPuerto";

const ListaPuertosModal = ({ isOpen, onClose }) => {
  const { puertos, obtenerPuertos, loading, error } = usePuertos();
  const [puertoSeleccionado, setPuertoSeleccionado] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      obtenerPuertos();
    }
  }, [isOpen]);

  const abrirModalEditar = (puerto) => {
    setPuertoSeleccionado(puerto);
    setIsEditModalOpen(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[600px] p-5 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Lista de Puertos</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            X
          </button>
        </div>
        {loading ? (
          <p>Cargando puertos...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div>
            {puertos.length > 0 ? (
              puertos.map((puerto) => (
                <div
                  key={puerto.id}
                  className="p-4 border rounded-md shadow-sm mb-2 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold">{puerto.nombre_puerto}</h3>
                    <p>Ubicación: {puerto.ubicacion_puerto}</p>
                    <p>Localidad: {puerto.localidad}</p>
                    <p>Estado: {puerto.estado}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-4">
                    <button
                      onClick={() => abrirModalEditar(puerto)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                      Editar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay puertos disponibles.</p>
            )}
          </div>
        )}
        <EditarPuerto
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          puerto={puertoSeleccionado}
        />
      </div>
    </div>
  );
};

export default ListaPuertosModal;
