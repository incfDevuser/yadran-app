import React from "react";
import { FaBus, FaUsers, FaUserPlus, FaUserFriends, FaEdit } from "react-icons/fa";

const VehiculoCard = ({ vehiculo, onVerTripulantes, onAgregarTripulante, onVerPasajeros, onEditar }) => {
  const {
    tipo_vehiculo,
    tipo_servicio,
    capacidad_total,
    capacidad_operacional,
    estado,
    tripulantes,
    nombre_chofer,
  } = vehiculo;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <FaBus className="text-3xl text-purple-600" />
          <div>
            <h3 className="text-xl font-bold text-gray-800">{tipo_vehiculo}</h3>
            <p className="text-purple-600 font-medium text-sm">{tipo_servicio}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEditar(vehiculo)}
            className="p-2 text-purple-600 hover:text-purple-800 transition-colors"
            title="Editar vehículo"
          >
            <FaEdit className="text-xl" />
          </button>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              estado === "Activo"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {estado}
          </span>
        </div>
      </div>

      <div className="mb-6 space-y-3 bg-gray-50 p-4 rounded-lg">
        <p className="text-gray-700 flex items-center gap-2">
          <FaUsers className="text-purple-500" />
          <span className="font-medium">Capacidad Total:</span>
          <span className="ml-1">{capacidad_total}</span>
        </p>
        <p className="text-gray-700 flex items-center gap-2">
          <FaUserFriends className="text-purple-500" />
          <span className="font-medium">Capacidad Operacional:</span>
          <span className="ml-1">{capacidad_operacional}</span>
        </p>
        <p className="text-gray-700 flex items-center gap-2">
          <FaUserFriends className="text-purple-500" />
          <span className="font-medium">Chofer Asignado:</span>
          <span className="ml-1">{nombre_chofer || 'Sin chofer asignado'}</span>
        </p>
      </div>

      <div className="flex flex-col gap-3 font-medium">
        <div className="flex justify-between gap-3">
          <button
            className="flex-1 px-4 py-2.5 bg-white border-2 border-purple-600 text-purple-700 rounded-lg hover:bg-purple-50 transition-all duration-300 flex items-center justify-center gap-2"
            onClick={onVerTripulantes}
          >
            <FaUsers className="text-sm" />
            <span>Ver Tripulación ({tripulantes?.length || 0})</span>
          </button>
          <button
            className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
            onClick={onAgregarTripulante}
          >
            <FaUserPlus className="text-sm" />
            <span>Agregar Tripulación</span>
          </button>
        </div>
        <button 
          className="w-full px-4 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-2"
          onClick={() => onVerPasajeros(vehiculo.id)}
        >
          <FaUsers className="text-sm" />
          <span>Ver Pasajeros</span>
        </button>
      </div>
    </div>
  );
};

export default VehiculoCard;
