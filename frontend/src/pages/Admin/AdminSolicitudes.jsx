import React, { useState, useEffect, useMemo } from "react";
import { useSolicitudes } from "../../Context/SolicitudesContext";
import SolicitudNormalCard from "./Cards/SolicitudNormalCard";
import SolicitudTrabajadoresCard from "./Cards/SolicitudTrabajadoresCard";
import SolicitudIntercentroCard from "./Cards/SolicitudIntercentroCard";
import AdminAside from "./AdminAside";

const AdminSolicitudes = () => {
  const {
    solicitudesNormales,
    solicitudesTrabajadores,
    solicitudesIntercentro,
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

  const filtrarPorEstado = (solicitudes) =>
    solicitudes.filter(
      (s) => s.estado.toLowerCase() === estadoFiltro.toLowerCase()
    );

  const solicitudesFiltradasNormales = useMemo(
    () => filtrarPorEstado(solicitudesNormales),
    [solicitudesNormales, estadoFiltro]
  );
  const solicitudesFiltradasTrabajadores = useMemo(
    () => filtrarPorEstado(solicitudesTrabajadores),
    [solicitudesTrabajadores, estadoFiltro]
  );
  const solicitudesFiltradasIntercentro = useMemo(
    () => filtrarPorEstado(solicitudesIntercentro),
    [solicitudesIntercentro, estadoFiltro]
  );

  const aprobarViajeNormal = async (solicitud_id) => {
    try {
      await aprobarViaje(solicitud_id);
      obtenerSolicitudesNormales();
    } catch (error) {
      console.error("Error al aprobar el viaje normal:", error);
    }
  };

  const rechazarViajeNormal = async (solicitud_id) => {
    try {
      await rechazarViaje(solicitud_id);
      obtenerSolicitudesNormales();
    } catch (error) {
      console.error("Error al rechazar el viaje normal:", error);
    }
  };

  const aprobarViajeTrabajadores = async (solicitud_id) => {
    try {
      await aprobarViaje(solicitud_id);
      obtenerSolicitudesTrabajadores();
    } catch (error) {
      console.error("Error al aprobar el viaje de trabajadores:", error);
    }
  };

  const rechazarViajeTrabajadores = async (solicitud_id) => {
    try {
      await rechazarViaje(solicitud_id);
      obtenerSolicitudesTrabajadores();
    } catch (error) {
      console.error("Error al rechazar el viaje de trabajadores:", error);
    }
  };

  const aprobarViajeIntercentro = async (solicitud_id) => {
    try {
      await aprobarIntercentro(solicitud_id);
      obtenerSolicitudesIntercentro();
    } catch (error) {
      console.error("Error al aprobar el viaje intercentro:", error);
    }
  };

  const rechazarViajeIntercentro = async (solicitud_id) => {
    try {
      await rechazarIntercentro(solicitud_id);
      obtenerSolicitudesIntercentro();
    } catch (error) {
      console.error("Error al rechazar el viaje intercentro:", error);
    }
  };

  return (
    <div className="p-6 flex gap-4">
      <AdminAside />
      <div className="flex-1 space-y-8">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Solicitudes de Viaje
        </h1>
        {/* Filtro de estados */}
        <div className="mb-6 flex items-center gap-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              estadoFiltro === "Pendiente"
                ? "bg-yellow-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setEstadoFiltro("Pendiente")}
          >
            Pendiente
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              estadoFiltro === "Aprobado"
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setEstadoFiltro("Aprobado")}
          >
            Aprobado
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              estadoFiltro === "Rechazado"
                ? "bg-red-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setEstadoFiltro("Rechazado")}
          >
            Rechazado
          </button>
        </div>
        {/* Solicitudes Normales */}
        <section>
          <h2 className="text-2xl font-bold text-yellow-600 mb-4">
            Solicitudes Normales
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {solicitudesFiltradasNormales.map((solicitud) => (
              <SolicitudNormalCard
                key={solicitud.solicitud_id}
                solicitud={solicitud}
                onAprobar={() => aprobarViajeNormal(solicitud.solicitud_id)}
                onRechazar={() => rechazarViajeNormal(solicitud.solicitud_id)}
                onVerDetalles={() => setSelectedSolicitud(solicitud)}
              />
            ))}
          </div>
        </section>
        {/* Solicitudes de intercentro */}
        <section>
          <h2 className="text-2xl font-bold text-purple-600 mb-4">
            Solicitudes Intercentro
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {solicitudesFiltradasIntercentro.map((solicitud) => (
              <SolicitudIntercentroCard
                key={solicitud.solicitud_id}
                solicitud={solicitud}
                onAprobar={() =>
                  aprobarViajeIntercentro(solicitud.solicitud_id)
                }
                onRechazar={() =>
                  rechazarViajeIntercentro(solicitud.solicitud_id)
                }
                onVerDetalles={() => setSelectedSolicitud(solicitud)}
              />
            ))}
          </div>
        </section>
        {/* Solicitudes de Trabajadores */}
        <section>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Solicitudes de Trabajadores
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {solicitudesFiltradasTrabajadores.map((solicitud) => (
              <SolicitudTrabajadoresCard
                key={solicitud.solicitud_id}
                solicitud={solicitud}
                onAprobar={() =>
                  aprobarViajeTrabajadores(solicitud.solicitud_id)
                }
                onRechazar={() =>
                  rechazarViajeTrabajadores(solicitud.solicitud_id)
                }
                onVerDetalles={() => setSelectedSolicitud(solicitud)}
              />
            ))}
          </div>
        </section>
        {selectedSolicitud && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg max-w-2xl w-full shadow-xl overflow-y-auto max-h-[80vh]">
              <h2 className="text-2xl font-bold mb-6">
                Detalles de la Solicitud
              </h2>
              <p>
                <strong>Estado:</strong> {selectedSolicitud.estado}
              </p>
              <p>
                <strong>Comentario:</strong>{" "}
                {selectedSolicitud.comentario || "N/A"}
              </p>
              <hr className="my-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Información del Solicitante
              </h3>
              {selectedSolicitud.centro_origen_id &&
              selectedSolicitud.centro_destino_id ? (
                <>
                  <p>
                    <strong>Nombre:</strong> {selectedSolicitud.nombre || "N/A"}
                  </p>
                  <p>
                    <strong>RUT:</strong> {selectedSolicitud.rut || "N/A"}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedSolicitud.email || "N/A"}
                  </p>
                  <p>
                    <strong>Fecha de Nacimiento:</strong>{" "}
                    {selectedSolicitud.fecha_nacimiento_solicitante
                      ? (() => {
                          const isoDate =
                            selectedSolicitud.fecha_nacimiento_solicitante.substring(
                              0,
                              10
                            );
                          const [year, month, day] = isoDate.split("-");
                          return `${day}-${month}-${year}`;
                        })()
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Contacto:</strong>{" "}
                    {selectedSolicitud.contacto || "N/A"}
                  </p>
                  <p>
                    <strong>Lancha:</strong>{" "}
                    {selectedSolicitud.lancha_nombre || "N/A"}
                  </p>
                </>
              ) : selectedSolicitud.trabajador ? (
                <>
                  <p>
                    <strong>Nombre:</strong>{" "}
                    {selectedSolicitud.trabajador.nombre || "N/A"}
                  </p>
                  <p>
                    <strong>RUT:</strong>{" "}
                    {selectedSolicitud.trabajador.rut || "N/A"}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {selectedSolicitud.trabajador.email || "N/A"}
                  </p>
                  <p>
                    <strong>Fecha de Nacimiento:</strong>{" "}
                    {selectedSolicitud.fecha_nacimiento_solicitante
                      ? (() => {
                          const isoDate =
                            selectedSolicitud.fecha_nacimiento_solicitante.substring(
                              0,
                              10
                            );
                          const [year, month, day] = isoDate.split("-");
                          return `${day}-${month}-${year}`;
                        })()
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Contacto:</strong>{" "}
                    {selectedSolicitud.trabajador.contacto || "N/A"}
                  </p>
                  <p>
                    <strong>Contratista:</strong>{" "}
                    {selectedSolicitud.contratista?.nombre || "N/A"}
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>RUT:</strong>{" "}
                    {selectedSolicitud.rut_solicitante || "N/A"}
                  </p>
                  <p>
                    <strong>Empresa:</strong>{" "}
                    {selectedSolicitud.empresa_solicitante || "N/A"}
                  </p>
                  <p>
                    <strong>Cargo:</strong>{" "}
                    {selectedSolicitud.cargo_solicitante || "N/A"}
                  </p>
                  <p>
                    <strong>Contacto:</strong>{" "}
                    {selectedSolicitud.contacto_solicitante || "N/A"}
                  </p>
                  <p>
                    <strong>Fecha de Nacimiento:</strong>{" "}
                    {selectedSolicitud.fecha_nacimiento_solicitante
                      ? (() => {
                          const isoDate =
                            selectedSolicitud.fecha_nacimiento_solicitante.substring(
                              0,
                              10
                            );
                          const [year, month, day] = isoDate.split("-");
                          return `${day}-${month}-${year}`;
                        })()
                      : "N/A"}
                  </p>
                </>
              )}
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
