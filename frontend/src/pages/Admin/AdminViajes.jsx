import React, { useState } from "react";
import AdminAside from "./AdminAside";
import { useViajes } from "../../Context/ViajesContext";

const AdminViajes = () => {
  const { viajes, loading, error } = useViajes();
  const [selectedViaje, setSelectedViaje] = useState(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-lg text-gray-500">Cargando viajes...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-lg text-red-500">
          Error al cargar los viajes: {error}
        </div>
      </div>
    );
  }
  const handleOpenModal = (viaje) => {
    setSelectedViaje(viaje);
  };
  const handleCloseModal = () => {
    setSelectedViaje(null);
  };
  return (
    <div className="flex w-full h-full mt-11">
      <AdminAside />
      <main className="flex-1 p-5">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
          Administración de Viajes
        </h1>
        <div className="mt-8">
          <h1 className="font-bold text-xl text-gray-700 mb-4">
            Lista de Viajes <span className="text-blue-600">Totales</span>
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {viajes.map((viaje) => (
              <div
                key={viaje.id}
                className="flex flex-col bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow border border-gray-200 p-6 cursor-pointer"
                onClick={() => handleOpenModal(viaje)}
              >
                {/* Información del viaje */}
                <div className="mb-4">
                  <p className="font-bold text-xl text-gray-900 mb-2">
                    {viaje.nombre}
                  </p>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    {viaje.descripcion}
                  </p>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Ruta:{" "}
                    <span className="text-blue-600">{viaje.nombre_ruta}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Creado el: {new Date(viaje.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button className="mt-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Ver Trayectos
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Lista de viajes rechazados */}
        <div className="mt-8">
          <h1 className="font-bold text-xl text-gray-700 mb-4">
            Lista de Viajes <span className="text-red-600">Cancelados</span>
          </h1>
          {/* Aca renderizar cada viaje que esta cancelado */}
        </div>
        {/* Modal para mostrar los trayectos */}
        {selectedViaje && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg max-w-2xl w-full shadow-xl overflow-y-auto max-h-[80vh]">
              <h2 className="text-2xl font-bold mb-6">
                Trayectos del Viaje: {selectedViaje.nombre}
              </h2>

              <div className="space-y-4">
                {selectedViaje.trayectos.map((trayecto) => (
                  <div
                    key={trayecto.id}
                    className="border border-gray-300 rounded-lg p-4 bg-gray-50"
                  >
                    <p className="text-lg">Origen: {trayecto.origen}</p>
                    <p className="text-lg">Destino: {trayecto.destino}</p>
                    <p className="text-lg">
                      Duración Estimada: {trayecto.duracion_estimada} minutos
                    </p>
                    <p className="text-lg">
                      Vehículo: {trayecto.nombre_vehiculo}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-right">
                <button
                  onClick={handleCloseModal}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminViajes;
