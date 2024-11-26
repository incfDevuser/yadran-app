import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const userEmail = process.env.EMAIL_SENDER;
const userPassword = process.env.PASS_SENDER;

const sendEmail = async (emailCliente, emailData) => {
  const { solicitudId, fechaInicio, fechaFin, estadoSolicitud, viaje, trayectos, ponton } = emailData;

  // Construir HTML para los trayectos
  const trayectosHtml = trayectos
    .map(
      (trayecto, index) => `
        <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 8px;">
          <h3 style="margin-bottom: 10px;">Trayecto ${index + 1}</h3>
          <p><strong>Origen:</strong> ${trayecto.trayecto_origen}</p>
          <p><strong>Destino:</strong> ${trayecto.trayecto_destino}</p>
          <p><strong>Duración estimada:</strong> ${trayecto.trayecto_duracion} minutos</p>
          <p><strong>Vehículo:</strong> ${trayecto.tipo_vehiculo}</p>
          <p><strong>Chofer:</strong> ${trayecto.nombre_chofer} (${trayecto.email_chofer})</p>
        </div>
      `
    )
    .join("");

  const mailOptions = {
    from: userEmail,
    to: emailCliente,
    subject: `Itinerario de tu viaje: ${viaje.nombre_viaje}`,
    html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h1 style="color: #4CAF50; text-align: center;">¡Detalles de tu viaje!</h1>
          <p style="text-align: center;">Hola!</p>
          <p style="text-align: center;">Hemos recibido tu solicitud de viaje. Aquí tienes el itinerario:</p>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #4CAF50;">Información del Viaje</h2>
            <ul style="list-style: none; padding: 0;">
              <li><strong>Estado de la Solicitud:</strong> ${estadoSolicitud}</li>
              <li><strong>Nombre:</strong> ${viaje.nombre_viaje}</li>
              <li><strong>Descripción:</strong> ${viaje.descripcion_viaje}</li>
              <li><strong>Ruta:</strong> ${viaje.nombre_ruta}</li>
              <li><strong>Fecha de Inicio:</strong> ${fechaInicio}</li>
              <li><strong>Fecha de Fin:</strong> ${fechaFin}</li>
            </ul>
          </div>
          <div style="background-color: #f1f1f1; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #4CAF50;">Trayectos</h2>
            ${trayectosHtml}
          </div>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
            <h2 style="color: #4CAF50;">Pontón Asociado</h2>
            <p><strong>Nombre del Pontón:</strong> ${ponton}</p>
          </div>
          <p style="text-align: center; margin-top: 20px; color: #777;">
            Gracias por confiar en nuestra plataforma. ¡Buen viaje!
          </p>
        </div>
      `,
  };

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: userEmail,
        pass: userPassword,
      },
    });
    await transporter.sendMail(mailOptions);
    console.log("Correo enviado exitosamente a:", emailCliente);
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw new Error("Error al enviar el correo");
  }
};

export default sendEmail;
