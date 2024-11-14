import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FiFileText, FiMapPin, FiArrowLeft } from "react-icons/fi";
import { useIntercentros } from "../../Context/IntercentroContext";

const ConfirmacionIntercentro = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ruta } = location.state;
  const { agendarRutaIntercentro } = useIntercentros();

  const [comentario, setComentario] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleConfirmarAgendamiento = async () => {
    const nuevaSolicitud = {
      movimiento_id: ruta.movimiento_id,
      comentario,
    };

    try {
      await agendarRutaIntercentro(nuevaSolicitud);
      setMensaje("Ruta agendada con éxito.");
      setTimeout(() => navigate("/miPerfil"), 2000);
    } catch (error) {
      setMensaje("Error al agendar la ruta. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg mt-8 transition-transform duration-300 ease-in-out">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Confirma tu Ruta
      </h1>
      <div className="bg-gray-100 p-4 rounded-lg mb-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-700 flex items-center">
          <FiMapPin className="mr-2 text-blue-600" /> Detalles de la Ruta
        </h2>
        <p className="text-md text-gray-600 mt-2">
          <strong>Origen:</strong> {ruta.centro_origen_nombre}
        </p>
        <p className="text-md text-gray-600">
          <strong>Destino:</strong> {ruta.centro_destino_nombre}
        </p>
        <p className="text-md text-gray-600">
          <strong>Lancha:</strong> {ruta.lancha_nombre}
        </p>
        <p className="text-md text-gray-600">
          <strong>Fecha:</strong>{" "}
          {new Date(ruta.fecha).toLocaleString()}
        </p>
        <p className="text-md text-gray-600">
          <strong>Comentarios:</strong> {ruta.comentarios}
        </p>
      </div>
      <div className="space-y-4">
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
          to="/intercentro"
          className="text-blue-600 font-medium hover:underline hover:text-blue-700 flex items-center justify-center"
        >
          <FiArrowLeft className="mr-2" /> Volver a Explorar Otras Rutas
        </Link>
      </div>
    </div>
  );
};

export default ConfirmacionIntercentro;
