import React, { useState, useEffect } from "react";
import { useConcesion } from "../../../../Context/ConcesionesContext";
import { useZonas } from "../../../../Context/ZonasContext";

const EditarConcesion = ({ concesion, isOpen, onClose }) => {
  const { actualizarConcesion } = useConcesion();
  const { zonas, loading: loadingZonas } = useZonas();

  const initialState = {
    nombre_concesion: "",
    vigencia: "",
    zona_id: null,
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (concesion) {
      setFormData({
        nombre_concesion: concesion.nombre_concesion || "",
        vigencia: concesion.vigencia || "",
        zona_id: concesion.zona_id || null,
      });
    }
  }, [concesion]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      zona_id: value === "" ? null : Number(value),
    }));
  };

  const handleUpdate = async () => {
    try {
      await actualizarConcesion(concesion.id, formData);
      onClose();
    } catch (error) {
      console.error("Error al actualizar la concesión:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar Concesión</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Nombre */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nombre</label>
            <input
              type="text"
              name="nombre_concesion"
              value={formData.nombre_concesion}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Nombre de la Concesión"
              required
            />
          </div>
          {/* Vigencia */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Vigencia</label>
            <input
              type="date"
              name="vigencia"
              value={formData.vigencia}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Vigencia de la Concesión"
              required
            />
          </div>
          {/* Zona asociada */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Zona</label>
            {loadingZonas ? (
              <p className="text-gray-500">Cargando Zonas...</p>
            ) : (
              <select
                name="zona_id"
                value={formData.zona_id || ""}
                onChange={handleSelectChange}
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="">Selecciona una Zona</option>
                {zonas.map((zona) => (
                  <option key={zona.id} value={zona.id}>
                    {zona.nombre_zona}
                  </option>
                ))}
              </select>
            )}
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

export default EditarConcesion;