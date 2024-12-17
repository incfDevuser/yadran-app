import React, { useState } from "react";
import { useUsuario } from "../../Context/UsuarioContext";
import { useIntercentros } from "../../Context/IntercentroContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalEditarPerfil from "./ModalEditarPerfil.JSX";
const PerfilUsuario = () => {
  const { usuarios, cancelarViaje, actualizarUsuario } = useUsuario();
  const { cancelarSolicitudIntercentro } = useIntercentros();
  const [modalOpen, setModalOpen] = useState(false);
  const [trayectos, setTrayectos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = async (formData) => {
    try {
      await actualizarUsuario(usuarios.id, formData);
      toast.success("Perfil actualizado con éxito");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      toast.error("Hubo un error al actualizar el perfil.");
    }
  };

  const handleOpenModal = (trayectos) => {
    setTrayectos(trayectos || []);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTrayectos([]);
  };

  const handleCancelarSolicitud = async (solicitudId) => {
    try {
      toast.info("Procesando cancelación...", {
        position: "top-right",
      });

      await cancelarSolicitudIntercentro(solicitudId);

      toast.success("La solicitud fue cancelada con éxito.", {
        position: "top-right",
      });
    } catch (error) {
      toast.error(
        "Hubo un error al cancelar la solicitud. Verifica tu conexión o permisos.",
        {
          position: "top-right",
        }
      );
    }
  };
  const handleCancelarViaje = async (solicitudId) => {
    try {
      toast.info("Procesando cancelación del viaje...", {
        position: "top-right",
      });
      await cancelarViaje(solicitudId);
      toast.success("El viaje fue cancelado con éxito.", {
        position: "top-right",
      });
    } catch (error) {
      toast.error(
        "Hubo un error al cancelar el viaje. Verifica tu conexión o permisos.",
        {
          position: "top-right",
        }
      );
    }
  };

  if (!usuarios) {
    return <p className="text-center text-gray-600">Cargando...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Perfil del Usuario</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        >
          Editar Información
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Información del Usuario */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Datos Personales
          </h2>
          <p className="text-gray-700">
            <strong>Nombre:</strong> {usuarios?.nombre || "No disponible"}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {usuarios?.email || "No disponible"}
          </p>
          <p className="text-gray-700">
            <strong>Rut:</strong> {usuarios?.rut || "No disponible"}
          </p>
          <p className="text-gray-700">
            <strong>Numero Contacto:</strong>{" "}
            {usuarios?.numero_contacto || "No disponible"}
          </p>
          <p className="text-gray-700">
            <strong>Rol:</strong> {usuarios?.nombre_rol || "No disponible"}
          </p>
          {/* <p className="text-gray-700">
            <strong>Es Administrador:</strong> {usuarios?.isadmin ? "Sí" : "No"}
          </p> */}
        </div>

        {/* Información Adicional */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Información Adicional
          </h2>
          <p className="text-gray-700">
            <strong>Ciudad de Origen:</strong>{" "}
            {usuarios?.ciudad_origen || "No disponible"}
          </p>
          <p className="text-gray-700">
            <strong>Género:</strong> {usuarios?.genero || "No disponible"}
          </p>
          <p className="text-gray-700">
            <strong>Teléfono:</strong> {usuarios?.telefono || "No disponible"}
          </p>
          <p className="text-gray-700">
            <strong>Empresa:</strong> {usuarios?.empresa || "No disponible"}
          </p>
          <p className="text-gray-700">
            <strong>Cargo:</strong> {usuarios?.cargo || "No disponible"}
          </p>
        </div>
      </div>

      {/* Información de los Viajes */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Mis Viajes
        </h2>
        {usuarios?.viajes && usuarios.viajes.length > 0 ? (
          usuarios.viajes.map((viaje, index) => (
            <div
              key={viaje.id || index}
              className=" rounded-lg p-6 mb-6 shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {viaje.nombre}
              </h3>
              <p className="text-gray-700 mb-1">
                <strong>Descripción:</strong>{" "}
                {viaje.descripcion || "No disponible"}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Comentario del Usuario:</strong>{" "}
                {viaje.comentario_usuario || "No disponible"}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Estado:</strong>
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-white ${
                    viaje.estado === "Aprobado"
                      ? "bg-green-500"
                      : viaje.estado === "Pendiente"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {viaje.estado || "Desconocido"}
                </span>
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Fecha de Inicio:</strong> {viaje.fecha_inicio}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Fecha de Fin:</strong> {viaje.fecha_fin}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleOpenModal(viaje.trayectos)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
                >
                  Ver Trayectos
                </button>
                <button
                  onClick={() => handleCancelarViaje(viaje.solicitud_id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600"
                >
                  Cancelar Viaje
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No tienes viajes registrados.</p>
        )}
      </div>

      {/* Información de los Viajes Intercentro */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Mis Viajes Intercentro
        </h2>
        {usuarios?.solicitudes_intercentro &&
        usuarios.solicitudes_intercentro.length > 0 ? (
          usuarios.solicitudes_intercentro.map((solicitud, index) => (
            <div
              key={solicitud.solicitud_id || index}
              className="rounded-lg p-6 mb-6 shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {solicitud.centro_origen} → {solicitud.centro_destino}
              </h3>
              <p className="text-gray-700 mb-1">
                <strong>Lancha:</strong> {solicitud.lancha}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Estado:</strong>{" "}
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-white ${
                    solicitud.estado === "pendiente"
                      ? "bg-yellow-500"
                      : solicitud.estado === "aprobado"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {solicitud.estado || "Desconocido"}
                </span>
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Fecha:</strong>{" "}
                {new Date(solicitud.fecha_movimiento).toLocaleString()}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Comentario:</strong> {solicitud.comentario || "N/A"}
              </p>
              <button
                onClick={() => handleCancelarSolicitud(solicitud.solicitud_id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600"
              >
                Cancelar Solicitud
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">
            No tienes solicitudes de intercentro registradas.
          </p>
        )}
      </div>

      {/* Modal para mostrar los trayectos */}
      {/* Modal para mostrar los trayectos */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative"
            style={{ maxHeight: "80vh", overflowY: "auto" }} // Scrollbar agregado
          >
            <h2
              id="modal-title"
              className="text-2xl font-semibold text-gray-900 mb-4"
            >
              Trayectos y Áreas de Descanso
            </h2>
            {trayectos.length > 0 ? (
              trayectos.reduce((acumulador, trayecto, index, array) => {
                // Detectar áreas de descanso (mismo origen y destino)
                if (trayecto.origen === trayecto.destino) {
                  acumulador.push(
                    <div
                      key={`descanso-${index}`}
                      className="bg-gray-100 p-4 rounded-md mb-4 shadow-sm"
                    >
                      <p className="text-gray-800 font-semibold">
                        <strong>Área de Descanso:</strong> {trayecto.origen}
                      </p>
                    </div>
                  );
                } else {
                  acumulador.push(
                    <div
                      key={`trayecto-${index}`}
                      className="border border-gray-200 rounded-md p-3 mb-3"
                    >
                      <p className="text-gray-700 mb-1">
                        <strong>Origen:</strong>{" "}
                        {trayecto.origen || "No disponible"}
                      </p>
                      <p className="text-gray-700 mb-1">
                        <strong>Destino:</strong>{" "}
                        {trayecto.destino || "No disponible"}
                      </p>
                      <p className="text-gray-700 mb-1">
                        <strong>Duración Estimada:</strong>{" "}
                        {trayecto.duracion_estimada || "No disponible"}
                      </p>
                      <p className="text-gray-700">
                        <strong>Vehículo:</strong>{" "}
                        {trayecto.tipo_vehiculo || "No disponible"}
                      </p>
                    </div>
                  );
                }
                return acumulador;
              }, [])
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
      <ModalEditarPerfil
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        user={usuarios}
      />
    </div>
  );
};

export default PerfilUsuario;
