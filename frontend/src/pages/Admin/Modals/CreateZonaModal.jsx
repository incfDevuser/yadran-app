import React, { useState } from "react";
import { useZonas } from "../../../Context/ZonasContext";
import { useJurisdiccion } from "../../../Context/JurisdiccionContext";

const CreateZonaModal = ({ isOpen, onClose }) => {
  const { crearZona } = useZonas();
  const { jurisdicciones, loading: loadingJurisdicciones } = useJurisdiccion();

  //Estado para los campos de las zonas
  const [nuevaZona, setNuevaZona] = useState({
    nombre_zona: "",
    ubicacion_geografica: "",
    pais: "",
    region: "",
    fecha_apertura: "",
    fecha_cierre: "",
    jurisdiccion_id: 0,
    estado_zona: "",
    descripcion: "",
  });
  //Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaZona({
      ...nuevaZona,
      [name]: value,
    });
  };
  //Crear la nueva zona
  const handleCreate = async () => {
    try {
      await crearZona(nuevaZona);
      onClose();
    } catch (error) {
      console.error("Error al crear la zona", error);
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md  max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Crear Nueva Zona</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nombre</label>
            <input
              type="text"
              name="nombre_zona"
              value={nuevaZona.nombre_zona}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Nombre de la Zona"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Ubicación Geográfica
            </label>
            <input
              type="text"
              name="ubicacion_geografica"
              value={nuevaZona.ubicacion_geografica}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Ubicación Geográfica"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Pais</label>
            <input
              type="text"
              name="pais"
              value={nuevaZona.pais}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Pais donde se encuentra la zona"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Region</label>
            <input
              type="text"
              name="region"
              value={nuevaZona.region}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Region donde se encuentra la zona"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Fecha Apertura</label>
            <input
              type="date"
              name="fecha_apertura"
              value={nuevaZona.fecha_apertura}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Fecha de Apertura"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Fecha Cierre</label>
            <input
              type="date"
              name="fecha_cierre"
              value={nuevaZona.fecha_cierre}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Fecha de Cierre"
            />
          </div>
          {/* JUSDISCCION PERO DEBE SER UN SELECT CON OPTIONS */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Jurisdiccion</label>
            {loadingJurisdicciones ? (
              <p>Cargando Jurisdicciones</p>
            ) : (
              <select
                name="jurisdiccion_id"
                value={nuevaZona.jurisdiccion_id}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              >
                {/* Mapear las options en base a los valores */}
                <option value="">Selecciona una Jurisdiccion</option>
                {jurisdicciones.map((jurisdiccion)=>(
                    <option key={jurisdiccion.id} value={jurisdiccion.id}>
                        {jurisdiccion.nombre_jurisdiccion}
                    </option>
                ))}
              </select>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Estado Zona</label>
            <input
              type="text"
              name="estado_zona"
              value={nuevaZona.estado_zona}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Estado de la Zona"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Descripcion</label>
            <input
              type="text"
              name="descripcion"
              value={nuevaZona.descripcion}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Descripcion Adicional"
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

export default CreateZonaModal;
