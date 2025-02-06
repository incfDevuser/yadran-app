import React, { useEffect, useState } from "react";
import { useCentros } from "../../../../Context/CentrosContext";
import EditarCentro from "./EditarCentro";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserTie,
  FaWarehouse,
} from "react-icons/fa";
import { WiDaySunny, WiHumidity, WiStrongWind } from "react-icons/wi";

const ListaCentrosModal = ({ isOpen, onClose }) => {
  const { centros, obtenerCentros, loading, error } = useCentros();
  const [centroSeleccionado, setCentroSeleccionado] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      obtenerCentros();
    }
  }, [isOpen]);

  const abrirModalEditar = (centro) => {
    setCentroSeleccionado(centro);
    setIsEditModalOpen(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[800px] p-5 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Lista de Centros</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-lg font-bold"
          >
            X
          </button>
        </div>

        {loading ? (
          <p>Cargando centros...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div>
            {centros.length > 0 ? (
              centros.map((centro) => (
                <div
                  key={centro.id}
                  className="p-4 border rounded-md shadow-sm mb-4 bg-gray-100"
                >
                  <h3 className="font-bold text-lg mb-2 text-blue-700">
                    {centro.nombre_centro}
                  </h3>
                  <p className="text-gray-700 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-500" />
                    Ubicación:{" "}
                    {`Lat: ${centro.latitud}, Lon: ${centro.longitud}`}
                  </p>
                  <p className="text-gray-700 flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-500" />
                    Apertura:{" "}
                    {new Date(
                      centro.fecha_apertura_productiva
                    ).toLocaleDateString()}{" "}
                    - Cierre:{" "}
                    {new Date(
                      centro.fecha_cierre_productivo
                    ).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 flex items-center gap-2">
                    <FaUserTie className="text-blue-500" />
                    Jefe del centro: {centro.jefe_centro}
                  </p>
                  <p className="text-gray-700 flex items-center gap-2">
                    <FaWarehouse className="text-blue-500" />
                    Pontón: {centro.nombre_ponton}
                  </p>
                  <p className="text-gray-700 flex items-center gap-2">
                    <FaWarehouse className="text-blue-500" />
                    Ruta asociada: {centro.nombre_ruta}
                  </p>
                  <p className="text-gray-700">
                    <strong>Etapa del ciclo:</strong>{" "}
                    {centro.etapa_ciclo_cultivo || "No especificada"}
                  </p>
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-800">Clima</h4>
                    {centro.clima ? (
                      <div className="mt-2 p-3 bg-white rounded-md shadow">
                        <div className="flex items-center gap-4">
                          <WiDaySunny className="text-yellow-500 text-4xl" />
                          <div>
                            <p className="text-gray-700">
                              <strong>
                                {centro.clima.weather[0].description}
                              </strong>
                            </p>
                            <p className="text-gray-600">
                              Temperatura: {centro.clima.main.temp}°C
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center gap-2">
                            <WiHumidity className="text-blue-500 text-2xl" />
                            <p className="text-gray-600">
                              Humedad: {centro.clima.main.humidity}%
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <WiStrongWind className="text-gray-500 text-2xl" />
                            <p className="text-gray-600">
                              Viento: {centro.clima.wind.speed} m/s
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500">
                        No hay datos de clima disponibles.
                      </p>
                    )}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => abrirModalEditar(centro)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                      Editar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay centros disponibles.</p>
            )}
          </div>
        )}
        <EditarCentro
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          centro={centroSeleccionado}
        />
      </div>
    </div>
  );
};

export default ListaCentrosModal;
