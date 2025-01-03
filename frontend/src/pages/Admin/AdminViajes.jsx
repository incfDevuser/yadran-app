import React, { useState } from "react";
import AdminAside from "./AdminAside";
import { useViajes } from "../../Context/ViajesContext";
import { useRutas } from "../../Context/RoutesContext";
import LoadingViajes from "./components/LoadingViajes";
import {
  FaRoute,
  FaCalendarAlt,
  FaInfoCircle,
  FaBriefcase,
  FaPlane,
  FaPlaneDeparture,
  FaShip,
  FaAnchor,
  FaCar,
  FaHotel,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const AdminViajes = () => {
  const { viajes, loading, error, crearViaje, obtenerViajes } = useViajes();
  const { rutas, loading: loadingRutas } = useRutas();
  const [selectedViaje, setSelectedViaje] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newViaje, setNewViaje] = useState({
    nombre: "",
    descripcion: "",
    ruta_id: "",
    tipo_viaje: "",
  });

  const handleChange = (e) => {
    setNewViaje({ ...newViaje, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearViaje(newViaje);
      await obtenerViajes();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al crear el viaje:", error);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingViajes/>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-lg text-red-500">
          Error al cargar los viajes: {error}
        </div>
      </div>
    );
  }
  const handleOpenModal = (viaje) => {
    setSelectedViaje(viaje);
  };
  const handleCloseModal = () => {
    setSelectedViaje(null);
  };
  return (
    <div className="flex w-full h-full mt-11">
      <AdminAside />
      <main className="flex-1 p-5">
        <div className="flex justify-between items-center mb-11 p-2">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Administración de Viajes
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="border rounded-md p-2 bg-blue-500 text-white"
          >
            Crear un Nuevo Viaje
          </button>
        </div>
        <div className="mt-8">
          <h1 className="font-bold text-2xl text-gray-700 mb-4">
            Lista de Viajes <span className="text-blue-600">Totales</span>
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {viajes.map((viaje) => (
              <div
                key={viaje.id}
                className={`flex flex-col shadow-lg rounded-lg hover:shadow-xl transition-shadow border p-6 cursor-pointer ${
                  viaje.tipo === "Gerencial"
                    ? "border-yellow-500 bg-yellow-100"
                    : "border-gray-200 bg-white"
                }`}
                onClick={() => handleOpenModal(viaje)}
              >
                {/* Icono y Nombre del viaje */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`text-2xl p-2 rounded-full ${
                      viaje.tipo === "Gerencial"
                        ? "bg-yellow-500 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {viaje.tipo === "Gerencial" ? <FaBriefcase /> : <FaRoute />}
                  </div>
                  <div>
                    <p className="font-bold text-xl text-gray-900">
                      {viaje.nombre}
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      {viaje.descripcion}
                    </p>
                  </div>
                </div>

                {/* Información del viaje */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaRoute className="text-blue-500" />
                    <span className="text-sm font-semibold">
                      Ruta:{" "}
                      <span className="text-blue-600">{viaje.nombre_ruta}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaCalendarAlt className="text-blue-500" />
                    <span className="text-xs">
                      Creado el:{" "}
                      {new Date(viaje.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  {viaje.tipo_viaje ? (
                    <div
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        viaje.tipo_viaje === "gerencial"
                          ? "bg-yellow-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {viaje.tipo_viaje === "gerencial"
                        ? "Gerencial"
                        : "Normal"}
                    </div>
                  ) : (
                    <div className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-800">
                      Normal
                    </div>
                  )}
                </div>

                {/* Botón para ver trayectos */}
                <button className="bg-blue-500 rounded-lg p-3 text-white">
                  <FaInfoCircle className="inline-block mr-2" />
                  Ver Trayectos
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Modal para mostrar los trayectos */}

        {selectedViaje && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg max-w-2xl w-full shadow-2xl overflow-y-auto max-h-[80vh]">
              {/* Encabezado */}
              <div className="flex justify-between items-center border-b pb-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  🚍 Trayectos del Viaje:{" "}
                  <span className="text-blue-600">{selectedViaje.nombre}</span>
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-red-500 hover:text-red-600 transition-colors text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              {/* Contenido de Trayectos */}
              <div className="space-y-6">
                {selectedViaje.trayectos.map((trayecto) => {
                  // Lógica para determinar si es área de descanso
                  const esAreaDescanso =
                    trayecto.origen === trayecto.destino ||
                    !trayecto.vehiculo_id;

                  // Determinar el icono basado en el tipo de vehículo
                  let vehiculoIcono;
                  let estiloVehiculo = "text-gray-600";

                  switch (trayecto.nombre_vehiculo) {
                    case "Avioneta":
                      vehiculoIcono = <FaPlaneDeparture />;
                      estiloVehiculo = "text-blue-500";
                      break;
                    case "Avión comercial":
                      vehiculoIcono = <FaPlane />;
                      estiloVehiculo = "text-indigo-500";
                      break;
                    case "Lancha menor":
                      vehiculoIcono = <FaShip />;
                      estiloVehiculo = "text-green-500";
                      break;
                    case "Lancha grande":
                      vehiculoIcono = <FaAnchor />;
                      estiloVehiculo = "text-teal-500";
                      break;
                    default:
                      vehiculoIcono = <FaCar />;
                      estiloVehiculo = "text-gray-500";
                      break;
                  }

                  if (esAreaDescanso) {
                    return (
                      <div
                        key={trayecto.id}
                        className="flex items-start gap-4 border border-yellow-300 rounded-lg p-4 bg-yellow-50 shadow-sm"
                      >
                        <div className="text-yellow-500 text-2xl">
                          <FaHotel />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-yellow-600 mb-1">
                            Área de Descanso: Hotel
                          </h3>
                          <p className="text-sm font-medium text-gray-700">
                            <FaMapMarkerAlt className="inline-block mr-1 text-gray-600" />
                            <strong>Ubicación:</strong> {trayecto.origen}
                          </p>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={trayecto.id}
                      className="flex items-start gap-4 border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm"
                    >
                      <div className={`text-2xl ${estiloVehiculo}`}>
                        {vehiculoIcono}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                          Trayecto en {trayecto.nombre_vehiculo || "Vehículo"}
                        </h3>
                        <p className="text-sm font-medium text-gray-700">
                          <FaMapMarkerAlt className="inline-block mr-1 text-gray-600" />
                          <strong>Origen:</strong> {trayecto.origen}
                        </p>
                        <p className="text-sm font-medium text-gray-700">
                          <FaMapMarkerAlt className="inline-block mr-1 text-gray-600" />
                          <strong>Destino:</strong> {trayecto.destino}
                        </p>
                        <p className="text-sm font-medium text-gray-700">
                          <FaClock className="inline-block mr-1 text-gray-600" />
                          <strong>Duración Estimada:</strong>{" "}
                          {trayecto.duracion_estimada} minutos
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Botón de cierre */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de creación de viaje */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg max-w-md w-full shadow-xl">
              <h2 className="text-2xl font-bold mb-6">Crear un Nuevo Viaje</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Viaje
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={newViaje.nombre}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <input
                    type="text"
                    name="descripcion"
                    value={newViaje.descripcion}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ruta
                  </label>
                  <select
                    name="ruta_id"
                    value={newViaje.ruta_id}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    required
                  >
                    <option value="">Seleccionar Ruta</option>
                    {!loadingRutas && rutas.length > 0 ? (
                      rutas.map((ruta) => (
                        <option key={ruta.id} value={ruta.id}>
                          {ruta.nombre_ruta ? ruta.nombre_ruta : "Sin Nombre"}
                        </option>
                      ))
                    ) : (
                      <option disabled>No hay rutas disponibles</option>
                    )}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Viaje
                  </label>
                  <select
                    name="tipo_viaje"
                    value={newViaje.tipo_viaje}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    required
                  >
                    <option value="">Seleccionar Tipo de Viaje</option>
                    <option value="normal">Normal</option>
                    <option value="gerencial">Gerencial</option>
                  </select>
                </div>
                <div className="text-right">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Crear Viaje
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="ml-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminViajes;
