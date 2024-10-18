import React, { useState } from "react";
import { useSolicitudes } from "../../Context/SolicitudesContext";

const AdminSolicitudes = () => {
  const { solicitudes, loadingSolicitudes, errorSolicitudes, aprobarSolicitud, rechazarSolicitud } = useSolicitudes();
  const [selectedSolicitud, setSelectedSolicitud] = useState(null); // Estado para manejar la solicitud seleccionada

  if (loadingSolicitudes) {
    return <div>Cargando solicitudes...</div>;
  }

  if (errorSolicitudes) {
    return <div>Error al cargar solicitudes: {errorSolicitudes}</div>;
  }

  // Filtrar solicitudes por estado
  const solicitudesPendientes = solicitudes.filter(solicitud => solicitud.estado === "Pendiente");
  const solicitudesAprobadas = solicitudes.filter(solicitud => solicitud.estado === "Aprobado");
  const solicitudesRechazadas = solicitudes.filter(solicitud => solicitud.estado === "Rechazado");

  const handleVerDetalles = (solicitud) => {
    setSelectedSolicitud(solicitud);
  };

  const handleCloseModal = () => {
    setSelectedSolicitud(null);
  };

  const handleAprobar = (id) => {
    aprobarSolicitud(id);
  };

  const handleRechazar = (id) => {
    rechazarSolicitud(id);
  };

  return (
    <div>
      <h1 className="text-xl font-extrabold text-gray-800">Solicitudes de Viaje</h1>

      {/* Sección de Solicitudes Pendientes */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-yellow-600 mb-4">Solicitudes Pendientes</h2>
        {solicitudesPendientes.length === 0 ? (
          <p>No hay solicitudes pendientes.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solicitudesPendientes.map((solicitud) => (
              <div key={solicitud.id} className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-bold">{solicitud.nombre_viaje}</h2>
                <p>Usuario: {solicitud.nombre_usuario}</p>
                <p>Fecha de solicitud: {new Date(solicitud.created_at).toLocaleDateString()}</p>
                <div className="mt-4 flex justify-around">
                  <button
                    className=" text-blue-500  p-2 rounded-lg hover:text-blue-300"
                    onClick={() => handleVerDetalles(solicitud)}
                  >
                    Ver detalles
                  </button>
                  <div>
                    <button
                      className="text-green-500 p-2 rounded-lg hover:text-green-300"
                      onClick={() => handleAprobar(solicitud.id)}
                    >
                      Aprobar
                    </button>
                    <button
                      className="text-red-500 p-2 rounded-lg hover:text-red-300 ml-2"
                      onClick={() => handleRechazar(solicitud.id)}
                    >
                      Rechazar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sección de Solicitudes Aprobadas */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-green-600 mb-4">Solicitudes Aprobadas</h2>
        {solicitudesAprobadas.length === 0 ? (
          <p>No hay solicitudes aprobadas.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solicitudesAprobadas.map((solicitud) => (
              <div key={solicitud.id} className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-bold">{solicitud.nombre_viaje}</h2>
                <p>Usuario: {solicitud.nombre_usuario}</p>
                <p>Fecha de solicitud: {new Date(solicitud.created_at).toLocaleDateString()}</p>
                <div className="mt-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    onClick={() => handleVerDetalles(solicitud)}
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sección de Solicitudes Rechazadas */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-red-600">Solicitudes Rechazadas</h2>
        {solicitudesRechazadas.length === 0 ? (
          <p>No hay solicitudes rechazadas.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solicitudesRechazadas.map((solicitud) => (
              <div key={solicitud.id} className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-bold">{solicitud.nombre_viaje}</h2>
                <p>Usuario: {solicitud.nombre_usuario}</p>
                <p>Fecha de solicitud: {new Date(solicitud.created_at).toLocaleDateString()}</p>
                <div className="mt-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    onClick={() => handleVerDetalles(solicitud)}
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal para mostrar detalles */}
      {selectedSolicitud && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg max-w-2xl w-full shadow-xl overflow-y-auto max-h-[80vh]">
            <h2 className="text-2xl font-bold mb-6">
              Detalles de la Solicitud: {selectedSolicitud.nombre_viaje}
            </h2>
            <p><strong>Usuario:</strong> {selectedSolicitud.nombre_usuario}</p>
            <p><strong>Comentario:</strong> {selectedSolicitud.comentario_usuario}</p>
            <p><strong>Estado:</strong> {selectedSolicitud.estado}</p>
            <p><strong>Fecha de Inicio:</strong> {new Date(selectedSolicitud.fecha_inicio).toLocaleDateString()}</p>
            <p><strong>Fecha de Fin:</strong> {new Date(selectedSolicitud.fecha_fin).toLocaleDateString()}</p>
            <p><strong>Fecha de Creación:</strong> {new Date(selectedSolicitud.created_at).toLocaleDateString()}</p>
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
    </div>
  );
};

export default AdminSolicitudes;
