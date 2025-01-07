import React, { useEffect } from "react";
import { useNotificaciones } from "../../Context/NotificacionesContext";
import {
  BsBellFill,
  BsCheckCircleFill,
  BsExclamationCircleFill,
  BsInfoCircleFill,
} from "react-icons/bs";

const NotificacionesUsuario = () => {
  const { notificaciones, obtenerNotificacionesPorUsuario, loading, error } =
    useNotificaciones();

  useEffect(() => {
    obtenerNotificacionesPorUsuario();
  }, []);
  const getNotificacionEstilo = (tipo) => {
    switch (tipo) {
      case "alerta":
        return {
          icon: <BsExclamationCircleFill className="text-2xl text-red-500" />,
          bgClass: "bg-red-50",
        };
      case "informativa":
        return {
          icon: <BsInfoCircleFill className="text-2xl text-blue-500" />,
          bgClass: "bg-blue-50",
        };
      default:
        return {
          icon: <BsBellFill className="text-2xl text-gray-500" />,
          bgClass: "bg-gray-50",
        };
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-500">Cargando notificaciones...</p>
    );
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
          {notificaciones.map((notificacion) => {
            const { icon, bgClass } = getNotificacionEstilo(notificacion.tipo);
            return (
              <li
                key={notificacion.id}
                className={`flex items-center justify-between p-4 rounded-md shadow-sm ${
                  notificacion.leido ? "bg-green-50" : bgClass
                }`}
              >
                <div className="flex items-center gap-4">
                  {icon}
                  <div>
                    <h4 className="text-lg font-medium text-gray-800">
                      {notificacion.titulo}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {notificacion.descripcion}
                    </p>
                    <small className="text-xs text-gray-400">
                      {new Date(notificacion.fecha_creacion).toLocaleString()}
                    </small>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default NotificacionesUsuario;
