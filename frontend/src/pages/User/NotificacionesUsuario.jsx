import React, { useEffect } from "react";
import { useNotificaciones } from "../../Context/NotificacionesContext";
import { BsBellFill, BsCheckCircleFill } from "react-icons/bs"; // Importamos íconos de React Icons

const NotificacionesUsuario = () => {
  const {
    notificaciones,
    obtenerNotificacionesPorUsuario,
    loading,
    error,
  } = useNotificaciones();

  useEffect(() => {
    obtenerNotificacionesPorUsuario();
  }, []);

  const handleMarcarComoLeida = (notificacionId) => {
    console.log("Notificación marcada como leída:", notificacionId);
  };

  if (loading) return <p className="text-center text-gray-500">Cargando notificaciones...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6 text-gray-700">
        Mis Notificaciones
      </h2>
      {notificaciones.length === 0 ? (
        <p className="text-center text-gray-500">No tienes notificaciones</p>
      ) : (
        <ul className="space-y-4">
          {notificaciones.map((notificacion) => (
            <li
              key={notificacion.id}
              className={`flex items-center justify-between p-4 rounded-md shadow-sm ${
                notificacion.leido ? "bg-green-50" : "bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-4">
                {notificacion.leido ? (
                  <BsCheckCircleFill className="text-2xl text-green-500" />
                ) : (
                  <BsBellFill className="text-2xl text-blue-500" />
                )}
                <div>
                  <h4 className="text-lg font-medium text-gray-800">{notificacion.titulo}</h4>
                  <p className="text-sm text-gray-600">{notificacion.descripcion}</p>
                  <small className="text-xs text-gray-400">
                    {new Date(notificacion.fecha_creacion).toLocaleString()}
                  </small>
                </div>
              </div>
              {/* {!notificacion.leido && (
                <button
                  onClick={() => handleMarcarComoLeida(notificacion.id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm transition-all"
                >
                  Marcar como leída
                </button>
              )} */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificacionesUsuario;
