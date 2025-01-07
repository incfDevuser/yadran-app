import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "./PDFDocument";
import { FaQrcode } from "react-icons/fa";

const DescargarPDFButton = ({ trayecto }) => {
  if (!trayecto || !trayecto.origen || !trayecto.destino) {
    console.error("Datos insuficientes:", trayecto);
    return null;
  }

  return (
    <PDFDownloadLink
      document={<PDFDocument trayecto={trayecto} />}
      fileName={`Trayecto_${trayecto.id || "sin_id"}.pdf`}
    >
      {({ loading }) =>
        loading ? (
          <FaQrcode
            className="text-gray-400 animate-spin"
            style={{ fontSize: "2rem" }}
          />
        ) : (
          <FaQrcode
            className="text-blue-500 hover:text-blue-700 cursor-pointer"
            style={{ fontSize: "2rem" }}
          />
        )
      }
    </PDFDownloadLink>
  );
};

export default DescargarPDFButton;
