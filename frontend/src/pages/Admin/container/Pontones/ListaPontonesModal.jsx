import React, { useEffect } from "react";
import { usePontones } from "../../../../Context/PontonesContext";
import QRCode from "qrcode";

const ListaPontonesModal = ({ isOpen, onClose }) => {
  const { pontones, obtenerPontones, loading, error } = usePontones();

  useEffect(() => {
    if (isOpen) {
      obtenerPontones();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownloadQR = async (id, nombrePonton) => {
    try {
      const qrCodeData = await QRCode.toDataURL(`${id}`);
      const link = document.createElement("a");
      link.href = qrCodeData;
      link.download = `QR_${nombrePonton || "Ponton"}.png`;
      link.click();
    } catch (error) {
      console.error("Error al generar el código QR:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[600px] p-5 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Lista de Pontones</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            X
          </button>
        </div>
        {loading ? (
          <p>Cargando pontones...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div>
            {pontones.length > 0 ? (
              pontones.map((ponton) => (
                <div
                  key={ponton.id}
                  className="p-4 border rounded-md shadow-sm mb-2 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold">{ponton.nombre_ponton}</h3>
                    <p>
                      Concesión: {ponton.nombre_concesion || "No disponible"}
                    </p>
                    <p>
                      Habitabilidad General:{" "}
                      {ponton.habitabilidad_general || "No especificado"}
                    </p>
                    <p>
                      Habitabilidad Interna:{" "}
                      {ponton.habitabilidad_interna || "No especificado"}
                    </p>
                    <p>
                      Habitabilidad Externa:{" "}
                      {ponton.habitabilidad_externa || "No especificado"}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handleDownloadQR(ponton.id, ponton.nombre_ponton)
                    }
                    className="bg-blue-500 text-white px-3 py-2 rounded shadow hover:bg-blue-600"
                  >
                    Descargar QR
                  </button>
                </div>
              ))
            ) : (
              <p>No hay pontones disponibles.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaPontonesModal;
