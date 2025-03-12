import React, { memo } from "react";
import { FaTimes, FaUsers } from "react-icons/fa";

const ListaPasajerosModal = memo(({ show, handleClose, pasajeros }) => {
  if (!show) return null;

  console.log("Pasajeros en modal:", pasajeros);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-4xl">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FaUsers className="text-purple-500" /> Lista de Pasajeros
          </h2>
          <button
            onClick={handleClose}
            className="text-red-500 hover:text-red-700 text-xl"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mt-4 max-h-[60vh] overflow-y-auto">
          {!pasajeros ? (
            <div className="text-center text-gray-500 py-8">
              Cargando pasajeros...
            </div>
          ) : pasajeros.length > 0 ? (
            <div className="grid gap-4">
              {pasajeros.map((trayecto, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-bold text-lg mb-2">
                    Trayecto: {trayecto.trayecto_origen} - {trayecto.trayecto_destino}
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-4 py-2">Nombre</th>
                          <th className="px-4 py-2">Email</th>
                          <th className="px-4 py-2">Tipo</th>
                          <th className="px-4 py-2">Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {trayecto.pasajeros.map((pasajero, idx) => (
                          <tr key={idx} className="border-b">
                            <td className="px-4 py-2">{pasajero.nombre_usuario}</td>
                            <td className="px-4 py-2">{pasajero.email_usuario}</td>
                            <td className="px-4 py-2">
                              {pasajero.usuario_id ? 'Usuario' : 'Trabajador'}
                            </td>
                            <td className="px-4 py-2">
                              <span className={`px-2 py-1 rounded-full text-sm ${
                                pasajero.estado_usuario === 'Aprobado' 
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {pasajero.estado_usuario}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              No hay pasajeros registrados para este vehículo.
            </div>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleClose}
            className="bg-black text-white font-semibold py-2 px-4 rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
});

ListaPasajerosModal.displayName = 'ListaPasajerosModal';
export default ListaPasajerosModal;
