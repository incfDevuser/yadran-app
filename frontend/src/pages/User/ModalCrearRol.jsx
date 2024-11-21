import React, { useState } from "react";
import { useRoles } from "../../Context/RolesContext";

const ModalCrearRol = ({ onClose }) => {
  const { crearRol } = useRoles();
  const [nombreRol, setNombreRol] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleCrearRol = async () => {
    if (nombreRol.trim() && descripcion.trim()) {
      await crearRol({ nombreRol, descripcion });
      onClose(); 
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Crear un Rol
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre del Rol</label>
          <input
            type="text"
            value={nombreRol}
            onChange={(e) => setNombreRol(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
            placeholder="Ej. Colaborador Autorizado"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
            placeholder="Ej. Permite agendar y obtener vistas"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Cancelar
          </button>
          <button
            onClick={handleCrearRol}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCrearRol;
