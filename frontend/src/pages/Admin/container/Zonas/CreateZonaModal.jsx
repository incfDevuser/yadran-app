import React, { useState, useEffect } from "react";
import { useZonas } from "../../../../Context/ZonasContext";
import { useJurisdiccion } from "../../../../Context/JurisdiccionContext";

const CreateZonaModal = ({ isOpen, onClose }) => {
  const { crearZona } = useZonas();
  const { jurisdicciones, loading: loadingJurisdicciones } = useJurisdiccion();

  const initialZonaState = {
    nombre_zona: "",
    pais: "",
    region: "",
    jurisdiccion_id: "",
    estado_zona: "",
    descripcion: "",
  };

  const [nuevaZona, setNuevaZona] = useState(initialZonaState);

  // Resetear el formulario al abrir o cerrar el modal
  useEffect(() => {
    if (!isOpen) {
      setNuevaZona(initialZonaState);
    }
  }, [isOpen]);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaZona((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Crear la nueva zona
  const handleCreate = async () => {
    try {
      await crearZona(nuevaZona);
      onClose(); // Cerrar el modal después de crear la zona
    } catch (error) {
      console.error("Error al crear la zona:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Crear Nueva Zona</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nombre</label>
            <input
              type="text"
              name="nombre_zona"
              value={nuevaZona.nombre_zona}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Nombre de la Zona"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Pais</label>
            <input
              type="text"
              name="pais"
              value={nuevaZona.pais}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Pais donde se encuentra la zona"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Region</label>
            <input
              type="text"
              name="region"
              value={nuevaZona.region}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Region donde se encuentra la zona"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Jurisdiccion</label>
            {loadingJurisdicciones ? (
              <p>Cargando Jurisdicciones...</p>
            ) : (
              <select
                name="jurisdiccion_id"
                value={nuevaZona.jurisdiccion_id}
                onChange={handleInputChange}
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

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Estado Zona</label>
            <input
              type="text"
              name="estado_zona"
              value={nuevaZona.estado_zona}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Estado de la Zona"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Descripcion</label>
            <input
              type="text"
              name="descripcion"
              value={nuevaZona.descripcion}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Descripcion Adicional"
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

export default CreateZonaModal;
