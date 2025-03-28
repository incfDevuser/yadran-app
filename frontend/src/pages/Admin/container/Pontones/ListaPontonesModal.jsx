import React, { useEffect, useState } from "react";
import { FaQrcode } from "react-icons/fa";
import { usePontones } from "../../../../Context/PontonesContext";
import DescargarPDFPontonButton from "../../../../components/DescargarPDFPontonButton";
import EditarPonton from "./EditarPonton";

const ListaPontonesModal = ({ isOpen, onClose }) => {
  const { pontones, obtenerPontones, loading, error } = usePontones();
  const [pontonSeleccionado, setPontonSeleccionado] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      obtenerPontones();
    }
  }, [isOpen]);

  const abrirModalEditar = (ponton) => {
    setPontonSeleccionado(ponton);
    setIsEditModalOpen(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[600px] p-5 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Lista de Pontones</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            X
          </button>
        </div>
        {loading ? (
          <p>Cargando pontones...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <div>
            {pontones.length > 0 ? (
              pontones.map((ponton) => (
                <div
                  key={ponton.ponton_id}
                  className="p-4 border rounded-md shadow-sm mb-2 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold">{ponton.nombre_ponton}</h3>
                    <p>
                      Concesión: {ponton.nombre_concesion || "No disponible"}
                    </p>
                    <p>
                      Habitabilidad General:{" "}
                      {ponton.habitabilidad_general || "No especificado"}
                    </p>
                    <p>
                      Habitabilidad Interna:{" "}
                      {ponton.habitabilidad_interna || "No especificado"}
                    </p>
                    <p>
                      Habitabilidad Externa:{" "}
                      {ponton.habitabilidad_externa || "No especificado"}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-4">
                    <button
                      onClick={() => abrirModalEditar(ponton)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                      Editar
                    </button>
                    <DescargarPDFPontonButton ponton={ponton} />
                  </div>
                </div>
              ))
            ) : (
              <p>No hay pontones disponibles.</p>
            )}
          </div>
        )}
        <EditarPonton
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          ponton={pontonSeleccionado}
        />
      </div>
    </div>
  );
};

export default ListaPontonesModal;