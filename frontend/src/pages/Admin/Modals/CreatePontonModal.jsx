import React, { useState } from "react";
import { usePontones } from "../../../Context/PontonesContext";
import { useConcesion } from "../../../Context/ConcesionesContext";

const CreatePontonModal = ({ isOpen, onClose }) => {
  const { crearPonton } = usePontones();
  const { concesiones, loading: loadingConcesiones } = useConcesion();

  //Estado para crear el nuevo ponton
  const [nuevoPonton, setNuevoPonton] = useState({
    nombre_ponton: "",
    concesion_id: null,
    tipo_ponton: "",
    habitabilidad_general: 0,
    habitabilidad_interna: 0,
    habitabilidad_externa: 0,
  });
  //Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoPonton({
      ...nuevoPonton,
      [name]: value,
    });
  };
  //Crear nueva zona
  const handleCreate = async () => {
    try {
      await crearPonton(nuevoPonton);
      onClose();
    } catch (error) {
      console.error("Error al crear el ponton", error);
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md  max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Crear Nuevo Ponton</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nombre</label>
            <input
              type="text"
              name="nombre_ponton"
              value={nuevoPonton.nombre_ponton}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Nombre del Ponton"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Concesion</label>
            {loadingConcesiones ? (
              <p>Cargando Concesiones</p>
            ) : (
              <select
                name="concesion_id"
                value={nuevoPonton.concesion_id || ""}
                onChange={(e) =>
                  setNuevoPonton({
                    ...nuevoPonton,
                    concesion_id:
                      e.target.value === "" ? null : Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="">Selecciona una Concesion</option>
                {concesiones.map((concesion) => (
                  <option key={concesion.id} value={concesion.id}>
                    {concesion.nombre_concesion}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Tipo Ponton</label>
            <input
              type="text"
              name="tipo_ponton"
              value={nuevoPonton.tipo_ponton}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Tipo de Ponton"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Habitabilidad General
            </label>
            <input
              type="number"
              name="habitabilidad_general"
              value={nuevoPonton.habitabilidad_general}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Habitabilidad General"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Habitabilidad Interna
            </label>
            <input
              type="number"
              name="habitabilidad_interna"
              value={nuevoPonton.habitabilidad_interna}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Habitabilidad Interna"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Habitabilidad Externa
            </label>
            <input
              type="number"
              name="habitabilidad_externa"
              value={nuevoPonton.habitabilidad_externa}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Habitabilidad Externa"
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

export default CreatePontonModal;
