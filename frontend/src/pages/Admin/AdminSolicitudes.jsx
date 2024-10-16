import React, { useEffect } from "react";
import { useViajes } from "../../Context/ViajesContext";

const AdminSolicitudes = () => {
  const { solicitudes, obtenerSolicitudes, loading, error } = useViajes();

  useEffect(() => {
    obtenerSolicitudes();
  }, []);

  if (loading) {
    return <div>Cargando solicitudes...</div>;
  }

  if (error) {
    return <div>Error al cargar solicitudes: {error}</div>;
  }
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-gray-800">
        Solicitudes de Viaje
      </h1>
      <div className="mt-8">
        {solicitudes.length === 0 ? (
          <p>No hay solicitudes pendientes.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solicitudes.map((solicitud) => (
              <div
                key={solicitud.id}
                className="bg-white shadow-lg rounded-lg p-6"
              >
                <h2 className="text-xl font-bold">{solicitud.nombre_viaje}</h2>
                <p>{solicitud.descripcion}</p>
                <p>Usuario: {solicitud.usuario}</p>
                <p>
                  Fecha de solicitud:{" "}
                  {new Date(solicitud.fecha_solicitud).toLocaleDateString()}
                </p>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                  Aprobar
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 ml-2">
                  Rechazar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSolicitudes;
