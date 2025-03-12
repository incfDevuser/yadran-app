import React, { useState, useEffect } from "react";
import { useVehiculos } from "../../../Context/VehiculosContext";
import { useChofer } from "../../../Context/ChoferContext";

const EditarVehiculoModal = ({ show, handleClose, vehiculo }) => {
  const { actualizarVehiculo } = useVehiculos();
  const { choferesProveedor } = useChofer();
  const [formData, setFormData] = useState({
    num_tripulantes: 0,
    tipo_vehiculo: "",
    tipo_servicio: "",
    capacidad_total: 0,
    capacidad_operacional: 0,
    estado: "",
    documentacion_ok: false,
    velocidad_promedio: 0,
    chofer_id: "",
  });

  useEffect(() => {
    if (vehiculo) {
      setFormData({
        num_tripulantes: vehiculo.num_tripulantes,
        tipo_vehiculo: vehiculo.tipo_vehiculo,
        tipo_servicio: vehiculo.tipo_servicio,
        capacidad_total: vehiculo.capacidad_total,
        capacidad_operacional: vehiculo.capacidad_operacional,
        estado: vehiculo.estado,
        documentacion_ok: vehiculo.documentacion_ok,
        velocidad_promedio: vehiculo.velocidad_promedio,
        chofer_id: vehiculo.chofer_id,
      });
    }
  }, [vehiculo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarVehiculo(vehiculo.id, formData);
      handleClose();
    } catch (error) {
      console.error("Error al actualizar el vehículo:", error);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Editar Vehículo</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipo de Vehículo
            </label>
            <input
              type="text"
              value={formData.tipo_vehiculo}
              onChange={(e) =>
                setFormData({ ...formData, tipo_vehiculo: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipo de Servicio
            </label>
            <input
              type="text"
              value={formData.tipo_servicio}
              onChange={(e) =>
                setFormData({ ...formData, tipo_servicio: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Capacidad Total
              </label>
              <input
                type="number"
                value={formData.capacidad_total}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    capacidad_total: parseInt(e.target.value),
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Capacidad Operacional
              </label>
              <input
                type="number"
                value={formData.capacidad_operacional}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    capacidad_operacional: parseInt(e.target.value),
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Chofer
            </label>
            <select
              value={formData.chofer_id}
              onChange={(e) =>
                setFormData({ ...formData, chofer_id: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="">Seleccione un chofer</option>
              {choferesProveedor.map((chofer) => (
                <option key={chofer.id} value={chofer.id}>
                  {chofer.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarVehiculoModal;
