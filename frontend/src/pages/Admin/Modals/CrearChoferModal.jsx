import React, { useState } from "react";
import { useChofer } from "../../../Context/ChoferContext";

const CrearChoferModal = ({ show, handleClose }) => {
  const { crearChofer, obtenerChoferesProveedor } = useChofer();

  const initialState = {
    nombre: "",
    telefono: "",
    email: "",
  };

  const [nuevoChofer, setNuevoChofer] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoChofer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearChofer(nuevoChofer);
      setNuevoChofer(initialState);
      await obtenerChoferesProveedor();
      handleClose();
    } catch (error) {
      console.error("Error al crear el chofer:", error);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Crear Chofer</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Nombre:
            </label>
            <input
              type="text"
              name="nombre"
              value={nuevoChofer.nombre}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Teléfono:
            </label>
            <input
              type="text"
              name="telefono"
              value={nuevoChofer.telefono}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={nuevoChofer.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleClose}
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearChoferModal;
