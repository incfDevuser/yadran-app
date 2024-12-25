import React, { useState } from "react";
import { useVehiculos } from "../../../Context/VehiculosContext";

const CrearTripulanteModal = ({ vehiculoId, closeModal }) => {
  const [nombre, setNombre] = useState("");
  const [rut, setRut] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [cargo, setCargo] = useState("");
  const [error, setError] = useState("");

  const { asignarTripulante } = useVehiculos();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !rut || !fechaNacimiento || !empresa || !cargo) {
      setError("Todos los campos son requeridos.");
      return;
    }
    const tripulante = {
      nombre_tripulante: nombre,
      rut_tripulante: rut,
      fecha_nacimiento: fechaNacimiento,
      empresa,
      cargo,
    };
    try {
      await asignarTripulante(vehiculoId, tripulante);
      closeModal();
    } catch (error) {
      console.error("Error al asignar el tripulante:", error);
      setError("Hubo un error al asignar el tripulante.");
    }
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
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">RUT</label>
            <input
              type="text"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
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
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
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
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Cargo</label>
            <input
              type="text"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
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
