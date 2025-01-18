import React from "react";
import { FaEnvelope, FaCircle } from "react-icons/fa";

const DetallePontonModal = ({ pontones = [], closeModal }) => {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-3/4 max-h-[80vh] overflow-y-auto shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Detalles de Pontones</h2>
        {pontones.length > 0 ? (
          pontones.map((ponton) => (
            <div key={ponton.ponton_id} className="mb-6 border-b pb-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <FaCircle className="text-purple-500" />
                {ponton.nombre_ponton}
              </h3>
              <h4 className="text-md font-semibold mt-2">Usuarios:</h4>
              <ul className="space-y-2 mt-2">
                {ponton.personas.map((persona) => (
                  <li
                    key={persona.persona_id}
                    className="flex items-center gap-3 border p-2 rounded-lg shadow-sm"
                  >
                    <div>
                      <p className="font-semibold">{persona.nombre}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <FaEnvelope />
                        {persona.email}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No hay pontones asociados a este movimiento.</p>
        )}
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
          onClick={closeModal}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default DetallePontonModal;
