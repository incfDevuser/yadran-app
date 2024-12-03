import React from "react";
import { HiOutlineUserCircle } from "react-icons/hi";

const HotelUsuarioCard = ({ persona }) => {
  return (
    <div className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition-shadow duration-300">
      <HiOutlineUserCircle className="text-blue-500 text-3xl" />
      <div>
        <p className="text-lg font-semibold text-gray-800">{persona.nombre}</p>
        <p className="text-gray-500 text-sm">
          <strong>Rol:</strong> {persona.tipo}
        </p>
        <p className="text-gray-500 text-sm">
          <strong>Email:</strong> {persona.email}
        </p>
      </div>
    </div>
  );
};

export default HotelUsuarioCard;
