import React, { useState } from "react";
import { BiBus } from "react-icons/bi";
import {
  FaUser,
  FaTachometerAlt,
  FaMapMarkedAlt,
  FaUserTie,
} from "react-icons/fa";
import { MdAirlineSeatReclineExtra } from "react-icons/md";

const PasajerosModal = ({ isOpen, onClose, trayecto }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-lg">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              Pasajeros: {trayecto.origen} → {trayecto.destino}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="overflow-y-auto max-h-[60vh] p-4">
          {trayecto.pasajeros?.map((pasajero, index) => (
            <div key={index} className="py-2 border-b last:border-0">
              <div className="flex justify-between items-center">
                <span>{pasajero.nombre}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    pasajero.estado === "Aprobado"
                      ? "bg-green-100 text-green-800"
                      : pasajero.estado === "Pendiente"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {pasajero.estado}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RutaCard = ({ ruta }) => {
  const [selectedTrayecto, setSelectedTrayecto] = useState(null);

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg mb-4 overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="p-4">
        <div className="flex flex-col mb-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800 tracking-tight">
              {ruta.nombre_ruta}
            </h2>
            <span
              className={`px-3 py-0.5 rounded-full text-xs font-medium ${
                ruta.estado_vehiculo === "Activo"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {ruta.estado_vehiculo}
            </span>
          </div>
          <p className="text-md font-semibold mt-1">
            Trayecto Asociado:{" "}
            <span className="text-gray-600">
              {ruta.trayectos[0]?.origen} - {ruta.trayectos[0]?.destino}
            </span>
          </p>
        </div>

        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 mb-4">
          <h3 className="text-base font-semibold text-blue-700 mb-3 flex items-center">
            <BiBus className="mr-2" />
            Información del Vehículo <span className="text-black ml-4">{ruta.tipo_vehiculo}</span>
          </h3>

          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="flex items-center space-x-2 bg-blue-50 p-2 rounded-lg">
              <MdAirlineSeatReclineExtra className="text-lg text-blue-600" />
              <div className="text-sm">
                <p className="text-xs text-gray-500">Cap.</p>
                <p className="font-medium">
                  {ruta.capacidad_operacional}/{ruta.capacidad_total}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 bg-blue-50 p-2 rounded-lg">
              <FaTachometerAlt className="text-lg text-blue-600" />
              <div className="text-sm">
                <p className="text-xs text-gray-500">Vel.</p>
                <p className="font-medium">{ruta.velocidad_promedio}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 bg-blue-50 p-2 rounded-lg">
              <FaUserTie className="text-lg text-blue-600" />
              <div className="text-sm truncate">
                <p className="text-xs text-gray-500">Chofer</p>
                <p className="font-medium truncate">{ruta.nombre_chofer}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-medium text-blue-600">
            Informacion del Trayecto
          </h3>
          {ruta.trayectos && ruta.trayectos.length > 0 ? (
            ruta.trayectos.map((trayecto) => (
              <div
                key={trayecto.trayecto_id}
                className="p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
              >
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <p className="font-medium">
                      {trayecto.origen} → {trayecto.destino}
                    </p>
                    <p className="text-xs text-gray-600">
                      {trayecto.duracion_estimada} min
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedTrayecto(trayecto)}
                    className="px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full text-xs"
                  >
                    Ver pasajeros
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-600">No hay trayectos</p>
          )}
        </div>
      </div>

      <PasajerosModal
        isOpen={!!selectedTrayecto}
        onClose={() => setSelectedTrayecto(null)}
        trayecto={selectedTrayecto || {}}
      />
    </div>
  );
};

export default RutaCard;
