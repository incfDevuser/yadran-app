import React from 'react';
import { BiBus } from 'react-icons/bi';
import { FaUser, FaTachometerAlt } from 'react-icons/fa';

const RutaCard = ({ ruta }) => {
  return (
    <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">{ruta.nombre_ruta}</h2>
        
        <div className="mb-4">
          <h3 className="text-lg font-medium text-blue-600 mb-2">
            Información del Vehículo
          </h3>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
              <BiBus className="mr-2" />
              {ruta.tipo_vehiculo}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
              <FaUser className="mr-2" />
              Capacidad: {ruta.capacidad_operacional}/{ruta.capacidad_total}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
              <FaTachometerAlt className="mr-2" />
              {ruta.velocidad_promedio} km/h
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Chofer: {ruta.nombre_chofer} ({ruta.email_chofer})
          </p>
          <p className="text-sm text-gray-600">
            Proveedor: {ruta.nombre_proveedor}
          </p>
        </div>

        <div className="border-t border-gray-200 my-4"></div>

        <div>
          <h3 className="text-lg font-medium text-blue-600 mb-2">
            Trayectos
          </h3>
          {ruta.trayectos && ruta.trayectos.length > 0 ? (
            ruta.trayectos.map((trayecto) => (
              <div key={trayecto.trayecto_id} className="mb-3 p-2 bg-gray-50 rounded">
                <p className="font-medium">
                  {trayecto.origen} → {trayecto.destino}
                </p>
                <p className="text-sm text-gray-600">
                  Duración estimada: {trayecto.duracion_estimada} minutos
                </p>
                <p className="text-sm text-gray-600">
                  Pasajeros: {trayecto.pasajeros?.length || 0}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-600">No hay trayectos asignados</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RutaCard;
