import { SeguimientoModel } from "../models/SeguimientoModel.js";

const obtenerDetalleCompletoViaje = async (req, res) => {
  const { viajeId } = req.params;
  try {
    const detalleViaje = await SeguimientoModel.getDetalleCompletoViaje(
      viajeId
    );

    if (!detalleViaje.viaje) {
      return res.status(404).json({
        message: `No se encontró el viaje con el ID ${viajeId}`,
      });
    }

    res.status(200).json({
      message: `Detalle completo del viaje ${viajeId} obtenido exitosamente`,
      detalleViaje,
    });
  } catch (error) {
    console.error("Error al obtener el detalle completo del viaje:", error);
    res.status(500).json({
      error: "Error al obtener el detalle completo del viaje",
    });
  }
};
const obtenerDetalleCompletoIntercentro = async (req, res) => {
  const { intercentroId } = req.params;

  try {
    const detalleIntercentro =
      await SeguimientoModel.getDetalleCompletoIntercentro(intercentroId);

    if (!detalleIntercentro.intercentro) {
      return res.status(404).json({
        message: `No se encontró el intercentro con el ID ${intercentroId}`,
      });
    }

    res.status(200).json({
      message: `Detalle completo del intercentro ${intercentroId} obtenido exitosamente`,
      detalleIntercentro,
    });
  } catch (error) {
    console.error(
      "Error al obtener el detalle del intercentro:",
      error.message
    );
    res.status(500).json({
      error: "Error al obtener el detalle del intercentro",
    });
  }
};

export const SeguimientoController = {
  obtenerDetalleCompletoViaje,
  obtenerDetalleCompletoIntercentro
};
