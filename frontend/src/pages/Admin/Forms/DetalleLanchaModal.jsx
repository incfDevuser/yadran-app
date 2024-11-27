import React from "react";
import { FaShip, FaUser, FaEnvelope } from "react-icons/fa";

const DetalleLanchaModal = ({ lanchas, closeModal }) => {
  const getEstadoColor = (estado) => {
    switch (estado) {
      case "activo":
        return "text-green-500";
      case "inactivo":
        return "text-gray-500";
      case "pendiente":
        return "text-yellow-500";
      case "aprobado":
        return "text-green-500 bg-green-300 rounded-xl p-1";
      default:
        return "text-red-400";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-3/4 max-h-[80vh] overflow-y-auto shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Detalles de Lanchas</h2>
        {lanchas.length > 0 ? (
          lanchas.map((lancha) => (
            <div key={lancha.lancha_id} className="mb-6 border-b pb-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <FaShip className="text-blue-500" />
                {lancha.lancha_nombre}
              </h3>
              <p>
                <strong>Capacidad:</strong> {lancha.lancha_capacidad}
              </p>
              <p>
                <strong>Disponible:</strong>{" "}
                {lancha.lancha_disponible ? (
                  <span className="text-green-500 font-bold">Sí</span>
                ) : (
                  <span className="text-red-500 font-bold">No</span>
                )}
              </p>
              <p>
                <strong>Capacidad Disponible:</strong>{" "}
                <span className="font-bold">{lancha.capacidad_disponible}</span>
              </p>
              <h4 className="text-md font-semibold mt-2">Usuarios:</h4>
              {lancha.usuarios && lancha.usuarios.length > 0 ? (
                <ul className="space-y-2 mt-2">
                  {lancha.usuarios.map((usuario) => (
                    <li
                      key={usuario.persona_id}
                      className="flex items-center gap-3 border p-2 rounded-lg shadow-sm"
                    >
                      <FaUser className="text-blue-500" />
                      <div>
                        <p className="font-semibold">{usuario.nombre}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <FaEnvelope />
                          {usuario.email}
                        </p>
                      </div>
                      <span
                        className={`ml-auto font-bold ${getEstadoColor(
                          usuario.estado
                        )}`}
                      >
                        {usuario.estado}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay usuarios asociados a esta lancha.</p>
              )}
            </div>
          ))
        ) : (
          <p>No hay lanchas asociadas a este movimiento.</p>
        )}
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
          onClick={closeModal}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default DetalleLanchaModal;
