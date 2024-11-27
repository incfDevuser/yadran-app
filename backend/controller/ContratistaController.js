import { ContratistaModel } from "../models/ContratistaModel.js";

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
  try {
    const reservas = await ContratistaModel.agendarTrabajadoresParaMovimiento(
      movimientoId,
      trabajadoresIds,
      comentario
    );
    res.status(201).json({
      message: "Trabajadores agendados exitosamente en el movimiento",
      reservas,
    });
  } catch (error) {
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
    const response =
      await ContratistaModel.obtenerSolicitudesIntercentro(
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
  obtenerSolicitudesIntercentroTrabajadores
};
