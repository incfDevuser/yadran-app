import React from "react";
import { FaTimes, FaUserTie } from "react-icons/fa";

const TripulantesModal = ({ show, handleClose, vehiculo }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-md">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
             Tripulantes del Vehículo
          </h2>
          <button
            onClick={handleClose}
            className="text-red-500 hover:text-red-700 text-xl"
          >
            <FaTimes />
          </button>
        </div>
        <div className="mt-4 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {vehiculo?.tripulantes?.length > 0 ? (
            <ul className="space-y-4">
              {vehiculo.tripulantes.map((tripulante) => (
                <li
                  key={tripulante.id}
                  className="border rounded-lg p-4 bg-gray-50 shadow-sm"
                >
                  <p className="text-sm text-gray-600">
                    <strong>Nombre:</strong> {tripulante.nombre_tripulante}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>RUT:</strong> {tripulante.rut_tripulante}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Empresa:</strong> {tripulante.empresa}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Cargo:</strong> {tripulante.cargo}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-gray-500">
              <p>No hay tripulantes asociados a este vehículo.</p>
            </div>
          )}
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={handleClose}
            className="bg-black text-white font-semibold py-2 px-4 rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripulantesModal;
