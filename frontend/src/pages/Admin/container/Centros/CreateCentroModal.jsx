import React, { useState, useEffect } from "react";
import { usePontones } from "../../../../Context/PontonesContext";
import { useCentros } from "../../../../Context/CentrosContext";
import { useRutas } from "../../../../Context/RoutesContext";

const CreateCentroModal = ({ isOpen, onClose }) => {
  const { crearCentro } = useCentros();
  const { pontones, loading: loadingPontones } = usePontones();
  const { rutas, loading: loadingRutas } = useRutas();

  const initialState = {
    nombre_centro: "",
    fecha_apertura_productiva: "",
    fecha_cierre_productivo: "",
    jefe_centro: "",
    etapa_ciclo_cultivo: "",
    estructuras: "",
    ponton_id: null,
    ruta_id: null,
    latitud: "",
    longitud: "",
  };

  const [nuevoCentro, setNuevoCentro] = useState(initialState);

  // Reinicia los valores del formulario al cerrar el modal
  useEffect(() => {
    if (!isOpen) {
      setNuevoCentro(initialState);
    }
  }, [isOpen]);

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoCentro({
      ...nuevoCentro,
      [name]: value,
    });
  };

  // Crear el centro
  const handleCreate = async () => {
    try {
      if (!nuevoCentro.latitud || !nuevoCentro.longitud) {
        alert("Por favor ingresa la latitud y longitud");
        return;
      }
      await crearCentro(nuevoCentro);
      setNuevoCentro(initialState); // Reinicia el formulario después de crear
      onClose();
    } catch (error) {
      console.error("Error al crear el centro", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Crear Nuevo Centro</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Nombre del centro */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Nombre del Centro
            </label>
            <input
              type="text"
              name="nombre_centro"
              value={nuevoCentro.nombre_centro}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Nombre del Centro"
              required
            />
          </div>

          {/* Fecha de apertura productiva */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Fecha de Apertura Productiva
            </label>
            <input
              type="date"
              name="fecha_apertura_productiva"
              value={nuevoCentro.fecha_apertura_productiva}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          {/* Fecha de cierre productivo */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Fecha de Cierre Productivo
            </label>
            <input
              type="date"
              name="fecha_cierre_productivo"
              value={nuevoCentro.fecha_cierre_productivo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          {/* Jefe del centro */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Jefe del Centro</label>
            <input
              type="text"
              name="jefe_centro"
              value={nuevoCentro.jefe_centro}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Nombre del Jefe del Centro"
              required
            />
          </div>

          {/* Etapa del ciclo de cultivo */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Etapa del Ciclo de Cultivo
            </label>
            <input
              type="text"
              name="etapa_ciclo_cultivo"
              value={nuevoCentro.etapa_ciclo_cultivo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Etapa del Ciclo de Cultivo"
              required
            />
          </div>

          {/* Estructuras */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Estructuras</label>
            <input
              type="text"
              name="estructuras"
              value={nuevoCentro.estructuras}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Descripción de las Estructuras"
              required
            />
          </div>

          {/* Latitud */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Latitud</label>
            <input
              type="number"
              step="0.000001"
              name="latitud"
              value={nuevoCentro.latitud}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Latitud (ej: -33.4489)"
              required
            />
          </div>

          {/* Longitud */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Longitud</label>
            <input
              type="number"
              step="0.000001"
              name="longitud"
              value={nuevoCentro.longitud}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Longitud (ej: -70.6693)"
              required
            />
          </div>

          {/* Pontón asociado */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Ponton Asociado</label>
            {loadingPontones ? (
              <p>Cargando Pontones...</p>
            ) : (
              <select
                name="ponton_id"
                value={nuevoCentro.ponton_id || ""}
                onChange={(e) =>
                  setNuevoCentro({
                    ...nuevoCentro,
                    ponton_id:
                      e.target.value === "" ? null : Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="">Selecciona un Ponton</option>
                {pontones.map((ponton) => (
                  <option key={ponton.ponton_id} value={ponton.ponton_id}>
                    {ponton.nombre_ponton}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Ruta asociada */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Ruta Asociada</label>
            {loadingRutas ? (
              <p>Cargando Rutas...</p>
            ) : (
              <select
                name="ruta_id"
                value={nuevoCentro.ruta_id || ""}
                onChange={(e) =>
                  setNuevoCentro({
                    ...nuevoCentro,
                    ruta_id:
                      e.target.value === "" ? null : Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="">Selecciona una Ruta</option>
                {rutas.map((ruta) => (
                  <option key={ruta.id} value={ruta.id}>
                    {ruta.nombre_ruta}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Botones */}
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

export default CreateCentroModal;
