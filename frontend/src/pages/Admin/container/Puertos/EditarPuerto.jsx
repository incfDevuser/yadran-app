import React, { useState, useEffect } from "react";
import { usePuertos } from "../../../../Context/PuertosContext";
import { useJurisdiccion } from "../../../../Context/JurisdiccionContext";

const EditarPuerto = ({ isOpen, onClose, puerto }) => {
  const { actualizarPuerto } = usePuertos();
  const { jurisdicciones, loading: loadingJurisdicciones } = useJurisdiccion();

  const initialState = {
    nombre_puerto: "",
    ubicacion_puerto: "",
    localidad: "",
    jurisdiccion_id: null,
    estado: "",
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (puerto) {
      setFormData({
        nombre_puerto: puerto.nombre_puerto || "",
        ubicacion_puerto: puerto.ubicacion_puerto || "",
        localidad: puerto.localidad || "",
        jurisdiccion_id: puerto.jurisdiccion_id || null,
        estado: puerto.estado || "Abierto",
      });
    }
  }, [puerto]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      jurisdiccion_id: value === "" ? null : Number(value),
    }));
  };

  const handleUpdate = async () => {
    try {
      await actualizarPuerto(puerto.id, formData);
      onClose();
    } catch (error) {
      console.error("Error al actualizar el puerto:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar Puerto</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Nombre del Puerto */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nombre</label>
            <input
              type="text"
              name="nombre_puerto"
              value={formData.nombre_puerto}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          {/* Ubicación del Puerto */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Ubicación</label>
            <input
              type="text"
              name="ubicacion_puerto"
              value={formData.ubicacion_puerto}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          {/* Localidad */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Localidad</label>
            <input
              type="text"
              name="localidad"
              value={formData.localidad}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          {/* Jurisdicción */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Jurisdicción</label>
            {loadingJurisdicciones ? (
              <p>Cargando Jurisdicciones...</p>
            ) : (
              <select
                name="jurisdiccion_id"
                value={formData.jurisdiccion_id || ""}
                onChange={handleSelectChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">Selecciona una Jurisdicción</option>
                {jurisdicciones.map((jurisdiccion) => (
                  <option key={jurisdiccion.id} value={jurisdiccion.id}>
                    {jurisdiccion.nombre_jurisdiccion}
                  </option>
                ))}
              </select>
            )}
          </div>
          {/* Estado */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Estado</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="Abierto">Abierto</option>
              <option value="Cerrado">Cerrado</option>
            </select>
          </div>
          {/* Botones */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancelar
            </button>
            <button
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

export default EditarPuerto;
