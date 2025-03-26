import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaIdCard, FaKey } from "react-icons/fa";

const ChoferCard = ({ chofer }) => {
  const { nombre, telefono, email, password_inicial } = chofer;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-all duration-300 border border-gray-200 max-w-xs">
      <div className="flex items-center mb-3">
        <div className="bg-gray-100 p-2 rounded-full">
          <FaIdCard className="text-blue-500/70 text-lg" />
        </div>
        <div className="ml-3">
          <h3 className="text-base font-semibold text-gray-800">{nombre}</h3>
          <p className="text-xs text-green-500/70">Chofer</p>
        </div>
      </div>

      <div className="space-y-2">
        <a
          href={`tel:${telefono}`}
          className="flex items-center text-gray-600 text-sm p-2 rounded hover:bg-purple-50/50"
        >
          <FaPhone className="text-gray-500 text-xs mr-2" />
          <p className="font-medium">{telefono}</p>
        </a>
        <a
          href={`mailto:${email}`}
          className="flex items-center text-gray-600 text-sm p-2 rounded hover:bg-purple-50/50"
        >
          <FaEnvelope className="text-gray-500 text-xs mr-2" />
          <p className="font-medium">{email}</p>
        </a>

        <button
          onClick={() => setShowPassword(!showPassword)}
          className="flex items-center w-full text-gray-600 text-sm p-2 rounded hover:bg-purple-50/50"
        >
          <FaKey className="text-gray-500 text-xs mr-2" />
          <p className="font-medium">
            {showPassword ? "Ocultar Contraseña" : "Ver Contraseña"}
          </p>
        </button>

        {showPassword && password_inicial && (
          <div className="flex items-center bg-yellow-50 text-gray-600 text-sm p-2 rounded">
            <p className="font-medium">Contraseña: {password_inicial}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChoferCard;
