import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFPontonDocument from "./PDFPontonDocument";
import { FaQrcode } from "react-icons/fa";

const DescargarPDFPontonButton = ({ ponton }) => {
  if (!ponton || !ponton.qr_code) {
    console.error("Datos insuficientes:", ponton);
    return null;
  }
  return (
    <PDFDownloadLink
      document={<PDFPontonDocument ponton={ponton} />}
      fileName={`Ponton_${ponton.nombre_ponton || "Información"}.pdf`}
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

export default DescargarPDFPontonButton;
