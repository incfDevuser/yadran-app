import React, { useState } from "react";
import { useIntercentros } from "../../../Context/IntercentroContext";

const CreateLanchaForm = ({ closeModal }) => {
  const { crearLancha } = useIntercentros();
  const [nombre, setNombre] = useState("");
  const [capacidad, setCapacidad] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearLancha({ nombre, capacidad });
      closeModal();
    } catch (error) {
      console.error("Error al crear la lancha:", error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Crear Lancha</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Capacidad</label>
            <input
              type="number"
              value={capacidad}
              onChange={(e) => setCapacidad(e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-300 px-4 py-2 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLanchaForm;
