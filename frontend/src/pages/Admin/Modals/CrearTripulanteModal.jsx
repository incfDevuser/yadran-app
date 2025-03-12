import React, { useState } from "react";
import { useVehiculos } from "../../../Context/VehiculosContext";

const CrearTripulanteModal = ({ vehiculoId, closeModal }) => {
  const { asignarTripulante, obtenerVehiculosProveedor } = useVehiculos();

  // Estado inicial para el tripulante
  const initialState = {
    nombre_tripulante: "",
    rut_tripulante: "",
    fecha_nacimiento: "",
    empresa: "",
    cargo: "",
  };

  const [tripulante, setTripulante] = useState(initialState);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripulante((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (
      !tripulante.nombre_tripulante ||
      !tripulante.rut_tripulante ||
      !tripulante.fecha_nacimiento ||
      !tripulante.empresa ||
      !tripulante.cargo
    ) {
      setError("Todos los campos son requeridos.");
      return;
    }

    try {
      await asignarTripulante(vehiculoId, tripulante);
      await obtenerVehiculosProveedor();
      setTripulante(initialState);
      closeModal();
    } catch (error) {
      console.error("Error al asignar el tripulante:", error);
      setError("Hubo un error al asignar el tripulante.");
    }
  };

  const handleCancel = () => {
    setTripulante(initialState);
    setError("");
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          Agregar Tripulante al Vehículo
        </h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Nombre</label>
            <input
              type="text"
              name="nombre_tripulante"
              value={tripulante.nombre_tripulante}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">RUT</label>
            <input
              type="text"
              name="rut_tripulante"
              value={tripulante.rut_tripulante}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              name="fecha_nacimiento"
              value={tripulante.fecha_nacimiento}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Empresa
            </label>
            <input
              type="text"
              name="empresa"
              value={tripulante.empresa}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Cargo</label>
            <input
              type="text"
              name="cargo"
              value={tripulante.cargo}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Asignar Tripulante
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearTripulanteModal;
