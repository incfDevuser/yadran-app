import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FiCalendar, FiFileText, FiMapPin, FiArrowLeft } from "react-icons/fi";
import { useViajes } from "../../Context/ViajesContext";

const ConfirmacionVuelo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { viaje } = location.state;
  const { solicitarViaje } = useViajes();

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [comentario, setComentario] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleConfirmarAgendamiento = async () => {
    const nuevaSolicitud = {
      viaje_id: viaje.id,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
      comentario_usuario: comentario,
    };

    try {
      await solicitarViaje(nuevaSolicitud);
      setMensaje("Viaje agendado con éxito.");
      setTimeout(() => navigate("/miPerfil"), 2000);
    } catch (error) {
      setMensaje("Error al agendar el viaje. Inténtalo nuevamente.");
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
              <FiMapPin className="mr-2 text-blue-600" /> Trayectos
            </h3>
            <ul className="list-disc list-inside text-md text-gray-600">
              {viaje.trayectos.map((trayecto) => (
                <li key={trayecto.id}>
                  {trayecto.origen} a {trayecto.destino} -{" "}
                  {trayecto.duracion_estimada} minutos
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
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
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={handleConfirmarAgendamiento}
        >
          Confirmar Agendamiento
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
