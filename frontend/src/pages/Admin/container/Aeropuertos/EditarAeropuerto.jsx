import React, { useState, useEffect } from "react";
import { useAeropuertos } from "../../../../Context/AeropuertosContext";
import { useJurisdiccion } from "../../../../Context/JurisdiccionContext";

const EditarAeropuerto = ({ aeropuerto, isOpen, onClose }) => {
  const { actualizarAeropuerto } = useAeropuertos();
  const { jurisdicciones, loading: loadingJurisdicciones } = useJurisdiccion();

  const initialState = {
    nombre_aeropuerto: "",
    ubicacion_aeropuerto: "",
    localidad: "",
    jurisdiccion_id: null,
    estado: "Abierto",
  };
  const [formData, setFormData] = useState(initialState);
  useEffect(() => {
    if (aeropuerto) {
      setFormData({
        nombre_aeropuerto: aeropuerto.nombre_aeropuerto || "",
        ubicacion_aeropuerto: aeropuerto.ubicacion_aeropuerto || "",
        localidad: aeropuerto.localidad || "",
        jurisdiccion_id: aeropuerto.jurisdiccion_id || null,
        estado: aeropuerto.estado || "Abierto",
      });
    }
  }, [aeropuerto]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? null : Number(value),
    }));
  };

  const handleUpdate = async () => {
    try {
      await actualizarAeropuerto(aeropuerto.id, formData);
      onClose();
    } catch (error) {
      console.error("Error al actualizar el aeropuerto:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar Aeropuerto</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Nombre del Aeropuerto */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Nombre del Aeropuerto
            </label>
            <input
              type="text"
              name="nombre_aeropuerto"
              value={formData.nombre_aeropuerto}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Nombre del Aeropuerto"
              required
            />
          </div>
          {/* Ubicación del Aeropuerto */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Ubicación del Aeropuerto
            </label>
            <input
              type="text"
              name="ubicacion_aeropuerto"
              value={formData.ubicacion_aeropuerto}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Ubicación del Aeropuerto"
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
              placeholder="Localidad"
              required
            />
          </div>
          {/* Jurisdicción */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Jurisdicción</label>
            {loadingJurisdicciones ? (
              <p className="text-gray-500">Cargando Jurisdicciones...</p>
            ) : (
              <select
                name="jurisdiccion_id"
                value={formData.jurisdiccion_id || ""}
                onChange={handleSelectChange}
                className="w-full px-3 py-2 border rounded"
                required
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
              required
            >
              <option value="Abierto">Abierto</option>
              <option value="Cerrado">Cerrado</option>
            </select>
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

export default EditarAeropuerto;