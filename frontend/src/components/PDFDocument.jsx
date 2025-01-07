import React from "react";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  Image,
  View,
  Link,
} from "@react-pdf/renderer";
import yadranLogo from "../assets/img/Yadran Logo.png";
const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 14,
    fontFamily: "Helvetica",
    color: "#333",
    lineHeight: 1.6,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 150,
    aspectRatio: 3,
    marginBottom: 10,
    padding:4
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    color: "#002a3a",
    marginBottom: 30,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
    padding: 15,
    border: "1px solid #ddd",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#005f73",
    marginBottom: 10,
    textDecoration: "underline",
  },
  text: {
    fontSize: 14,
    marginBottom: 8,
  },
  qrCodeContainer: {
    marginTop: 30,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  qrCode: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  qrCodeCaption: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
  },
  footer: {
    marginTop: 50,
    textAlign: "center",
    fontSize: 12,
    color: "#666",
  },
  footerLink: {
    color: "#005f73",
    textDecoration: "none",
  },
});
const PDFDocument = ({ trayecto }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image src={yadranLogo} style={styles.logo} />
        </View>

        {/* Título */}
        <Text style={styles.title}>Información del Trayecto</Text>

        {/* Detalles del Trayecto */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalles</Text>
          <Text style={styles.text}>
            <Text style={{ fontWeight: "bold" }}>Origen:</Text>{" "}
            {trayecto.origen || "No disponible"}
          </Text>
          <Text style={styles.text}>
            <Text style={{ fontWeight: "bold" }}>Destino:</Text>{" "}
            {trayecto.destino || "No disponible"}
          </Text>
          <Text style={styles.text}>
            <Text style={{ fontWeight: "bold" }}>Chofer:</Text>{" "}
            {trayecto.chofer.nombre || "No disponible"}
          </Text>
        </View>

        {/* Código QR */}
        {trayecto.qr_code ? (
          <View style={styles.qrCodeContainer}>
            <Image src={trayecto.qr_code} style={styles.qrCode} />
            <Text style={styles.qrCodeCaption}>
              Escanea este código QR para validar tu presencia
            </Text>
          </View>
        ) : (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            QR Code no disponible
          </Text>
        )}

        {/* Pie de Página */}
        <Text style={styles.footer}>
          Documento generado automáticamente por{" "}
          <Link style={styles.footerLink} src="https://pidway.com/">
            Pidway
          </Link>
          . Todos los derechos reservados. © 2025
        </Text>
      </Page>
    </Document>
  );
};

export default PDFDocument;
