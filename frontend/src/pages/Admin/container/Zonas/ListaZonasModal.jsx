import React, { useEffect, useState } from "react";
import { useZonas } from "../../../../Context/ZonasContext";
import EditarZona from "./EditarZona";

const ListaZonasModal = ({ isOpen, onClose }) => {
  const { zonas, obtenerZonas, loading, error } = useZonas();
  const [zonaSeleccionada, setZonaSeleccionada] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      obtenerZonas();
    }
  }, [isOpen]);

  const abrirModalEditar = (zona) => {
    setZonaSeleccionada(zona);
    setIsEditModalOpen(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[600px] p-5 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Lista de Zonas</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            X
          </button>
        </div>
        <div>
          {loading ? (
            <p>Cargando zonas...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : zonas.length > 0 ? (
            zonas.map((zona) => (
              <div key={zona.id} className="p-4 border rounded-md shadow-sm mb-2">
                <h3>{zona.nombre_zona}</h3>
                <p>País: {zona.pais}</p>
                <p>Región: {zona.region}</p>
                <p>
                  Jurisdicción Asociada: {zona.nombre_jurisdiccion || "N/A"}
                </p>
                <p>Estado: {zona.estado_zona}</p>
                <p>Descripción: {zona.descripcion}</p>
                <button
                  onClick={() => abrirModalEditar(zona)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mt-2"
                >
                  Editar
                </button>
              </div>
            ))
          ) : (
            <p>No hay zonas disponibles.</p>
          )}
        </div>
        <EditarZona
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          zona={zonaSeleccionada}
        />
      </div>
    </div>
  );
};

export default ListaZonasModal;