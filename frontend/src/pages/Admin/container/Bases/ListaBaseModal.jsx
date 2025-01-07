import React, { useEffect } from "react";
import { useBases } from "../../../../Context/BasesContext";

const ListaBaseModal = ({ isOpen, onClose }) => {
  const { bases, obtenerBases, loading, error } = useBases();

  useEffect(() => {
    if (isOpen) {
      obtenerBases();
    }
  }, [isOpen]);

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[600px] p-5 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Lista de Bases</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            X
          </button>
        </div>
        {loading ? (
          <p>Cargando bases...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div>
            {bases.length > 0 ? (
              bases.map((base) => (
                <div
                  key={base.id}
                  className="p-4 border rounded-md shadow-sm mb-2"
                >
                  <h3 className="font-bold">{base.nombre_base}</h3>
                  <p>Jefe: {base.jefe_base || "No especificado"}</p>
                  <p>
                    Pontón Asociado: {base.nombre_ponton || "No especificado"}
                  </p>
                </div>
              ))
            ) : (
              <p>No hay bases disponibles.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaBaseModal;
