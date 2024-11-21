import React from "react";
import { FiCheckCircle, FiXCircle, FiEye } from "react-icons/fi";

const SolicitudIntercentroCard = ({ solicitud, onAprobar, onRechazar, onVerDetalles }) => {
  const {
    solicitud_id,
    nombre,
    email,
    estado,
    centro_origen_nombre,
    centro_destino_nombre,
    lancha_nombre,
    fecha,
    comentario,
  } = solicitud;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-semibold text-gray-800">{nombre} - ({email})</h2>
      <p className="text-sm text-gray-600 mt-2">Centro Origen: {centro_origen_nombre}</p>
      <p className="text-sm text-gray-600 mt-2">Centro Destino: {centro_destino_nombre}</p>
      <p className="text-sm text-gray-600 mt-2">Lancha: {lancha_nombre}</p>
      <p className="text-sm text-gray-600 mt-2">Fecha: {new Date(fecha).toLocaleDateString()}</p>
      <p className="text-sm text-gray-600 mt-2">Comentario: {comentario || "Sin comentario"}</p>
      <div>
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
    </div>
  );
};

export default SolicitudIntercentroCard;
