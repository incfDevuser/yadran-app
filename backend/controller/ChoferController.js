import { ChoferesModel } from "../models/ChoferModel.js";
import { generarContraseña } from "../utils/passwordGenerator.js";
import bcrypt from "bcryptjs";

const crearChoferController = async (req, res) => {
  const { nombre, telefono, email } = req.body;
  const { proveedor_id } = req.user;

  if (!nombre || !telefono || !email || !proveedor_id) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  try {
    const password_inicial = generarContraseña(nombre);
    const hashPassword = await bcrypt.hash(password_inicial, 10);
    
    const choferCreado = await ChoferesModel.crearChofer({
      nombre,
      telefono,
      email,
      proveedor_id,
      password: hashPassword,
      password_inicial 
    });

    return res.status(201).json({
      message: "Chofer y usuario creados exitosamente",
      chofer: {
        ...choferCreado,
      }
    });
  } catch (error) {
    console.error("Error al crear chofer y usuario:", error);
    return res.status(500).json({
      error: "Error al crear chofer y usuario",
      details: error.message,
    });
  }
};

const obtenerChoferesPorProveedor = async (req, res) => {
  const { proveedor_id } = req.user;
  try {
    const choferes = await ChoferesModel.obtenerChoferesPorProveedor(
      proveedor_id
    );
    return res.status(200).json({ choferes });
  } catch (error) {
    console.error("Error al obtener choferes:", error);
    return res.status(500).json({ error: "Error al obtener choferes" });
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
  crearChoferController,
  obtenerChoferes,
  obtenerChoferesPorProveedor,
  obtenerUsuariosPorTrayectoParaChofer,
};
