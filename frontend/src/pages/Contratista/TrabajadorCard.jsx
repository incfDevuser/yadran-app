import React from "react";
import GmailIcon from "../../Icons/GmailIcon";
import WspIcon from "../../Icons/WspIcon";

const TrabajadorCard = ({ trabajador }) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-md p-6 bg-white hover:shadow-lg hover:scale-105 transition-transform duration-300">
      {/* Información del trabajador */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">{trabajador.trabajador_nombre}</h3>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Identificación:</span> {trabajador.identificacion}
        </p>
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <GmailIcon className="text-red-500 w-6 h-6" aria-label="Correo electrónico" />
          <span>{trabajador.trabajador_email}</span>
        </p>
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <WspIcon className="text-green-500 w-6 h-6" aria-label="Número de WhatsApp" />
          <span>{trabajador.telefono}</span>
        </p>
      </div>
    </div>
  );
};

export default TrabajadorCard;

