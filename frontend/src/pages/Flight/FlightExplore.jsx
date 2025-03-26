import { useState } from "react";
import { useUsuario } from "../../Context/UsuarioContext";
import { useViajes } from "../../Context/ViajesContext";
import { FlightCard } from "../../container";
import HotelCard from "../../container/Flight/HotelCard";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiMapPin,
  FiCalendar,
  FiArrowRight,
  FiX,
  FiClock,
  FiCloud,
  FiSun,
  FiThermometer,
  FiWind,
} from "react-icons/fi";
import LoadingViajes from "../Admin/components/LoadingViajes";
const FlightExplore = () => {
  const { viajes, loading, error } = useViajes();
  const { rol } = useUsuario(); // Obtenemos el rol del usuario
  const [selectedViaje, setSelectedViaje] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterByDestination, setFilterByDestination] = useState("");
  const [filterByOrigin, setFilterByOrigin] = useState("");

  if (loading)
    return <LoadingViajes/>;
  if (error)
    return (
      <p className="text-center text-xl mt-8 text-red-500">
        Error al cargar viajes: {error}
      </p>
    );

  const openModal = (viaje) => {
    setSelectedViaje(viaje);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedViaje(null);
    setModalOpen(false);
  };

  // Filtrar los viajes según el rol del usuario
  const filteredViajes = viajes
    .filter((viaje) => {
      if (rol === "Gerencia") {
        return viaje.tipo_viaje === "gerencial"; // Mostrar solo viajes gerenciales
      } else {
        return viaje.tipo_viaje !== "gerencial"; // Mostrar viajes normales
      }
    })
    .filter((viaje) => {
      // Aplicar filtros adicionales de búsqueda, destino y origen
      return (
        viaje.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
        viaje.trayectos.some(
          (trayecto) =>
            trayecto.destino
              .toLowerCase()
              .includes(filterByDestination.toLowerCase()) &&
            trayecto.origen.toLowerCase().includes(filterByOrigin.toLowerCase())
        )
      );
    });

  const viajeDisponible = (viaje) => {
    // Verifica si algún trayecto está lleno
    return !viaje.trayectos.some(
      trayecto => trayecto.capacidad_ocupada >= trayecto.capacidad_operacional
    );
  };

  return (
    <div className="px-8 w-full flex flex-col">
      <div className="mt-16 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          <FiMapPin className="inline-block mr-2 text-blue-600" />
          Explora los Viajes Disponibles
        </h1>
      </div>
      {/* Barra de filtros */}
      <div className="mt-8 flex flex-col gap-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar por nombre del viaje"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 pl-10 w-full focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <div className="flex gap-4">
          <div className="relative w-full">
            <FiMapPin className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Filtrar por destino"
              value={filterByDestination}
              onChange={(e) => setFilterByDestination(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 pl-10 w-full focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="relative w-full">
            <FiMapPin className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Filtrar por origen"
              value={filterByOrigin}
              onChange={(e) => setFilterByOrigin(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 pl-10 w-full focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>
      </div>
      {/* Mostrar los viajes filtrados */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredViajes.length > 0 ? (
          filteredViajes.map((viaje) => {
            const centro = viaje.centro_asociado || {};
            const clima = centro.clima || {};
            const descripcionClima =
              clima.weather && clima.weather.length > 0
                ? clima.weather[0].description
                : null;

            const estaDisponible = viajeDisponible(viaje);

            return (
              <div
                key={viaje.id}
                className={`p-6 border rounded-xl shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between ${
                  !estaDisponible ? 'opacity-75' : ''
                }`}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {viaje.nombre}
                  </h2>
                  <p className="text-md text-gray-600 mt-2">
                    {viaje.descripcion}
                  </p>
                  <p
                    className={`text-md mt-2 font-semibold w-[90px] ${
                      viaje.tipo_viaje === "gerencial"
                        ? "text-yellow-600 bg-yellow-100 px-2 py-1 rounded"
                        : "text-blue-600 bg-blue-100 px-2 py-1 rounded"
                    }`}
                  >
                    {viaje.tipo_viaje === "gerencial" ? "Gerencial" : "Normal"}
                  </p>

                  {/* Información del Centro */}
                  {centro.nombre_centro && (
                    <div className="mt-4">
                      <h3 className="text-lg font-bold text-gray-700">
                        Centro Asociado: {centro.nombre_centro}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Jefe del Centro: {centro.jefe_centro || "No disponible"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Etapa del Ciclo:{" "}
                        {centro.etapa_ciclo_cultivo || "No disponible"}
                      </p>
                    </div>
                  )}

                  {/* Información del Clima */}
                  {descripcionClima && (
                    <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold text-blue-800 flex items-center">
                        <FiCloud className="mr-2" />
                        Clima Actual
                      </h4>
                      <p className="text-sm capitalize">
                        <FiSun className="inline-block mr-1 text-yellow-500" />
                        {descripcionClima}
                      </p>
                      <p className="text-sm">
                        <FiThermometer className="inline-block mr-1 text-red-500" />
                        Temperatura: {clima.main?.temp}°C
                      </p>
                      <p className="text-sm">
                        <FiWind className="inline-block mr-1 text-gray-500" />
                        Viento: {clima.wind?.speed} m/s
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center w-1/2 mr-2"
                    onClick={() => openModal(viaje)}
                  >
                    <FiCalendar className="mr-2" />
                    Itinerario
                  </button>
                  {estaDisponible ? (
                    <Link
                      to={`/confirmacion-vuelo/${viaje.id}`}
                      state={{ viaje }}
                      className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center w-1/2"
                    >
                      <FiArrowRight className="mr-2" />
                      Agendar
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="bg-gray-400 text-white py-2 px-4 rounded-lg flex items-center justify-center w-1/2 cursor-not-allowed"
                    >
                      <FiX className="mr-2" />
                      Sin Cupos
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-xl mt-8 text-gray-600">
            No hay viajes que coincidan con los filtros seleccionados.
          </p>
        )}
      </div>
      {isModalOpen && selectedViaje && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-3xl w-full max-h-96 overflow-y-auto transition-transform transform scale-100 duration-300">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Itinerario del Viaje
            </h2>
            {selectedViaje.trayectos.length > 0 ? (
              <ul className="space-y-4">
                {selectedViaje.trayectos.map((trayecto) => {
                  const esAreaDescanso =
                    trayecto.origen === trayecto.destino &&
                    !trayecto.vehiculo_id;

                  if (esAreaDescanso) {
                    return (
                      <HotelCard
                        key={trayecto.id}
                        name="Área de Descanso (Hotel)"
                        location={trayecto.origen}
                        capacity="100 personas"
                      />
                    );
                  }

                  return (
                    <FlightCard
                      key={trayecto.id}
                      name={`${trayecto.origen} a ${trayecto.destino}`}
                      origin={trayecto.origen}
                      destination={trayecto.destino}
                      vehiculo={trayecto.nombre_vehiculo}
                      capacidadOperacional={trayecto.capacidad_operacional}
                      capacidadOcupada={trayecto.capacidad_ocupada}
                    />
                  )
                })}
              </ul>
            ) : (
              <p className="text-center text-lg">
                No hay trayectos disponibles para esta ruta.
              </p>
            )}
            <div className="flex justify-center mt-6">
              <button
                className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center"
                onClick={closeModal}
              >
                <FiX className="mr-2" />
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightExplore;
