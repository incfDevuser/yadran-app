import React, { useState, useEffect } from "react";
import { useCentros } from "../../../../Context/CentrosContext";

const EditarCentro = ({ centro, isOpen, onClose }) => {
  const { actualizarCentro } = useCentros();

  const initialState = {
    nombre_centro: "",
    fecha_apertura_productiva: "",
    fecha_cierre_productivo: "",
    jefe_centro: "",
    etapa_ciclo_cultivo: "",
    ponton_id: null,
    ruta_id: null,
    latitud: "",
    longitud: "",
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (centro) {
      setFormData({
        nombre_centro: centro.nombre_centro || "",
        fecha_apertura_productiva: centro.fecha_apertura_productiva
          ? new Date(centro.fecha_apertura_productiva)
              .toISOString()
              .split("T")[0]
          : "",
        fecha_cierre_productivo: centro.fecha_cierre_productivo
          ? new Date(centro.fecha_cierre_productivo).toISOString().split("T")[0]
          : "",
        jefe_centro: centro.jefe_centro || "",
        etapa_ciclo_cultivo: centro.etapa_ciclo_cultivo || "",
        ponton_id: centro.ponton_id || null,
        ruta_id: centro.ruta_id || null,
        latitud: centro.latitud || "",
        longitud: centro.longitud || "",
      });
    }
  }, [centro]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await actualizarCentro(centro.id, formData);
      onClose();
    } catch (error) {
      console.error("Error al actualizar el centro:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Editar Centro</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Nombre del Centro */}
          <div className="mb-4">
            <label className="block text-gray-700">Nombre del Centro</label>
            <input
              type="text"
              name="nombre_centro"
              value={formData.nombre_centro}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Nombre del Centro"
              required
            />
          </div>
          {/* Fecha de Apertura Productiva */}
          <div className="mb-4">
            <label className="block text-gray-700">
              Fecha de Apertura Productiva
            </label>
            <input
              type="date"
              name="fecha_apertura_productiva"
              value={formData.fecha_apertura_productiva}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          {/* Fecha de Cierre Productivo */}
          <div className="mb-4">
            <label className="block text-gray-700">
              Fecha de Cierre Productivo
            </label>
            <input
              type="date"
              name="fecha_cierre_productivo"
              value={formData.fecha_cierre_productivo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          {/* Jefe del Centro */}
          <div className="mb-4">
            <label className="block text-gray-700">Jefe del Centro</label>
            <input
              type="text"
              name="jefe_centro"
              value={formData.jefe_centro}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Nombre del Jefe del Centro"
              required
            />
          </div>
          {/* Etapa del Ciclo de Cultivo */}
          <div className="mb-4">
            <label className="block text-gray-700">
              Etapa del Ciclo de Cultivo
            </label>
            <input
              type="text"
              name="etapa_ciclo_cultivo"
              value={formData.etapa_ciclo_cultivo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Etapa del Ciclo de Cultivo"
              required
            />
          </div>
          {/* Latitud */}
          <div className="mb-4">
            <label className="block text-gray-700">Latitud</label>
            <input
              type="number"
              step="0.000001"
              name="latitud"
              value={formData.latitud}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Latitud"
              required
            />
          </div>
          {/* Longitud */}
          <div className="mb-4">
            <label className="block text-gray-700">Longitud</label>
            <input
              type="number"
              step="0.000001"
              name="longitud"
              value={formData.longitud}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Longitud"
              required
            />
          </div>
          {/* Botones */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarCentro;
