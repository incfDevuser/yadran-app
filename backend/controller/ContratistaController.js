import { ContratistaModel } from "../models/ContratistaModel.js";
import { emailHelper } from "../Services/MailHelper.js";
//Controlador para agregar un trabajador bajo el contratista
const agregarTrabajador = async (req, res) => {
  const { nombre, email, identificacion, telefono } = req.body;
  const contratistaId = req.user.id;

  try {
    const nuevoTrabajador = await ContratistaModel.agregarTrabajador(
      contratistaId,
      nombre,
      email,
      identificacion,
      telefono
    );
    res.status(201).json({
      message: "Trabajador agregado exitosamente",
      trabajador: nuevoTrabajador,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al agregar el trabajador",
      error: error.message,
    });
  }
};
//Controlador para agendar varios trabajadores en un movimiento intercentro - hacer nodemailer
const agendarTrabajadoresParaMovimiento = async (req, res) => {
  const { movimientoId, trabajadoresIds, comentario } = req.body;
  const emailCliente = req.user.email;

  if (!emailCliente) {
    return res.status(400).json({
      message: "El contratista no tiene un correo registrado",
    });
  }

  try {
    const reservas = await ContratistaModel.agendarTrabajadoresParaMovimiento(
      movimientoId,
      trabajadoresIds,
      comentario
    );

    const detallesMovimiento =
      await ContratistaModel.getDetallesMovimientoConTrabajadores(movimientoId);

    const movimiento = {
      fecha: detallesMovimiento[0]?.fecha_movimiento,
      estadoSolicitud: detallesMovimiento[0]?.estado_movimiento,
      centro_origen_nombre: detallesMovimiento[0]?.centro_origen_nombre,
      centro_destino_nombre: detallesMovimiento[0]?.centro_destino_nombre,
      lancha_nombre: detallesMovimiento[0]?.lancha_nombre,
    };
    const trabajadores = detallesMovimiento
      .filter((item) => item.trabajador_id)
      .map((item) => ({
        id: item.trabajador_id,
        nombre: item.nombre_trabajador,
        email: item.email_trabajador,
        estado: item.estado_trabajador,
      }));

    const emailData = {
      ...movimiento,
      trabajadores,
    };

    // Enviar correo
    await emailHelper.sendEmailContratistaIntercentro(emailCliente, emailData);

    res.status(201).json({
      message:
        "Trabajadores agendados exitosamente en el movimiento y correo enviado.",
      reservas,
    });
  } catch (error) {
    console.error("Error al agendar trabajadores para el movimiento:", error);
    res.status(500).json({
      message: "Error al agendar trabajadores para el movimiento",
      error: error.message,
    });
  }
};

//Controlador para obtener el estado de los trabajadores bajo el contratista
const obtenerEstadoTrabajadores = async (req, res) => {
  const contratistaId = req.user.id;
  try {
    const estadoTrabajadores = await ContratistaModel.obtenerEstadoTrabajadores(
      contratistaId
    );
    res.status(200).json({
      message: "Estado de los trabajadores obtenido exitosamente",
      trabajadores: estadoTrabajadores,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el estado de los trabajadores",
      error: error.message,
    });
  }
};
//Controlador para modificar la ruta de un trabajador
const modificarRutaTrabajador = async (req, res) => {
  const { trabajadorId } = req.params;
  const { nuevoMovimientoId, comentario } = req.body;

  try {
    const resultado = await ContratistaModel.modificarRutaTrabajador(
      trabajadorId,
      nuevoMovimientoId,
      comentario
    );
    res.status(200).json({
      message: "Ruta del trabajador modificada exitosamente",
      trabajador: resultado,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al modificar la ruta del trabajador",
      error: error.message,
    });
  }
};
//Lista de usuarios por contratista
const obtenerTrabajadoresPorContratista = async (req, res) => {
  const { id: contratistaId } = req.user;
  try {
    const response = await ContratistaModel.obtenerTrabajadoresPorContratista(
      contratistaId
    );
    res.status(200).json({
      message: response.message,
      trabajadores: response.trabajadores,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener la lista de trabajadores",
      error: error.message,
    });
  }
};
//Para viajes "normales"
const obtenerSolicitudesTrabajadoresPorContratista = async (req, res) => {
  try {
    // Asegúrate de que `req.user` esté definido
    const { id: contratistaId } = req.user;

    if (!contratistaId) {
      return res.status(400).json({
        message: "ID del contratista no proporcionado o no válido",
      });
    }

    // Llama a la función del modelo para obtener las solicitudes
    const response =
      await ContratistaModel.obtenerSolicitudesTrabajadoresPorContratista(
        contratistaId
      );

    res.status(200).json({
      message: response.message,
      solicitudes: response.solicitudes,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Error al obtener las solicitudes de trabajadores por contratista",
      error: error.message,
    });
  }
};
//Para viajes de intercentro
const obtenerSolicitudesIntercentroTrabajadores = async (req, res) => {
  const contratistaId = req.user.id;

  try {
    const response = await ContratistaModel.obtenerSolicitudesIntercentro(
      contratistaId
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las solicitudes de intercentro",
      error: error.message,
    });
  }
};

export const ContratistaController = {
  agregarTrabajador,
  agendarTrabajadoresParaMovimiento,
  obtenerEstadoTrabajadores,
  modificarRutaTrabajador,
  obtenerTrabajadoresPorContratista,
  obtenerSolicitudesTrabajadoresPorContratista,
  obtenerSolicitudesIntercentroTrabajadores,
};
