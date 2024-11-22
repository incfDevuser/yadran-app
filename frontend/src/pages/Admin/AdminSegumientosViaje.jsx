import React, { useState } from "react";
import AdminAside from "./AdminAside";
import { useViajes } from "../../Context/ViajesContext";

const AdminSegumientosViaje = () => {
  const { viajes, obtenerDetalleViaje, detalleViaje, loading, error } =
    useViajes();
  const [viajeSeleccionado, setViajeSeleccionado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla si el modal está abierto
  const [filtro, setFiltro] = useState("");

  const handleSeleccionarViaje = async (id) => {
    setViajeSeleccionado(id);
    try {
      await obtenerDetalleViaje(id);
      setIsModalOpen(true); // Abre el modal después de cargar los datos
    } catch (err) {
      console.error("Error al obtener el detalle del viaje:", err);
    }
  };

  const filtrarViajes = () =>
    viajes.filter((viaje) =>
      viaje.nombre?.toLowerCase().includes(filtro.toLowerCase())
    );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Cargando viajes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminAside />

      <div className="flex-grow p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Seguimiento de Viajes
        </h1>

        {/* Filtro de viajes */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar viaje por nombre"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Lista de viajes */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Lista de Viajes
          </h2>
          {viajes.length === 0 ? (
            <p className="text-gray-500">No hay viajes disponibles.</p>
          ) : (
            <ul className="space-y-3">
              {filtrarViajes().map((viaje) => (
                <li
                  key={viaje.id}
                  className={`p-4 rounded-lg shadow-md cursor-pointer ${
                    viajeSeleccionado === viaje.id
                      ? "bg-blue-100 border-blue-500 border-2"
                      : "bg-white border border-gray-200 hover:bg-gray-100"
                  }`}
                  onClick={() => handleSeleccionarViaje(viaje.id)}
                >
                  <p className="font-medium text-gray-800">{viaje.nombre}</p>
                  <p className="text-gray-500 text-sm">{viaje.descripcion}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Modal para detalle del viaje */}
        {isModalOpen && detalleViaje && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-4/5 max-w-4xl overflow-y-auto max-h-[90vh]">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Detalle del Viaje
              </h2>
              <div className="mb-6">
                <p>
                  <strong>Nombre:</strong> {detalleViaje.viaje.nombre_viaje}
                </p>
                <p>
                  <strong>Descripción:</strong>{" "}
                  {detalleViaje.viaje.descripcion_viaje}
                </p>
                <p>
                  <strong>Ruta:</strong>{" "}
                  {detalleViaje.viaje.nombre_ruta || "No especificada"}
                </p>
              </div>

              {/* Trayectos con usuarios */}
              {/* Trayectos con usuarios */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  Trayectos y Usuarios
                </h3>
                {detalleViaje.trayectos.map((trayecto) => (
                  <div
                    key={trayecto.trayecto_id}
                    className="p-4 bg-gray-100 rounded-lg shadow-md mb-4"
                  >
                    <p>
                      <strong>Origen:</strong> {trayecto.trayecto_origen}
                    </p>
                    <p>
                      <strong>Destino:</strong> {trayecto.trayecto_destino}
                    </p>
                    <p>
                      <strong>Duración:</strong> {trayecto.trayecto_duracion}{" "}
                      minutos
                    </p>
                    <p>
                      <strong>Vehículo:</strong> {trayecto.tipo_vehiculo}
                    </p>
                    <p>
                      <strong>Chofer:</strong> {trayecto.nombre_chofer} (
                      {trayecto.email_chofer})
                    </p>
                    <h4 className="font-semibold mt-2">Usuarios:</h4>
                    <ul className="space-y-4">
                      {detalleViaje.usuariosVehiculos.filter(
                        (usuario) =>
                          usuario.trayecto_id === trayecto.trayecto_id
                      ).length > 0 ? (
                        detalleViaje.usuariosVehiculos
                          .filter(
                            (usuario) =>
                              usuario.trayecto_id === trayecto.trayecto_id
                          )
                          .map((usuario, index) => (
                            <li
                              key={index}
                              className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md"
                            >
                              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg mr-4">
                                {usuario.nombre_usuario.charAt(0)}
                              </div>
                              <div className="flex-grow">
                                <p className="font-semibold text-gray-800">
                                  {usuario.nombre_usuario}
                                </p>
                                <p className="text-gray-500 text-sm flex items-center">
                                  {usuario.email_usuario}
                                </p>
                              </div>
                              <div
                                className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                  usuario.estado_usuario === "Aprobado"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-red-100 text-red-600"
                                }`}
                              >
                                {usuario.estado_usuario}
                              </div>
                            </li>
                          ))
                      ) : (
                        <p className="text-gray-500">
                          No hay usuarios para este trayecto.
                        </p>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
              {/* Usuarios en el pontón */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  Usuarios Registrados en el Pontón
                </h3>
                {detalleViaje.usuariosPonton.length > 0 ? (
                  <ul className="space-y-4">
                    {detalleViaje.usuariosPonton.map((usuario, index) => (
                      <li
                        key={index}
                        className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md"
                      >
                        {/* Icono de usuario */}
                        <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-lg mr-4">
                          {usuario.nombre_usuario.charAt(0)}
                        </div>

                        {/* Detalles del usuario */}
                        <div className="flex-grow">
                          <p className="font-semibold text-gray-800">
                            {usuario.nombre_usuario}
                          </p>
                          <p className="text-gray-500 text-sm flex items-center">
                            {usuario.email_usuario}
                          </p>
                        </div>

                        {/* Nombre del pontón */}
                        <div className="px-3 py-1 text-sm font-semibold bg-indigo-100 text-indigo-600 rounded-full">
                          {usuario.nombre_ponton}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No hay usuarios en el pontón.</p>
                )}
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSegumientosViaje;
