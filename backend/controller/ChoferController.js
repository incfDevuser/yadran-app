import { ChoferesModel } from "../models/ChoferModel.js";

//Crear un nuevo chofer
const crearChofer = async (req, res) => {
  const { nombre, telefono, email } = req.body;
  try {
    const chofer = await ChoferesModel.crearChofer({
      nombre,
      telefono,
      email,
    });
    res.status(201).json({ message: "Chofer creado exitosamente", chofer });
  } catch (error) {
    console.error("Error al crear el chofer:", error);
    res.status(500).json({ message: "Error al crear el chofer" });
  }
};
//Obtener la lista de choferes
const obtenerChoferes = async (req, res) => {
  try {
    const choferes = await ChoferesModel.obtenerChoferes();
    res.json({ message: "Lista de choferes obtenida exitosamente", choferes });
  } catch (error) {
    console.error("Error al obtener los choferes:", error);
    res.status(500).json({ message: "Error al obtener los choferes" });
  }
};
//Obtener lista de usuarios por trayecto
const obtenerUsuariosPorTrayectoParaChofer = async (req, res) => {
  const { chofer_id } = req.params;

  try {
    const usuariosPorTrayecto =
      await ChoferesModel.obtenerUsuariosPorTrayectoParaChofer(chofer_id);
    res.status(200).json({
      message: "Lista de usuarios por trayecto obtenida exitosamente",
      vehiculoInfo: usuariosPorTrayecto,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Error al obtener la lista de usuarios por trayecto para el chofer",
      error: error.message,
    });
  }
};

export const ChoferController = {
  crearChofer,
  obtenerChoferes,
  obtenerUsuariosPorTrayectoParaChofer
};
