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

export const QrController = {
  asignarQRAPonton,
  eliminarQRPonton,
};
