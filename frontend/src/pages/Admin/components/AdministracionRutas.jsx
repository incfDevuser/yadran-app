import React from "react";
import { useRutas } from "../../../Context/RoutesContext";
import { GoClock } from "react-icons/go";
import { FaArrowRightLong } from "react-icons/fa6";

const AdministracionRutas = () => {
  const { rutas, loading, error } = useRutas();
  
  if (loading) return <p className="text-center text-gray-600">Cargando rutas...</p>;
  if (error) return <p className="text-center text-red-600">Error al cargar las rutas: {error}</p>;

  return (
    <div className="flex flex-col w-full p-5 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800">Administración de Rutas</h1>
      <p className="text-gray-600 mb-4">Aquí puedes ver las rutas con sus trayectos asignados.</p>

      <div className="mt-5 flex flex-col space-y-4">
        {rutas.map((ruta) => (
          <div key={ruta.id} className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
            <header className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{ruta.nombre_ruta}</h2>
              <span className="text-sm text-gray-500">{ruta.zona}</span>
            </header>

            <div className="flex flex-col space-y-1 text-gray-600">
              <p><strong>Origen:</strong> {ruta.origen}</p>
              <p><strong>Destino:</strong> {ruta.destino}</p>
              <p><strong>Escalas:</strong> {ruta.escalas}</p>
              <p><strong>Tiempo estimado:</strong> {ruta.tiempo_estimado} minutos</p>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-700">Trayectos</h3>
              {ruta.trayectos.length > 0 ? (
                <ul className="mt-2 list-none space-y-2">
                  {ruta.trayectos.map((trayecto) => (
                    <li key={`${ruta.id}-${trayecto.id}`} className="flex items-center justify-between p-2 border rounded-md hover:bg-gray-100 transition duration-200">
                      <div className="flex items-center space-x-2">
                        <p><strong>Origen:</strong> {trayecto.origen}</p>
                        <FaArrowRightLong className="text-green-600" />
                        <p><strong>Destino:</strong> {trayecto.destino}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <p><strong>Duración:</strong> {trayecto.duracion_estimada} min</p>
                        <GoClock className="text-xl text-gray-500" />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No hay trayectos asociados a esta ruta.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdministracionRutas;
