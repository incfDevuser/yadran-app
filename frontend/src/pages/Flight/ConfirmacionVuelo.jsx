import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FiCalendar, FiFileText, FiMapPin, FiArrowLeft, FiUserCheck } from "react-icons/fi";
import { useViajes } from "../../Context/ViajesContext";
import { useContratista } from "../../Context/ContratistaContext";

const ConfirmacionVuelo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { viaje } = location.state;
  const { solicitarViaje } = useViajes(); // Función para usuarios normales
  const { trabajadores, obtenerTrabajadores, agendarNormal } = useContratista(); // Función para contratistas

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [comentario, setComentario] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [trabajadoresSeleccionados, setTrabajadoresSeleccionados] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Cargar trabajadores al montar el componente (solo contratistas)
  useEffect(() => {
    obtenerTrabajadores();
  }, [obtenerTrabajadores]);

  // Toggle para seleccionar/deseleccionar trabajadores
  const toggleTrabajador = (id) => {
    setTrabajadoresSeleccionados((prev) =>
      prev.includes(id)
        ? prev.filter((trabajadorId) => trabajadorId !== id)
        : [...prev, id]
    );
  };

  const handleConfirmarAgendamiento = async () => {
    if (isLoading) return; // Prevent multiple submissions

    setIsLoading(true);
    setMensaje("");

    const nuevaSolicitud = trabajadoresSeleccionados.length
      ? {
          viaje_id: viaje.id,
          trabajadores: trabajadoresSeleccionados,
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin,
          comentario_contratista: comentario,
        }
      : {
          viaje_id: viaje.id,
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin,
          comentario_usuario: comentario,
        };

    try {
      if (trabajadoresSeleccionados.length) {
        // Agendamiento para contratistas
        await agendarNormal(nuevaSolicitud);
      } else {
        // Agendamiento para usuarios normales
        await solicitarViaje(nuevaSolicitud);
      }
      setMensaje("Viaje agendado con éxito.");
      setTimeout(() => navigate("/miPerfil"), 2000);
    } catch (error) {
      console.error("Error al agendar el viaje:", error);
      setMensaje("Error al agendar el viaje. Inténtalo nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg mt-8 transition-transform duration-300 ease-in-out">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Confirma tu Viaje
      </h1>
      <div className="bg-gray-100 p-4 rounded-lg mb-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-700 flex items-center">
          <FiMapPin className="mr-2 text-blue-600" /> Detalles del Viaje
        </h2>
        <p className="text-md text-gray-600 mt-2">
          <strong>Nombre:</strong> {viaje.nombre}
        </p>
        <p className="text-md text-gray-600">
          <strong>Descripción:</strong> {viaje.descripcion}
        </p>
        {viaje.trayectos && viaje.trayectos.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold text-gray-700 flex items-center">
              <FiMapPin className="mr-2 text-blue-600" /> Trayectos y Áreas de Descanso
            </h3>
            <ul className="list-disc list-inside text-md text-gray-600">
              {viaje.trayectos.map((trayecto, index) => {
                // Identificar si es un área de descanso
                const esAreaDescanso = trayecto.origen === trayecto.destino;

                return (
                  <li key={trayecto.id}>
                    {esAreaDescanso
                      ? `Área de descanso: ${trayecto.origen}`
                      : `Trayecto ${index + 1}: ${trayecto.origen} a ${trayecto.destino} - ${
                          trayecto.duracion_estimada ? `${trayecto.duracion_estimada} minutos` : "Duración no especificada"
                        }`}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Sección para selección de trabajadores (solo contratistas) */}
      {trabajadores.length > 0 && (
        <div className="bg-gray-100 p-4 rounded-lg mb-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 flex items-center">
            <FiUserCheck className="mr-2 text-green-600" />
            Seleccionar Trabajadores
          </h2>
          <div
            className="flex flex-col items-center gap-2 max-h-64 overflow-y-auto border border-gray-300 rounded-lg p-4"
            style={{ scrollbarWidth: "thin" }}
          >
            {trabajadores.map((trabajador) => (
              <div
                key={trabajador.trabajador_id}
                className="flex gap-2 items-center justify-between bg-white p-2 rounded-lg shadow hover:shadow-md transition duration-200"
              >
                <div className="flex flex-col">
                  <p className="text-gray-800 font-medium">{trabajador.trabajador_nombre}</p>
                  <p className="text-gray-600 text-sm">{trabajador.trabajador_email}</p>
                </div>
                <button
                  className={`px-4 py-2 rounded ${
                    trabajadoresSeleccionados.includes(trabajador.trabajador_id)
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  onClick={() => toggleTrabajador(trabajador.trabajador_id)}
                >
                  {trabajadoresSeleccionados.includes(trabajador.trabajador_id)
                    ? "Seleccionado"
                    : "Seleccionar"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center">
          <FiCalendar className="text-blue-600 mr-2" />
          <label className="block text-gray-700 text-sm font-semibold">
            Fecha de Inicio
          </label>
        </div>
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-300"
        />

        <div className="flex items-center">
          <FiCalendar className="text-blue-600 mr-2" />
          <label className="block text-gray-700 text-sm font-semibold">
            Fecha de Fin
          </label>
        </div>
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-300"
        />

        <div className="flex items-center">
          <FiFileText className="text-blue-600 mr-2" />
          <label className="block text-gray-700 text-sm font-semibold">
            Comentario (Opcional)
          </label>
        </div>
        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-300"
          placeholder="Añade algún comentario adicional..."
        />
      </div>
      <div className="mt-6 flex flex-col items-center">
        <button
          className={`w-full ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          } text-white py-3 rounded-lg font-semibold text-lg transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300`}
          onClick={handleConfirmarAgendamiento}
          disabled={isLoading}
        >
          {isLoading ? 'Procesando...' : 'Confirmar Agendamiento'}
        </button>
        {mensaje && (
          <p className="mt-4 text-center text-green-600 font-semibold">
            {mensaje}
          </p>
        )}
      </div>
      <div className="mt-4 text-center">
        <Link
          to="/explore"
          className="text-blue-600 font-medium hover:underline hover:text-blue-700 flex items-center justify-center"
        >
          <FiArrowLeft className="mr-2" /> Volver a Explorar Otros Viajes
        </Link>
      </div>
    </div>
  );
};

export default ConfirmacionVuelo;
