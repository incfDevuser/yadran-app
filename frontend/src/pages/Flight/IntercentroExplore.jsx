import React, { useState, useEffect } from "react";
import { useIntercentros } from "../../Context/IntercentroContext";
import { Link } from "react-router-dom";
import { FiMapPin, FiCalendar, FiArrowRight } from "react-icons/fi";

const IntercentroExplore = () => {
  const { rutasIntercentro, loading, error, obtenerRutasIntercentro } =
    useIntercentros();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    obtenerRutasIntercentro();
  }, []);

  if (loading)
    return <p className="text-center text-xl mt-8">Cargando rutas...</p>;
  if (error)
    return <p className="text-center text-xl mt-8 text-red-500">{error}</p>;

  // Filtrar rutas por término de búsqueda en origen o destino
  const filteredRutas = rutasIntercentro.filter(
    (ruta) =>
      ruta.centro_origen_nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      ruta.centro_destino_nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-8 w-full flex flex-col">
      <div className="mt-16 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          <FiMapPin className="inline-block mr-2 text-blue-600" />
          Explora las Rutas de Intercentro
        </h1>
      </div>

      {/* Barra de búsqueda */}
      <div className="mt-8 relative">
        <FiMapPin className="absolute left-3 top-3 text-gray-500" />
        <input
          type="text"
          placeholder="Buscar por origen o destino"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 pl-10 w-full focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* Mostrar las rutas disponibles */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRutas.length > 0 ? (
          filteredRutas.map((ruta) => (
            <div
              key={ruta.movimiento_id}
              className="p-6 border rounded-xl shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {ruta.centro_origen_nombre} → {ruta.centro_destino_nombre}
                </h2>
                <p className="text-md text-gray-600 mt-2">
                  {ruta.estado === "pendiente" ? <strong>Disponible</strong> : <strong>{ruta.stado}</strong> }
                </p>
                <p className="text-md text-gray-600 mt-2">
                  <strong>Lancha:</strong> {ruta.lancha_nombre}
                </p>
                <p className="text-md text-gray-600 mt-2">
                  <strong>Comentarios:</strong> {ruta.comentarios}
                </p>
                <p className="text-md text-gray-600 mt-2 flex items-center">
                  <FiCalendar className="mr-2 text-blue-600" />
                  {new Date(ruta.fecha).toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between mt-4">
                <Link
                  to={`/confirmacion-intercentro/${ruta.movimiento_id}`}
                  state={{ ruta }}
                  className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center w-full"
                >
                  <FiArrowRight className="mr-2" />
                  Agendar
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-xl mt-8 text-gray-600">
            No hay rutas que coincidan con los filtros seleccionados.
          </p>
        )}
      </div>
    </div>
  );
};

export default IntercentroExplore;
