import React, { useState } from "react";
import { useUsuario } from "../../Context/UsuarioContext";

const PerfilUsuario = () => {
  const { usuarios } = useUsuario();
  const [modalOpen, setModalOpen] = useState(false);
  const [trayectos, setTrayectos] = useState([]);

  const handleOpenModal = (trayectos) => {
    setTrayectos(trayectos);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTrayectos([]);
  };

  if (!usuarios) {
    return <p className="text-center text-gray-600">Cargando...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="flex justify-around items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Perfil del Usuario
        </h1>
        <button className="rounded-xl bg-blue-600 p-2 text-white">Editar Informacion</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Información del Usuario */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Datos Personales
          </h2>
          <p className="text-gray-700">
            <strong>Nombre:</strong> {usuarios.nombre}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {usuarios.email}
          </p>
          <p className="text-gray-700">
            <strong>Rol:</strong> {usuarios.nombre_rol}
          </p>
          <p className="text-gray-700">
            <strong>Es Administrador:</strong> {usuarios.isadmin ? "Sí" : "No"}
          </p>
          <p className="text-gray-700">
            <strong>Fecha de creación:</strong>{" "}
            {new Date(usuarios.fecha_creacion).toLocaleDateString()}
          </p>
        </div>

        {/* Información Adicional */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Información Adicional
          </h2>
          <p className="text-gray-700">
            <strong>Ciudad de Origen:</strong>{" "}
            {usuarios.ciudad_origen || "No disponible"}
          </p>
          <p className="text-gray-700">
            <strong>Fecha de Nacimiento:</strong>{" "}
            {usuarios.fecha_nacimiento || "No disponible"}
          </p>
          <p className="text-gray-700">
            <strong>Género:</strong> {usuarios.genero || "No disponible"}
          </p>
          <p className="text-gray-700">
            <strong>Teléfono:</strong> {usuarios.telefono || "No disponible"}
          </p>
        </div>
      </div>

      {/* Información de los Viajes */}
      {usuarios.viajes && usuarios.viajes.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Viajes</h2>
          {usuarios.viajes.map((viaje, index) => (
            <div
              key={index}
              className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {viaje.nombre}
              </h3>
              <p className="text-gray-700 mb-1">
                <strong>Descripción:</strong> {viaje.descripcion}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Comentario del Usuario:</strong>{" "}
                {viaje.comentario_usuario}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Estado:</strong>
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-white ${
                    viaje.estado === "Aprobado" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {viaje.estado}
                </span>
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Fecha de Inicio:</strong>{" "}
                {new Date(viaje.fecha_inicio).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Fecha de Fin:</strong>{" "}
                {new Date(viaje.fecha_fin).toLocaleDateString()}
              </p>

              {/* Botón para abrir el modal de trayectos */}
              <button
                onClick={() => handleOpenModal(viaje.trayectos)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
              >
                Ver Trayectos
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal para mostrar los trayectos */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Trayectos
            </h2>
            {trayectos.length > 0 ? (
              trayectos.map((trayecto, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-md p-3 mb-3"
                >
                  <p className="text-gray-700 mb-1">
                    <strong>Origen:</strong> {trayecto.origen}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Destino:</strong> {trayecto.destino}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Estado:</strong> {trayecto.estado}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Vehículo:</strong> {trayecto.vehiculo_id}
                  </p>
                  <p className="text-gray-700">
                    <strong>Duración Estimada:</strong>{" "}
                    {trayecto.duracion_estimada} minutos
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">
                No hay trayectos disponibles para este viaje.
              </p>
            )}
            <button
              onClick={handleCloseModal}
              className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 shadow hover:bg-red-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerfilUsuario;
