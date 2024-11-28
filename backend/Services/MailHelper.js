import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const userEmail = process.env.EMAIL_SENDER;
const userPassword = process.env.PASS_SENDER;

const sendEmail = async (emailCliente, emailData) => {
  const {
    solicitudId,
    fechaInicio,
    fechaFin,
    estadoSolicitud,
    viaje,
    trayectos,
    ponton,
  } = emailData;

  // Construir HTML para los trayectos
  const trayectosHtml = trayectos
    .map(
      (trayecto, index) => `
        <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 8px;">
          <h3 style="margin-bottom: 10px;">Trayecto ${index + 1}</h3>
          <p><strong>Origen:</strong> ${trayecto.trayecto_origen}</p>
          <p><strong>Destino:</strong> ${trayecto.trayecto_destino}</p>
          <p><strong>Duración estimada:</strong> ${
            trayecto.trayecto_duracion
          } minutos</p>
          <p><strong>Vehículo:</strong> ${trayecto.tipo_vehiculo}</p>
          <p><strong>Chofer:</strong> ${trayecto.nombre_chofer} (${
        trayecto.email_chofer
      })</p>
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
const sendEmailIntercentro = async (emailCliente, emailData) => {
  const {
    solicitud_id,
    nombre,
    email,
    fecha,
    centro_origen_nombre,
    centro_destino_nombre,
    estado_movimiento,
    comentario,
    lancha_nombre,
  } = emailData;
  const mailOptions = {
    from: userEmail,
    to: emailCliente,
    subject: `Detalles de tu solicitud de Intercentro`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: #4CAF50; text-align: center;">¡Detalles de tu Intercentro!</h1>
        <p style="text-align: center;">Hola!</p>
        <p style="text-align: center;">Tu solicitud de movimiento entre centros ha sido registrada. Aquí tienes los detalles:</p>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #4CAF50;">Información de la Solicitud</h2>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Estado del Movimiento:</strong> ${estado_movimiento}</li>
            <li><strong>Comentario:</strong> ${
              comentario || "Sin comentario"
            }</li>
            <li><strong>Fecha de Movimiento:</strong> ${new Date(
              fecha
            ).toLocaleString()}</li>
          </ul>
        </div>
        <div style="background-color: #f1f1f1; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #4CAF50;">Centros Involucrados</h2>
          <p><strong>Centro de Origen:</strong> ${centro_origen_nombre}</p>
          <p><strong>Centro de Destino:</strong> ${centro_destino_nombre}</p>
        </div>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
          <h2 style="color: #4CAF50;">Información de la Lancha</h2>
          <p><strong>Nombre de la Lancha:</strong> ${lancha_nombre}</p>
        </div>
        <p style="text-align: center; margin-top: 20px; color: #777;">
          Gracias por confiar en nuestra plataforma. Si tienes alguna pregunta, no dudes en contactarnos.
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
const sendEmailContratista = async (emailCliente, emailData) => {
  const {
    nombre,
    descripcion,
    fecha_inicio,
    fecha_fin,
    trabajadores,
  } = emailData;

  const trabajadoresHtml = trabajadores
    .map(
      (trabajador, index) =>
        `<div>
          <h3 style="margin: 0;">Trabajador ${index + 1}</h3>
          <p><strong>Nombre:</strong> ${trabajador.nombre}</p>
          <p><strong>Email:</strong> ${trabajador.email}</p>
          <p><strong>Estado:</strong> ${trabajador.estado}</p>
        </div>`
    )
    .join("");

  const mailOptions = {
    from: userEmail,
    to: emailCliente,
    subject: `Detalles del Viaje para Trabajadores: ${nombre}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: #4CAF50; text-align: center;">¡Detalles de tu Viaje para Trabajadores!</h1>
        <p style="text-align: center;">Hola Contratista,</p>
        <p style="text-align: center;">Aquí tienes los detalles del viaje solicitado:</p>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #4CAF50;">Información General del Viaje</h2>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Nombre del Viaje:</strong> ${nombre}</li>
            <li><strong>Descripción:</strong> ${descripcion}</li>
            <li><strong>Fecha de Inicio:</strong> ${fecha_inicio}</li>
            <li><strong>Fecha de Fin:</strong> ${fecha_fin}</li>
          </ul>
        </div>
        <div style="background-color: #f1f1f1; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #4CAF50;">Trabajadores Asignados</h2>
          ${trabajadoresHtml || "<p>No hay trabajadores asignados.</p>"}
        </div>
        <p style="text-align: center; margin-top: 20px; color: #777;">
          Gracias por confiar en nuestra plataforma. ¡Buen trabajo!
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


const sendEmailContratistaIntercentro = async (emailCliente, emailData) => {
  const {
    fechaInicio,
    fechaFin,
    estadoSolicitud,
    centro_origen_nombre,
    centro_destino_nombre,
    lancha_nombre,
    trabajadores,
  } = emailData;
  const trabajadoresHtml = trabajadores
    .map(
      (trabajador, index) =>
        `<div>
      <h3 style="margin: 0;">Trabajador ${index + 1}</h3>
          <p><strong>Nombre:</strong> ${trabajador.nombre}</p>
          <p><strong>Email:</strong> ${trabajador.email}</p>
          <p><strong>Estado:</strong> ${trabajador.estado || "Sin estado"}</p>
    <div/>`
    )
    .join("");
  const mailOptions = {
    from: userEmail,
    to: emailCliente,
    subject: `Detalles del Intercentro`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: #4CAF50; text-align: center;">¡Detalles de tu Intercentro!</h1>
        <p style="text-align: center;">Hola Contratista,</p>
        <p style="text-align: center;">Aquí tienes los detalles de la solicitud intercentro:</p>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #4CAF50;">Información General</h2>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Estado de la Solicitud:</strong> ${estadoSolicitud}</li>
            <li><strong>Centro de Origen:</strong> ${centro_origen_nombre}</li>
            <li><strong>Centro de Destino:</strong> ${centro_destino_nombre}</li>
            <li><strong>Nombre de la Lancha:</strong> ${lancha_nombre}</li>
          </ul>
        </div>
        <div style="background-color: #f1f1f1; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #4CAF50;">Trabajadores Asignados</h2>
          ${trabajadoresHtml || "<p>No hay trabajadores asignados.</p>"}
        </div>
        <p style="text-align: center; margin-top: 20px; color: #777;">
          Gracias por confiar en nuestra plataforma. ¡Buen trabajo!
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

export const emailHelper = {
  sendEmail,
  sendEmailIntercentro,
  sendEmailContratista,
  sendEmailContratistaIntercentro,
};
