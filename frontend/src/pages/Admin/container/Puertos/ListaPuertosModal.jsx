import React, { useEffect } from "react";
import { usePuertos } from "../../../../Context/PuertosContext";

const ListaPuertosModal = ({ isOpen, onClose }) => {
  const { puertos, obtenerPuertos, loading } = usePuertos();

  useEffect(() => {
    if (isOpen) {
      obtenerPuertos();
    }
  }, [isOpen]);
  
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
        ) : (
          <div>
            {puertos.length > 0 ? (
              puertos.map((puerto) => (
                <div
                  key={puerto.id}
                  className="p-4 border rounded-md shadow-sm mb-2"
                >
                  <h3 className="font-bold">{puerto.nombre_puerto}</h3>
                  <p>Ubicación: {puerto.ubicacion_puerto}</p>
                  <p>Localidad: {puerto.localidad}</p>
                  <p>Estado: {puerto.estado}</p>
                </div>
              ))
            ) : (
              <p>No hay puertos disponibles.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaPuertosModal;
