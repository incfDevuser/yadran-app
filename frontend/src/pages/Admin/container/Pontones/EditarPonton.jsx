import React, { useState, useEffect } from "react";
import { usePontones } from "../../../../Context/PontonesContext";
import { useConcesion } from "../../../../Context/ConcesionesContext";

const EditarPonton = ({ ponton, isOpen, onClose }) => {
  const { actualizarPonton } = usePontones();
  const { concesiones, loading: loadingConcesiones } = useConcesion();

  const initialState = {
    nombre_ponton: "",
    concesion_id: null,
    tipo_ponton: "",
    habitabilidad_general: "",
    habitabilidad_interna: "",
    habitabilidad_externa: "",
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (ponton) {
      setFormData({
        nombre_ponton: ponton.nombre_ponton || "",
        concesion_id: ponton.concesion_id || null,
        tipo_ponton: ponton.tipo_ponton || "",
        habitabilidad_general: ponton.habitabilidad_general || "",
        habitabilidad_interna: ponton.habitabilidad_interna || "",
        habitabilidad_externa: ponton.habitabilidad_externa || "",
      });
    }
  }, [ponton]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      concesion_id: value === "" ? null : Number(value),
    }));
  };

  const handleUpdate = async () => {
    try {
      // Usamos ponton.ponton_id en lugar de ponton.id
      await actualizarPonton(ponton.ponton_id, formData);
      onClose(); // Se cierra el modal al actualizar correctamente
    } catch (error) {
      console.error("Error al actualizar el pontón:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar Pontón</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Nombre del Pontón */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Nombre del Pontón
            </label>
            <input
              type="text"
              name="nombre_ponton"
              value={formData.nombre_ponton}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Nombre del Pontón"
              required
            />
          </div>
          {/* Concesión Asociada */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Concesión</label>
            {loadingConcesiones ? (
              <p className="text-gray-500">Cargando Concesiones...</p>
            ) : (
              <select
                name="concesion_id"
                value={formData.concesion_id || ""}
                onChange={handleSelectChange}
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="">Selecciona una Concesión</option>
                {concesiones.map((concesion) => (
                  <option key={concesion.id} value={concesion.id}>
                    {concesion.nombre_concesion}
                  </option>
                ))}
              </select>
            )}
          </div>
          {/* Tipo de Pontón */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Tipo de Pontón</label>
            <input
              type="text"
              name="tipo_ponton"
              value={formData.tipo_ponton}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Tipo de Pontón"
            />
          </div>
          {/* Habitabilidad General */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Habitabilidad General
            </label>
            <input
              type="number"
              name="habitabilidad_general"
              value={formData.habitabilidad_general}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Habitabilidad General"
            />
          </div>
          {/* Habitabilidad Interna */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Habitabilidad Interna
            </label>
            <input
              type="number"
              name="habitabilidad_interna"
              value={formData.habitabilidad_interna}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Habitabilidad Interna"
            />
          </div>
          {/* Habitabilidad Externa */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Habitabilidad Externa
            </label>
            <input
              type="number"
              name="habitabilidad_externa"
              value={formData.habitabilidad_externa}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Habitabilidad Externa"
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

export default EditarPonton;
