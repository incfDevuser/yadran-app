import React from 'react';
import { FaTimes, FaUsers } from 'react-icons/fa';

const PasajerosModal = ({ isOpen, onClose, participantes, nombreViaje }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center bg-purple-50">
          <h2 className="text-xl font-semibold text-purple-800 flex items-center">
            <FaUsers className="mr-2" />
            Pasajeros - {nombreViaje}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-purple-100 rounded-full transition-colors"
          >
            <FaTimes className="text-purple-800" />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-100px)]">
          {participantes.map((participante, idx) => (
            <div 
              key={idx}
              className={`mb-3 p-4 rounded-lg border ${
                participante.estado === 'Aprobado'
                  ? 'bg-green-50 border-green-200'
                  : 'bg-yellow-50 border-yellow-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {participante.nombre}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {participante.tipo}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  participante.estado === 'Aprobado'
                    ? 'bg-green-200 text-green-800'
                    : 'bg-yellow-200 text-yellow-800'
                }`}>
                  {participante.estado}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PasajerosModal;
