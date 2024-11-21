import React from "react";
import { FiCheckCircle, FiXCircle, FiEye, FiCalendar } from "react-icons/fi";

const SolicitudTrabajadoresCard = ({ solicitud, onAprobar, onRechazar, onVerDetalles }) => {
  const {
    solicitud_id,
    estado,
    trabajador,
    contratista,
    viaje,
    comentario_usuario,
    fecha_inicio,
    fecha_fin,
  } = solicitud;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-semibold text-gray-800">{trabajador.nombre} ({trabajador.email})</h2>
      <p className="text-sm text-gray-600 mt-2">Viaje: {viaje.nombre} - {viaje.descripcion}</p>
      <p className="text-sm text-gray-600 mt-2">Contratista: {contratista.nombre}</p>
      <p className="text-sm text-gray-600 mt-2">Comentario: {comentario_usuario || "Sin comentario"}</p>
      <p className="text-sm text-gray-600 flex items-center mt-2">
        <FiCalendar className="mr-2" />
        Duración: {new Date(fecha_inicio).toLocaleDateString()} - {new Date(fecha_fin).toLocaleDateString()}
      </p>
      {estado.toLowerCase() === "pendiente" && (
        <div className="flex items-center space-x-4 mt-4">
          <button onClick={() => onAprobar(solicitud_id)} className="text-green-500 flex items-center">
            <FiCheckCircle className="mr-1" /> Aprobar
          </button>
          <button onClick={() => onRechazar(solicitud_id)} className="text-red-500 flex items-center">
            <FiXCircle className="mr-1" /> Rechazar
          </button>
        </div>
      )}
      <button
        onClick={() => onVerDetalles(solicitud)}
        className="mt-4 text-blue-500 flex items-center"
      >
        <FiEye className="mr-1" /> Ver detalles
      </button>
    </div>
  );
};

export default SolicitudTrabajadoresCard;
