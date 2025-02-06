import React, { useState, useEffect } from "react";
import { useZonas } from "../../../../Context/ZonasContext";
import { useJurisdiccion } from "../../../../Context/JurisdiccionContext";

const EditarZona = ({ zona, isOpen, onClose }) => {
  const { actualizarZona } = useZonas();
  const { jurisdicciones, loading: loadingJurisdicciones } = useJurisdiccion();

  const initialState = {
    nombre_zona: "",
    pais: "",
    region: "",
    jurisdiccion_id: "",
    estado_zona: "",
    descripcion: "",
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (zona) {
      setFormData({
        nombre_zona: zona.nombre_zona || "",
        pais: zona.pais || "",
        region: zona.region || "",
        jurisdiccion_id: zona.jurisdiccion_id || "",
        estado_zona: zona.estado_zona || "",
        descripcion: zona.descripcion || "",
      });
    }
  }, [zona]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await actualizarZona(zona.id, formData);
      onClose();
    } catch (error) {
      console.error("Error al actualizar la zona:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar Zona</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Nombre */}
          <div className="mb-4">
            <label className="block text-gray-700">Nombre</label>
            <input
              type="text"
              name="nombre_zona"
              value={formData.nombre_zona}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          {/* País */}
          <div className="mb-4">
            <label className="block text-gray-700">País</label>
            <input
              type="text"
              name="pais"
              value={formData.pais}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          {/* Región */}
          <div className="mb-4">
            <label className="block text-gray-700">Región</label>
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          {/* Jurisdicción */}
          <div className="mb-4">
            <label className="block text-gray-700">Jurisdicción</label>
            {loadingJurisdicciones ? (
              <p>Cargando jurisdicciones...</p>
            ) : (
              <select
                name="jurisdiccion_id"
                value={formData.jurisdiccion_id}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="">Selecciona una Jurisdicción</option>
                {jurisdicciones.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.nombre_jurisdiccion}
                  </option>
                ))}
              </select>
            )}
          </div>
          {/* Estado Zona */}
          <div className="mb-4">
            <label className="block text-gray-700">Estado Zona</label>
            <input
              type="text"
              name="estado_zona"
              value={formData.estado_zona}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          {/* Descripción */}
          <div className="mb-4">
            <label className="block text-gray-700">Descripción</label>
            <input
              type="text"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          {/* Botones */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarZona;