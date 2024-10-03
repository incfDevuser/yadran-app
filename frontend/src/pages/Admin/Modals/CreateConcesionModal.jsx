import React, { useState } from "react";
import { useConcesion } from "../../../Context/ConcesionesContext";
import { useZonas } from "../../../Context/ZonasContext";

const CreateConcesionModal = ({ isOpen, onClose }) => {
  const { crearConcesion } = useConcesion();
  const { zonas, loading: loadingZonas } = useZonas();

  const [nuevaConcesion, setNuevaConcesion] = useState({
    vigencia: "",
    zona_id: null,
    nombre_concesion: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaConcesion({
      ...nuevaConcesion,
      [name]: value,
    });
  };
  const handleCreate = async () => {
    try {
      await crearConcesion(nuevaConcesion);
      onClose();
    } catch (error) {
      console.error("Error al crear la concesion", error);
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md  max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Crear Nueva Concesion</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nombre</label>
            <input
              type="text"
              name="nombre_concesion"
              value={nuevaConcesion.nombre_concesion}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Nombre de la Concesion"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Vigencia</label>
            <input
              type="date"
              name="vigencia"
              value={nuevaConcesion.vigencia}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Vigencia de la Concesion "
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Zona</label>
            {loadingZonas ? (
              <p>Cargando Zonas</p>
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
