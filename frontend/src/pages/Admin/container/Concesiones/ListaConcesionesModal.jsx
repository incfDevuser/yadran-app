import React, { useEffect } from "react";
import { useConcesion } from "../../../../Context/ConcesionesContext";

const ListaConcesionesModal = ({ isOpen, onClose }) => {
  const { concesiones, obtenerConcesiones, loading } = useConcesion();

  useEffect(() => {
    if (isOpen) {
      obtenerConcesiones();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[600px] p-5 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Lista de Concesiones</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            X
          </button>
        </div>
        {loading ? (
          <p>Cargando concesiones...</p>
        ) : concesiones.length > 0 ? (
          concesiones.map((concesion) => (
            <div
              key={concesion.id}
              className="p-4 border rounded-md shadow-sm mb-2"
            >
              <h3>{concesion.nombre_concesion}</h3>
              <p>Vigencia: {concesion.vigencia}</p>
              <p>Zona Asociada: {concesion.nombre_zona}</p>
            </div>
          ))
        ) : (
          <p>No hay concesiones disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default ListaConcesionesModal;
