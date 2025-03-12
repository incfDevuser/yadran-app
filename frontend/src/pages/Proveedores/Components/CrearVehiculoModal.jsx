import React, { useEffect, useState } from "react";
import { useVehiculos } from "../../../Context/VehiculosContext";
import { useChofer } from "../../../Context/ChoferContext";

const CrearVehiculoModal = ({ show, handleClose }) => {
  const { crearVehiculo } = useVehiculos();
  const { choferesProveedor, obtenerChoferesProveedor } = useChofer();
  const [formData, setFormData] = useState({
    num_tripulantes: 0,
    tipo_vehiculo: "",
    tipo_servicio: "",
    capacidad_total: 0,
    capacidad_operacional: 0,
    estado: "Activo",
    documentacion_ok: true,
    velocidad_promedio: 0,
    chofer_id: "",
  });
  useEffect(() => {
    obtenerChoferesProveedor();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearVehiculo(formData);
      handleClose();
    } catch (error) {
      console.error("Error al crear vehículo:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Crear Nuevo Vehículo</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipo de Vehículo
            </label>
            <input
              type="text"
              name="tipo_vehiculo"
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipo de Servicio
            </label>
            <input
              type="text"
              name="tipo_servicio"
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Capacidad Total
              </label>
              <input
                type="number"
                name="capacidad_total"
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Capacidad Operacional
              </label>
              <input
                type="number"
                name="capacidad_operacional"
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Chofer
            </label>
            <select
              name="chofer_id"
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            >
              <option value="">Seleccione un chofer</option>
              {choferesProveedor.map((chofer) => (
                <option key={chofer.id} value={chofer.id}>
                  {chofer.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Crear Vehículo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearVehiculoModal;
