import { LimpiezaModel } from "../models/LimpiezaModel.js";

const limpiarUsuariosConfirmados = async (req, res) => {
  try {
    // Llama a las funciones del modelo para eliminar usuarios confirmados
    await LimpiezaModel.eliminarUsuariosConfirmadosVehiculos();
    await LimpiezaModel.eliminarUsuariosConfirmadosPontones();
    await LimpiezaModel.eliminarUsuariosConfirmadosLanchas();

    res.status(200).json({
      message:
        "Usuarios confirmados eliminados de Vehículos, Pontones y Lanchas.",
    });
  } catch (error) {
    console.error("Error al limpiar usuarios confirmados:", error);
    res.status(500).json({
      message: "Error al limpiar usuarios confirmados.",
    });
  }
};
export const LimpiezaController = {
  limpiarUsuariosConfirmados,
};
