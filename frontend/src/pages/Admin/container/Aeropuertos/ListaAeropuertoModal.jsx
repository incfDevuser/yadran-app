import React, { useEffect, useState } from "react";
import { useAeropuertos } from "../../../../Context/AeropuertosContext";
import EditarAeropuerto from "./EditarAeropuerto";

const ListaAeropuertoModal = ({ isOpen, onClose }) => {
  const { aeropuertos, obtenerAeropuertos, loading, error } = useAeropuertos();
  const [aeropuertoSeleccionado, setAeropuertoSeleccionado] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      obtenerAeropuertos();
    }
  }, [isOpen]);

  const abrirModalEditar = (aeropuerto) => {
    setAeropuertoSeleccionado(aeropuerto);
    setIsEditModalOpen(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[600px] p-5 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Lista de Aeropuertos</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-lg font-bold"
          >
            X
          </button>
        </div>
        {loading ? (
          <p>Cargando aeropuertos...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div>
            {aeropuertos.length > 0 ? (
              aeropuertos.map((aeropuerto) => (
                <div
                  key={aeropuerto.id}
                  className="p-4 border rounded-md shadow-sm mb-2 bg-gray-100"
                >
                  <h3 className="font-bold">{aeropuerto.nombre_aeropuerto}</h3>
                  <p>Ubicación: {aeropuerto.ubicacion_aeropuerto}</p>
                  <p>Localidad: {aeropuerto.localidad}</p>
                  <p>Estado: {aeropuerto.estado}</p>
                  <button
                    onClick={() => abrirModalEditar(aeropuerto)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Editar
                  </button>
                </div>
              ))
            ) : (
              <p>No hay aeropuertos disponibles.</p>
            )}
          </div>
        )}
        <EditarAeropuerto
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          aeropuerto={aeropuertoSeleccionado}
        />
      </div>
    </div>
  );
};

export default ListaAeropuertoModal;
