import React, { useState, useEffect } from "react";
import { useBases } from "../../../../Context/BasesContext";
import { usePontones } from "../../../../Context/PontonesContext";

const CreateBaseModal = ({ isOpen, onClose }) => {
  const { crearBase } = useBases();
  const { pontones, loading: loadingPontones } = usePontones();

  const initialState = {
    nombre_base: "",
    jefe_base: "",
    ponton_id: null,
  };

  const [nuevaBase, setNuevaBase] = useState(initialState);

  // Manejar cambios en los campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaBase({
      ...nuevaBase,
      [name]: value,
    });
  };

  // Resetea el estado al cerrar el modal
  useEffect(() => {
    if (!isOpen) {
      setNuevaBase(initialState);
    }
  }, [isOpen]);

  // Crear nueva base
  const handleCreate = async () => {
    try {
      await crearBase(nuevaBase);
      setNuevaBase(initialState);
      onClose();
    } catch (error) {
      console.error("Error al crear la base:", error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Crear Nueva Base</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Nombre de la Base
            </label>
            <input
              type="text"
              name="nombre_base"
              value={nuevaBase.nombre_base}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Nombre de la Base"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Jefe de la Base</label>
            <input
              type="text"
              name="jefe_base"
              value={nuevaBase.jefe_base}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Nombre del Jefe de la Base"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Ponton Asociado</label>
            {loadingPontones ? (
              <p>Cargando Pontones...</p>
            ) : (
              <select
                name="ponton_id"
                value={nuevaBase.ponton_id || ""}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  setNuevaBase({
                    ...nuevaBase,
                    ponton_id:
                      selectedValue === "" ? null : parseInt(selectedValue, 10),
                  });
                }}
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="">Selecciona un Ponton</option>
                {pontones.length > 0 ? (
                  pontones.map((ponton) => (
                    <option key={ponton.ponton_id} value={ponton.ponton_id}>
                      {ponton.nombre_ponton}
                    </option>
                  ))
                ) : (
                  <option disabled>No hay pontones disponibles</option>
                )}
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

export default CreateBaseModal;
