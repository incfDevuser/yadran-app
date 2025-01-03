import React, { useState, useEffect } from "react";
import { useConcesion } from "../../../../Context/ConcesionesContext";
import { useZonas } from "../../../../Context/ZonasContext";

const CreateConcesionModal = ({ isOpen, onClose }) => {
  const { crearConcesion } = useConcesion();
  const { zonas, loading: loadingZonas } = useZonas();

  const initialState = {
    vigencia: "",
    zona_id: null,
    nombre_concesion: "",
  };

  const [nuevaConcesion, setNuevaConcesion] = useState(initialState);

  // Reinicia los valores del formulario al cerrar el modal
  useEffect(() => {
    if (!isOpen) {
      setNuevaConcesion(initialState);
    }
  }, [isOpen]);

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaConcesion({
      ...nuevaConcesion,
      [name]: value,
    });
  };

  // Crear la concesión
  const handleCreate = async () => {
    try {
      await crearConcesion(nuevaConcesion);
      setNuevaConcesion(initialState); // Reinicia el formulario después de crear
      onClose();
    } catch (error) {
      console.error("Error al crear la concesión:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Crear Nueva Concesión</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Nombre de la concesión */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nombre</label>
            <input
              type="text"
              name="nombre_concesion"
              value={nuevaConcesion.nombre_concesion}
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
              value={nuevaConcesion.vigencia}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Vigencia de la Concesión"
            />
          </div>

          {/* Zona */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Zona</label>
            {loadingZonas ? (
              <p className="text-gray-500">Cargando Zonas...</p>
            ) : (
              <select
                name="zona_id"
                value={nuevaConcesion.zona_id || ""}
                onChange={(e) =>
                  setNuevaConcesion({
                    ...nuevaConcesion,
                    zona_id:
                      e.target.value === "" ? null : Number(e.target.value),
                  })
                }
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

export default CreateConcesionModal;
