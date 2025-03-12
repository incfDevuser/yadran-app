import React, { useEffect, useState } from "react";
import { useJurisdiccion } from "../../../../Context/JurisdiccionContext";
import EditarJurisdiccion from "./EditarJurisdiccion";

const ListaJurisdiccionesModal = ({ isOpen, onClose }) => {
  const { jurisdicciones, obtenerJurisdicciones, loading, error } = useJurisdiccion();
  const [jurisdiccionSeleccionada, setJurisdiccionSeleccionada] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      obtenerJurisdicciones();
    }
  }, [isOpen]);

  const abrirModalEditar = (jurisdiccion) => {
    setJurisdiccionSeleccionada(jurisdiccion);
    setIsEditModalOpen(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[600px] p-5 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Lista de Jurisdicciones</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            X
          </button>
        </div>
        {loading ? (
          <p>Cargando jurisdicciones...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : jurisdicciones.length > 0 ? (
          jurisdicciones.map((jurisdiccion) => (
            <div key={jurisdiccion.id} className="p-4 border rounded-md shadow-sm mb-2">
              <h3>{jurisdiccion.nombre_jurisdiccion}</h3>
              <p>Ubicación: {jurisdiccion.ubicacion_geografica}</p>
              <p>Sectores: {jurisdiccion.sectores}</p>
              <p>Estado: {jurisdiccion.estado}</p>
              <p>Tipo de Embarcación: {jurisdiccion.tipo_embarcacion}</p>
              <p>Contacto: {jurisdiccion.contacto}</p>
              <p>
                Fecha Última Modificación:{" "}
                {new Date(jurisdiccion.fecha_ultima_modificacion).toLocaleDateString()}
              </p>
              <button
                onClick={() => abrirModalEditar(jurisdiccion)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mt-2"
              >
                Editar
              </button>
            </div>
          ))
        ) : (
          <p>No hay jurisdicciones disponibles.</p>
        )}
        <EditarJurisdiccion
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          jurisdiccion={jurisdiccionSeleccionada}
        />
      </div>
    </div>
  );
};

export default ListaJurisdiccionesModal;