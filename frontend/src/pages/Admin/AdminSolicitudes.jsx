import React, { useState } from "react";
import { useSolicitudes } from "../../Context/SolicitudesContext";
import {
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiClock,
  FiUser,
  FiCalendar,
} from "react-icons/fi";

const AdminSolicitudes = () => {
  const {
    solicitudes,
    loadingSolicitudes,
    errorSolicitudes,
    aprobarSolicitud,
    rechazarSolicitud,
  } = useSolicitudes();
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);

  if (loadingSolicitudes) {
    return <div>Cargando solicitudes...</div>;
  }
  if (errorSolicitudes) {
    return <div>Error al cargar solicitudes: {errorSolicitudes}</div>;
  }

  // Filtrar solicitudes por estado
  const solicitudesPendientes = solicitudes.filter(
    (solicitud) => solicitud.estado === "Pendiente"
  );
  const solicitudesAprobadas = solicitudes.filter(
    (solicitud) => solicitud.estado === "Aprobado"
  );
  const solicitudesRechazadas = solicitudes.filter(
    (solicitud) => solicitud.estado === "Rechazado"
  );

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

  const renderSolicitudCard = (solicitud, estado) => (
    <div
      key={solicitud.solicitud_id}
      className="bg-white shadow-lg rounded-lg p-8 hover:shadow-xl transition-shadow duration-300"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        {solicitud.nombre_viaje}
      </h2>
      <p className="text-sm text-gray-600 mt-4 flex items-center">
        <FiUser className="mr-2" /> Solicitante: {solicitud.nombre_solicitante}
      </p>
      <p className="text-sm text-gray-600 flex items-center mt-2">
        <FiCalendar className="mr-2" />
        Fecha de solicitud:{" "}
        {new Date(solicitud.created_at).toLocaleDateString()}
      </p>
      <div className="mt-6 flex justify-between items-center">
        <button
          className="text-blue-500 p-3 rounded-lg hover:text-blue-300 flex items-center text-lg"
          onClick={() => handleVerDetalles(solicitud)}
        >
          <FiEye className="mr-1" /> Ver detalles
        </button>
        {estado === "Pendiente" && (
          <div className="flex items-center space-x-4">
            <button
              className="text-green-500 p-3 rounded-lg hover:text-green-300 flex items-center text-lg"
              onClick={() => handleAprobar(solicitud.solicitud_id)}
            >
              <FiCheckCircle className="mr-1" /> Aprobar
            </button>
            <button
              className="text-red-500 p-3 rounded-lg hover:text-red-300 flex items-center text-lg"
              onClick={() => handleRechazar(solicitud.solicitud_id)}
            >
              <FiXCircle className="mr-1" /> Rechazar
            </button>
            a
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-2">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
        <FiClock className="inline-block mr-2 text-yellow-600" />
        Solicitudes de Viaje
      </h1>
      {/* Sección de Solicitudes Pendientes */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-yellow-600 mb-4">
          <FiClock className="inline-block mr-2" />
          Solicitudes Pendientes
        </h2>
        {solicitudesPendientes.length === 0 ? (
          <p>No hay solicitudes pendientes.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {solicitudesPendientes.map((solicitud) =>
              renderSolicitudCard(solicitud, "Pendiente")
            )}
          </div>
        )}
      </div>
      {/* Sección de Solicitudes Aprobadas */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          <FiCheckCircle className="inline-block mr-2" />
          Solicitudes Aprobadas
        </h2>
        {solicitudesAprobadas.length === 0 ? (
          <p>No hay solicitudes aprobadas.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {solicitudesAprobadas.map((solicitud) =>
              renderSolicitudCard(solicitud, "Aprobado")
            )}
          </div>
        )}
      </div>
      {/* Sección de Solicitudes Rechazadas */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          <FiXCircle className="inline-block mr-2" />
          Solicitudes Rechazadas
        </h2>
        {solicitudesRechazadas.length === 0 ? (
          <p>No hay solicitudes rechazadas.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {solicitudesRechazadas.map((solicitud) =>
              renderSolicitudCard(solicitud, "Rechazado")
            )}
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
            <p>
              <strong>Solicitante:</strong> {selectedSolicitud.nombre_solicitante}
            </p>
            <p>
              <strong>Email:</strong> {selectedSolicitud.email_solicitante}
            </p>
            <p>
              <strong>Comentario:</strong>{" "}
              {selectedSolicitud.comentario_usuario}
            </p>
            <p>
              <strong>Estado:</strong> {selectedSolicitud.estado}
            </p>
            <p>
              <strong>Fecha de Inicio:</strong>{" "}
              {new Date(selectedSolicitud.fecha_inicio).toLocaleDateString()}
            </p>
            <p>
              <strong>Fecha de Fin:</strong>{" "}
              {new Date(selectedSolicitud.fecha_fin).toLocaleDateString()}
            </p>
            <p>
              <strong>Fecha de Creación:</strong>{" "}
              {new Date(selectedSolicitud.created_at).toLocaleDateString()}
            </p>
            <div className="mt-6 text-right">
              <button
                onClick={handleCloseModal}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
              >
                <FiXCircle className="mr-2" />
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
