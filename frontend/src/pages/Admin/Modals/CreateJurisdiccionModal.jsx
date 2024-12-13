import React, { useState } from "react";
import { useJurisdiccion } from "../../../Context/JurisdiccionContext";

const CreateJurisdiccionModal = ({ isOpen, onClose }) => {
  const { crearJurisdiccion } = useJurisdiccion();
  const fechaActual = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const [nuevaJurisdiccion, setNuevaJurisdiccion] = useState({
    nombre_jurisdiccion: "",
    ubicacion_geografica: "",
    sectores: "",
    estado: "",
    tipo_embarcacion: "",
    contacto: "",
    integracion: "",
    fecha_ultima_modificacion: fechaActual(),
  });

  // Maneja cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaJurisdiccion({
      ...nuevaJurisdiccion,
      [name]: value,
    });
  };

  const handleCreate = async () => {
    try {
      await crearJurisdiccion(nuevaJurisdiccion);
      onClose();
    } catch (error) {
      console.error("Error al crear jurisdicción:", error);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md  max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Crear Nueva Jurisdicción</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nombre</label>
            <input
              type="text"
              name="nombre_jurisdiccion"
              value={nuevaJurisdiccion.nombre_jurisdiccion}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Nombre de la Jurisdicción"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Ubicación Geográfica
            </label>
            <input
              type="text"
              name="ubicacion_geografica"
              value={nuevaJurisdiccion.ubicacion_geografica}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Ubicación Geográfica"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Comunas</label>
            <input
              type="text"
              name="sectores"
              value={nuevaJurisdiccion.sectores}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Comuna"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Estado</label>
            <input
              type="text"
              name="estado"
              value={nuevaJurisdiccion.estado}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Estado"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Tipo Embarcacion</label>
            <input
              type="text"
              name="tipo_embarcacion"
              value={nuevaJurisdiccion.tipo_embarcacion}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Tipo Embarcacion"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Contacto</label>
            <input
              type="text"
              name="contacto"
              value={nuevaJurisdiccion.contacto}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Contacto"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Integracion</label>
            <input
              type="text"
              name="integracion"
              value={nuevaJurisdiccion.integracion}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Integracion"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Fecha Última Modificación
            </label>
            <input
              type="date"
              name="fecha_ultima_modificacion"
              value={nuevaJurisdiccion.fecha_ultima_modificacion}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Fecha Última Modificación"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleCreate}
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJurisdiccionModal;
