import React from "react";
import { FaUser, FaMapMarkerAlt, FaShip, FaCalendarAlt } from "react-icons/fa";
import GmailIcon from "../../Icons/GmailIcon";

const SolicitudIntercentroCard = ({ solicitud, onCancel }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-gray-800">
          {solicitud.trabajador.nombre}
        </h3>
        <span
          className={`px-2 py-1 rounded text-sm ${
            solicitud.estado === "aprobado"
              ? "bg-green-100 text-green-800"
              : solicitud.estado === "rechazado"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {solicitud.estado.charAt(0).toUpperCase() + solicitud.estado.slice(1)}
        </span>
      </div>
      <p className="text-gray-500 text-sm mb-4 flex gap-2">
        <GmailIcon className="w-5 h-5" />
        {solicitud.trabajador.email}
      </p>
      <div className="text-gray-700 space-y-2">
        <p>
          <FaMapMarkerAlt className="inline mr-2 text-blue-500" />
          <strong>Centro Origen:</strong> {solicitud.centro_origen}
        </p>
        <p>
          <FaMapMarkerAlt className="inline mr-2 text-green-500" />
          <strong>Centro Destino:</strong> {solicitud.centro_destino}
        </p>
        <p>
          <FaShip className="inline mr-2 text-purple-500" />
          <strong>Lancha:</strong> {solicitud.lancha}
        </p>
        <p>
          <FaCalendarAlt className="inline mr-2 text-yellow-500" />
          <strong>Fecha Movimiento:</strong>{" "}
          {new Date(solicitud.fecha_movimiento).toLocaleDateString()}
        </p>
        <p>
          <strong>Comentario:</strong> {solicitud.comentario}
        </p>
      </div>
      {solicitud.estado === "pendiente" && (
        <div className="mt-4">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition"
            onClick={() => onCancel(solicitud.solicitud_id)}
          >
            Cancelar Solicitud
          </button>
        </div>
      )}
    </div>
  );
};

export default SolicitudIntercentroCard;
