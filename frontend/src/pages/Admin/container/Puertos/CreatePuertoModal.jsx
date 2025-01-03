import React, { useState, useEffect } from "react";
import { usePuertos } from "../../../../Context/PuertosContext";
import { useJurisdiccion } from "../../../../Context/JurisdiccionContext";

const CreatePuertoModal = ({ isOpen, onClose }) => {
  const { crearPuerto } = usePuertos();
  const { jurisdicciones, loading: loadingJurisdicciones } = useJurisdiccion();

  const initialState = {
    nombre_puerto: "",
    ubicacion_puerto: "",
    localidad: "",
    jurisdiccion_id: null,
    estado: "Abierto",
  };

  const [nuevoPuerto, setNuevoPuerto] = useState(initialState);

  // Reinicia los valores del formulario al cerrar el modal
  useEffect(() => {
    if (!isOpen) {
      setNuevoPuerto(initialState);
    }
  }, [isOpen]);

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoPuerto({
      ...nuevoPuerto,
      [name]: value,
    });
  };

  // Crear el puerto
  const handleCreate = async () => {
    try {
      await crearPuerto(nuevoPuerto);
      setNuevoPuerto(initialState); // Reinicia el formulario después de crear
      onClose();
    } catch (error) {
      console.error("Error al crear el puerto", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Crear Nuevo Puerto</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Nombre del puerto */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Nombre del Puerto
            </label>
            <input
              type="text"
              name="nombre_puerto"
              value={nuevoPuerto.nombre_puerto}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Nombre del Puerto"
              required
            />
          </div>

          {/* Ubicación del puerto */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Ubicación del Puerto
            </label>
            <input
              type="text"
              name="ubicacion_puerto"
              value={nuevoPuerto.ubicacion_puerto}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Ubicación del Puerto"
              required
            />
          </div>

          {/* Localidad */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Localidad</label>
            <input
              type="text"
              name="localidad"
              value={nuevoPuerto.localidad}
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
                value={nuevoPuerto.jurisdiccion_id || ""}
                onChange={(e) =>
                  setNuevoPuerto({
                    ...nuevoPuerto,
                    jurisdiccion_id:
                      e.target.value === "" ? null : Number(e.target.value),
                  })
                }
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
              value={nuevoPuerto.estado}
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

export default CreatePuertoModal;
