import React, { useState, useEffect } from "react";
import { useIntercentros } from "../../../Context/IntercentroContext";
import { useCentros } from "../../../Context/CentrosContext";

const CreateRutaIntercentroForm = ({ closeModal }) => {
  const { crearRutaIntercentro, lanchas, obtenerLanchas } = useIntercentros();
  const { centros } = useCentros();

  const [fecha, setFecha] = useState("");
  const [centroOrigen, setCentroOrigen] = useState("");
  const [centroDestino, setCentroDestino] = useState("");
  const [lanchaId, setLanchaId] = useState("");
  const [comentarios, setComentarios] = useState("");

  useEffect(() => {
    obtenerLanchas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearRutaIntercentro({
        fecha,
        centro_origen_id: parseInt(centroOrigen),
        centro_destino_id: parseInt(centroDestino),
        lancha_id: parseInt(lanchaId),
        estado: "pendiente",
        comentarios,
      });
      closeModal();
    } catch (error) {
      console.error("Error al crear la ruta:", error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Crear Ruta de Intercentro</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Fecha</label>
            <input
              type="datetime-local"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Centro Origen</label>
            <select
              value={centroOrigen}
              onChange={(e) => setCentroOrigen(e.target.value)}
              className="w-full border rounded px-2 py-1"
            >
              <option value="">Seleccione un centro</option>
              {centros.map((centro) => (
                <option key={centro.id} value={centro.id}>
                  {centro.nombre_centro}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Centro Destino</label>
            <select
              value={centroDestino}
              onChange={(e) => setCentroDestino(e.target.value)}
              className="w-full border rounded px-2 py-1"
            >
              <option value="">Seleccione un centro</option>
              {centros.map((centro) => (
                <option key={centro.id} value={centro.id}>
                  {centro.nombre_centro}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Lancha</label>
            <select
              value={lanchaId}
              onChange={(e) => setLanchaId(e.target.value)}
              className="w-full border rounded px-2 py-1"
            >
              <option value="">Seleccione una lancha</option>
              {lanchas.map((lancha) => (
                <option key={lancha.lancha_id} value={lancha.lancha_id}>
                  {lancha.lancha_nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Comentarios</label>
            <textarea
              value={comentarios}
              onChange={(e) => setComentarios(e.target.value)}
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
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRutaIntercentroForm;
