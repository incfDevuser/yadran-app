import React, {useEffect} from "react";
import { useAeropuertos } from "../../../../Context/AeropuertosContext";

const ListaAeropuertoModal = ({ isOpen, onClose }) => {
  const { aeropuertos, obtenerAeropuertos,  loading } = useAeropuertos();

    useEffect(() => {
      if (isOpen) {
        obtenerAeropuertos();
      }
    }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[600px] p-5 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Lista de Aeropuertos</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            X
          </button>
        </div>
        {loading ? (
          <p>Cargando aeropuertos...</p>
        ) : (
          <div>
            {aeropuertos.length > 0 ? (
              aeropuertos.map((aeropuerto) => (
                <div
                  key={aeropuerto.id}
                  className="p-4 border rounded-md shadow-sm mb-2"
                >
                  <h3 className="font-bold">{aeropuerto.nombre_aeropuerto}</h3>
                  <p>Ubicación: {aeropuerto.ubicacion_aeropuerto}</p>
                  <p>Localidad: {aeropuerto.localidad}</p>
                  <p>Estado: {aeropuerto.estado}</p>
                </div>
              ))
            ) : (
              <p>No hay aeropuertos disponibles.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaAeropuertoModal;
