import React from "react";
import GmailIcon from "../../Icons/GmailIcon";

const SolicitudCard = ({ solicitud }) => {
  const {
    solicitud_id,
    estado,
    fecha_inicio,
    fecha_fin,
    comentario_contratista,
    trabajador,
    viaje,
  } = solicitud;

  const formatearFecha = (fecha) =>
    new Date(fecha).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="border border-gray-200 rounded-lg shadow p-4 bg-white hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{trabajador.nombre}</h3>
        <span
          className={`px-3 py-1 text-sm font-bold rounded-full ${
            estado === "Aprobado"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {estado}
        </span>
      </div>
      <div className="mt-2 space-y-2">
        <p className="text-sm text-gray-700 flex gap-2 items-center">
          <GmailIcon className="text-red-500 w-5 h-5" />
          {trabajador.email}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Viaje:</span> {viaje.nombre} - {viaje.descripcion}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Duración:</span> Desde {formatearFecha(fecha_inicio)} hasta {formatearFecha(fecha_fin)}
        </p>
        {comentario_contratista && (
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Comentario:</span> {comentario_contratista}
          </p>
        )}
      </div>
    </div>
  );
};

export default SolicitudCard;
