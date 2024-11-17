import { QrModel } from "../models/QrModels.js";

const asignarQRAPonton = async (req, res) => {
  const { ponton_id } = req.params;

  try {
    const pontonActualizado = await QrModel.asignarQRAPonton(ponton_id);
    return res.status(200).json({
      message: "QR asignado exitosamente al pontón",
      ponton: pontonActualizado,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error al asignar QR al pontón",
    });
  }
};
const eliminarQRPonton = async (req, res) => {
  const { ponton_id } = req.params;
  try {
    const pontonActualizado = await QrModel.eliminarQRPonton(ponton_id);
    return res.status(200).json({
      message: "QR eliminado exitosamente del pontón",
      ponton: pontonActualizado,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error al eliminar QR del pontón",
    });
  }
};
const registrarEnTrayecto = async (req, res) => {
  const { trayecto_id, vehiculo_id } = req.body;
  const usuario_id = req.user.id;

  try {
    if (!trayecto_id || !vehiculo_id) {
      return res.status(400).json({
        message: "Los campos trayecto_id y vehiculo_id son requeridos",
      });
    }

    const { tipo, registro } = await QrModel.registrarEnTrayecto({
      trayecto_id,
      vehiculo_id,
      usuario_id,
    });

    return res.status(200).json({
      message: `${
        tipo === "usuario" ? "Usuario" : "Trabajador"
      } registrado exitosamente en el trayecto`,
      registro,
    });
  } catch (error) {
    console.error("Error en registrarEnTrayecto:", error.message);
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
const registrarEnPonton = async (req, res) => {
  const { ponton_id } = req.body;
  const usuario_id = req.user.id;
  try {
    if (!ponton_id) {
      return res.status(400).json({
        message: "El campo ponton_id es requerido",
      });
    }
    const { tipo, registro } = await QrModel.registrarEnPonton({
      ponton_id,
      usuario_id,
    });
    return res.status(200).json({
      message: `${
        tipo === "usuario" ? "Usuario" : "Trabajador"
      } registrado exitosamente en el pontón`,
      registro,
    });
  } catch (error) {
    console.error("Error en registrarEnPonton:", error.message);
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

export const QrController = {
  asignarQRAPonton,
  eliminarQRPonton,
  registrarEnTrayecto,
  registrarEnPonton
};
