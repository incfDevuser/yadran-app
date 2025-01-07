import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useQr } from "../../Context/QrContext";

const Validaciones = () => {
  const { validarTrayecto, validarPonton } = useQr();
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [tipoValidacion, setTipoValidacion] = useState("trayecto");

  useEffect(() => {
    let scanner;

    if (isScanning) {
      scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: 250 },
        false
      );

      scanner.render(
        async (text) => {
          try {
            const qrContent = JSON.parse(text);

            if (tipoValidacion === "trayecto") {
              const response = await validarTrayecto({
                trayecto_id: qrContent.trayecto_id,
                vehiculo_id: qrContent.vehiculo_id,
              });
              setMensaje(response.message);
            } else if (tipoValidacion === "ponton") {
              const response = await validarPonton({
                ponton_id: qrContent.ponton_id,
              });
              setMensaje(response.message);
            }

            setError(null);
            setIsScanning(false);
            scanner.clear();
          } catch (err) {
            console.error("Error al procesar el QR:", err);

            if (err instanceof SyntaxError) {
              setError("El código QR no tiene un formato válido.");
            } else {
              setError("Ocurrió un error al procesar el QR.");
            }
            setMensaje(null);
          }
        },
        (errorMessage) => {
          if (errorMessage.includes("NotFoundException")) {
            console.warn("Código QR no detectado. Intenta nuevamente.");
          } else {
            console.error("Error al escanear el QR:", errorMessage);
            setError(
              "No se pudo acceder a la cámara o hubo un problema con el escaneo."
            );
          }
        }
      );
    }

    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [isScanning, tipoValidacion, validarTrayecto, validarPonton]);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-xl font-bold text-gray-900 mb-4">
        Escanea tu Código QR para validar tu presencia
      </h1>

      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            tipoValidacion === "trayecto"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setTipoValidacion("trayecto")}
        >
          Validar Trayecto
        </button>
        <button
          className={`px-4 py-2 rounded ${
            tipoValidacion === "ponton"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setTipoValidacion("ponton")}
        >
          Validar Pontón
        </button>
      </div>

      {!isScanning ? (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsScanning(true)}
        >
          Iniciar Escaneo
        </button>
      ) : (
        <div>
          <div id="reader" style={{ width: "100%", maxWidth: "500px" }} />
          <button
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => setIsScanning(false)}
          >
            Detener Escaneo
          </button>
        </div>
      )}

      {mensaje && <p className="mt-4 text-green-500">{mensaje}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default Validaciones;
