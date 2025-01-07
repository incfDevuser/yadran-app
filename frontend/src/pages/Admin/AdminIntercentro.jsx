import React, { useState, useEffect } from "react";
import CreateLanchaForm from "./Forms/CreateLanchaForm";
import CreateRutaIntercentroForm from "./Forms/CreateRutaIntercentroForm";
import DetalleLanchaModal from "./Forms/DetalleLanchaModal";
import DetallePontonModal from "./Forms/DetallePontonModal";
import { useIntercentros } from "../../Context/IntercentroContext";
import AdminAside from "./AdminAside";

const AdminIntercentro = () => {
  const {
    rutasIntercentro,
    obtenerRutasIntercentro,
    obtenerLanchasPorMovimiento,
    obtenerPontonesPorMovimiento,
  } = useIntercentros();
  const [showLanchaModal, setShowLanchaModal] = useState(false);
  const [showRutaModal, setShowRutaModal] = useState(false);
  const [showDetalleModal, setShowDetalleModal] = useState(false);
  const [showPontonModal, setShowPontonModal] = useState(false);
  const [pontones, setPontones] = useState([]);
  const [lanchas, setLanchas] = useState([]);
  const [selectedMovimiento, setSelectedMovimiento] = useState(null);

  const handleVerDetalles = async (movimientoId) => {
    try {
      const lanchasData = await obtenerLanchasPorMovimiento(movimientoId);
      setLanchas(lanchasData);
      setSelectedMovimiento(movimientoId);
      setShowDetalleModal(true);
    } catch (error) {
      console.error("Error al obtener los detalles del movimiento:", error);
    }
  };
  const handleVerDetallesPontones = async (movimientoId) => {
    try {
      const pontonesData = await obtenerPontonesPorMovimiento(movimientoId);
      setPontones(pontonesData);
      setShowPontonModal(true);
    } catch (error) {
      console.error("Error al obtener los detalles del movimiento:", error);
    }
  };

  return (
    <div className="flex w-full h-full mt-11">
      <div className="flex justify-center gap-7">
        <AdminAside />
        <div className="mt-7">
          <h1 className="text-3xl font-bold mb-4">
            Administrar Rutas de Intercentro
          </h1>

          <div className="mb-4">
            <button
              onClick={() => setShowLanchaModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Crear Lancha
            </button>
            <button
              onClick={() => setShowRutaModal(true)}
              className="bg-green-500 text-white px-4 py-2 ml-4 rounded-md"
            >
              Crear Ruta Intercentro
            </button>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Rutas de Intercentro
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rutasIntercentro.map((ruta) => (
                <div
                  key={ruta.id}
                  className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {ruta.centro_origen_nombre} ➡️ {ruta.centro_destino_nombre}
                  </h3>
                  <p className="text-sm text-gray-600">
                    <strong>Lancha:</strong> {ruta.lancha_nombre}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Estado:</strong>{" "}
                    <span
                      className={`px-2 py-1 rounded ${
                        ruta.estado === "pendiente"
                          ? "bg-yellow-100 text-yellow-700"
                          : ruta.estado === "aprobado"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {ruta.estado}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Comentarios:</strong>{" "}
                    {ruta.comentarios || "Sin comentarios"}
                  </p>
                  <div className="flex gap-2 items-center justify-start">
                    <button
                      onClick={() => {
                        handleVerDetalles(ruta.movimiento_id);
                      }}
                      className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
                    >
                      Lanchas
                    </button>
                    <button
                      onClick={() =>
                        handleVerDetallesPontones(ruta.movimiento_id)
                      }
                      className="bg-purple-500 text-white px-4 py-2 mt-4 rounded-md"
                    >
                      Pontones
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {showLanchaModal && (
            <CreateLanchaForm closeModal={() => setShowLanchaModal(false)} />
          )}
          {showRutaModal && (
            <CreateRutaIntercentroForm
              closeModal={() => setShowRutaModal(false)}
            />
          )}
          {showDetalleModal && (
            <DetalleLanchaModal
              lanchas={lanchas}
              closeModal={() => setShowDetalleModal(false)}
            />
          )}
          {showPontonModal && (
            <DetallePontonModal
              pontones={pontones}
              closeModal={() => setShowPontonModal(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminIntercentro;
