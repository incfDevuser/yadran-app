import React, { useState, useEffect, useMemo } from "react";
import { useSolicitudes } from "../../Context/SolicitudesContext";
import {
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiClock,
  FiUser,
  FiCalendar,
} from "react-icons/fi";
import AdminAside from "./AdminAside";

const AdminSolicitudes = () => {
  const {
    solicitudesNormales,
    solicitudesTrabajadores,
    solicitudesIntercentro,
    loadingSolicitudes,
    errorSolicitudes,
    obtenerSolicitudesNormales,
    obtenerSolicitudesTrabajadores,
    obtenerSolicitudesIntercentro,
    aprobarViaje,
    rechazarViaje,
    aprobarIntercentro,
    rechazarIntercentro,
  } = useSolicitudes();

  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [estadoFiltro, setEstadoFiltro] = useState("Pendiente");

  useEffect(() => {
    obtenerSolicitudesNormales();
    obtenerSolicitudesTrabajadores();
    obtenerSolicitudesIntercentro();
  }, []);

  const filtrarPorEstado = (solicitudes, estado) => {
    return solicitudes.filter((solicitud) => solicitud.estado === estado);
  };

  const solicitudesFiltradasNormales = useMemo(
    () => filtrarPorEstado(solicitudesNormales, estadoFiltro),
    [solicitudesNormales, estadoFiltro]
  );

  const solicitudesFiltradasTrabajadores = useMemo(
    () => filtrarPorEstado(solicitudesTrabajadores, estadoFiltro),
    [solicitudesTrabajadores, estadoFiltro]
  );

  const solicitudesFiltradasIntercentro = useMemo(
    () => filtrarPorEstado(solicitudesIntercentro, estadoFiltro),
    [solicitudesIntercentro, estadoFiltro]
  );

  const handleAprobar = async (solicitud, tipo) => {
    try {
      if (tipo === "normal") await aprobarViaje(solicitud.solicitud_id);
      else if (tipo === "trabajadores") await aprobarViaje(solicitud.solicitud_id);
      else if (tipo === "intercentro") await aprobarIntercentro(solicitud.solicitud_id);

      obtenerSolicitudesNormales();
      obtenerSolicitudesTrabajadores();
      obtenerSolicitudesIntercentro();
    } catch (error) {
      console.error("Error al aprobar la solicitud:", error);
    }
  };

  const handleRechazar = async (solicitud, tipo) => {
    try {
      if (tipo === "normal") await rechazarViaje(solicitud.solicitud_id);
      else if (tipo === "trabajadores") await rechazarViaje(solicitud.solicitud_id);
      else if (tipo === "intercentro") await rechazarIntercentro(solicitud.solicitud_id);

      obtenerSolicitudesNormales();
      obtenerSolicitudesTrabajadores();
      obtenerSolicitudesIntercentro();
    } catch (error) {
      console.error("Error al rechazar la solicitud:", error);
    }
  };

  const renderSolicitudCard = (solicitud, tipo) => (
    <div
      key={solicitud.solicitud_id}
      className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        {tipo === "trabajadores"
          ? `${solicitud.trabajador.nombre} (${solicitud.trabajador.email})`
          : solicitud.nombre_viaje}
      </h2>
      <p className="text-sm text-gray-600 mt-4 flex items-center">
        <FiUser className="mr-2" />{" "}
        {tipo === "trabajadores"
          ? `Contratista: ${solicitud.contratista.nombre}`
          : `Solicitante: ${solicitud.nombre_solicitante}`}
      </p>
      <p className="text-sm text-gray-600 flex items-center mt-2">
        <FiCalendar className="mr-2" />
        Fecha de solicitud: {new Date(solicitud.created_at).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-600 mt-2">
        <strong>Comentario:</strong> {solicitud.comentario_usuario || "Sin comentario"}
      </p>
      {tipo === "trabajadores" && (
        <p className="text-sm text-gray-600 mt-2">
          <strong>Viaje:</strong> {solicitud.viaje.nombre} - {solicitud.viaje.descripcion}
        </p>
      )}
      <div className="mt-6 flex justify-between items-center">
        <button
          className="text-blue-500 p-3 rounded-lg hover:text-blue-300 flex items-center text-lg"
          onClick={() => setSelectedSolicitud(solicitud)}
        >
          <FiEye className="mr-1" /> Ver detalles
        </button>
        {solicitud.estado === "Pendiente" && (
          <div className="flex items-center space-x-4">
            <button
              className="text-green-500 p-3 rounded-lg hover:text-green-300 flex items-center text-lg"
              onClick={() => handleAprobar(solicitud, tipo)}
            >
              <FiCheckCircle className="mr-1" /> Aprobar
            </button>
            <button
              className="text-red-500 p-3 rounded-lg hover:text-red-300 flex items-center text-lg"
              onClick={() => handleRechazar(solicitud, tipo)}
            >
              <FiXCircle className="mr-1" /> Rechazar
            </button>
          </div>
        )}
      </div>
    </div>
  );

  if (loadingSolicitudes) {
    return <div>Cargando solicitudes...</div>;
  }

  if (errorSolicitudes) {
    return <div>Error al cargar solicitudes: {errorSolicitudes}</div>;
  }

  return (
    <div className="p-6 flex gap-4">
      <AdminAside />
      <div className="flex-1 space-y-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Solicitudes de Viaje</h1>

        {/* Filtro por estado */}
        <div className="mb-6 flex items-center gap-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              estadoFiltro === "Pendiente" ? "bg-yellow-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setEstadoFiltro("Pendiente")}
          >
            Pendiente
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              estadoFiltro === "Aprobado" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setEstadoFiltro("Aprobado")}
          >
            Aprobado
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              estadoFiltro === "Rechazado" ? "bg-red-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setEstadoFiltro("Rechazado")}
          >
            Rechazado
          </button>
        </div>

        {/* Solicitudes Normales */}
        <section>
          <h2 className="text-2xl font-bold text-yellow-600 mb-4">Solicitudes Normales</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {solicitudesFiltradasNormales.map((solicitud) =>
              renderSolicitudCard(solicitud, "normal")
            )}
          </div>
        </section>

        {/* Solicitudes de Trabajadores */}
        <section>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Solicitudes de Trabajadores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {solicitudesFiltradasTrabajadores.map((solicitud) =>
              renderSolicitudCard(solicitud, "trabajadores")
            )}
          </div>
        </section>

        {/* Solicitudes Intercentro */}
        <section>
          <h2 className="text-2xl font-bold text-purple-600 mb-4">Solicitudes Intercentro</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {solicitudesFiltradasIntercentro.map((solicitud) =>
              renderSolicitudCard(solicitud, "intercentro")
            )}
          </div>
        </section>

        {/* Modal para mostrar detalles */}
        {selectedSolicitud && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg max-w-2xl w-full shadow-xl overflow-y-auto max-h-[80vh]">
              <h2 className="text-2xl font-bold mb-6">Detalles de la Solicitud</h2>
              <p>
                <strong>Estado:</strong> {selectedSolicitud.estado}
              </p>
              <p>
                <strong>Comentario:</strong> {selectedSolicitud.comentario_usuario || "N/A"}
              </p>
              <p>
                <strong>Fecha Inicio:</strong>{" "}
                {new Date(selectedSolicitud.fecha_inicio).toLocaleDateString()}
              </p>
              <p>
                <strong>Fecha Fin:</strong>{" "}
                {new Date(selectedSolicitud.fecha_fin).toLocaleDateString()}
              </p>
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setSelectedSolicitud(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSolicitudes;
