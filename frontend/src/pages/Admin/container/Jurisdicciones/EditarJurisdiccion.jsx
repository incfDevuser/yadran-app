import React, { useState, useEffect } from "react";
import { useJurisdiccion } from "../../../../Context/JurisdiccionContext";

const EditarJurisdiccion = ({ isOpen, onClose, jurisdiccion }) => {
  const { actualizarJurisdiccion } = useJurisdiccion();

  const initialState = {
    nombre_jurisdiccion: "",
    ubicacion_geografica: "",
    sectores: "",
    estado: "",
    tipo_embarcacion: "",
    contacto: "",
    fecha_ultima_modificacion: "",
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (jurisdiccion) {
      setFormData({
        nombre_jurisdiccion: jurisdiccion.nombre_jurisdiccion || "",
        ubicacion_geografica: jurisdiccion.ubicacion_geografica || "",
        sectores: jurisdiccion.sectores || "",
        estado: jurisdiccion.estado || "",
        tipo_embarcacion: jurisdiccion.tipo_embarcacion || "",
        contacto: jurisdiccion.contacto || "",
        fecha_ultima_modificacion: jurisdiccion.fecha_ultima_modificacion
          ? new Date(jurisdiccion.fecha_ultima_modificacion)
              .toISOString()
              .split("T")[0]
          : "",
      });
    }
  }, [jurisdiccion]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await actualizarJurisdiccion(jurisdiccion.id, formData);
      onClose();
    } catch (error) {
      console.error("Error al actualizar la jurisdicción:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar Jurisdicción</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre</label>
            <input
              type="text"
              name="nombre_jurisdiccion"
              value={formData.nombre_jurisdiccion}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Ubicación Geográfica</label>
            <input
              type="text"
              name="ubicacion_geografica"
              value={formData.ubicacion_geografica}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Sectores</label>
            <input
              type="text"
              name="sectores"
              value={formData.sectores}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Estado</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Selecciona un estado</option>
              <option value="Abierta">Abierta</option>
              <option value="Cerrada">Cerrada</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Tipo Embarcación</label>
            <input
              type="text"
              name="tipo_embarcacion"
              value={formData.tipo_embarcacion}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Contacto</label>
            <input
              type="text"
              name="contacto"
              value={formData.contacto}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Fecha Última Modificación
            </label>
            <input
              type="date"
              name="fecha_ultima_modificacion"
              value={formData.fecha_ultima_modificacion}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
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
              onClick={handleUpdate}
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarJurisdiccion;
