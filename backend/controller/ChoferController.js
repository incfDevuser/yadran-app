import { ChoferesModel } from "../models/ChoferModel.js";

const crearChofer = async (req, res) => {
  const { nombre, telefono, email, vehiculo_id } = req.body;

  try {
    const chofer = await ChoferesModel.crearChofer({
      nombre,
      telefono,
      email,
      vehiculo_id,
    });
    res.status(201).json({ message: "Chofer creado exitosamente", chofer });
  } catch (error) {
    console.error("Error al crear el chofer:", error);
    res.status(500).json({ message: "Error al crear el chofer" });
  }
};

const asignarChoferATrayecto = async (req, res) => {
  const { chofer_id, trayecto_id } = req.body;

  try {
    const asignacion = await ChoferesModel.asignarChoferATrayecto(
      chofer_id,
      trayecto_id
    );
    res
      .status(201)
      .json({
        message: "Chofer asignado al trayecto exitosamente",
        asignacion,
      });
  } catch (error) {
    console.error("Error al asignar el chofer al trayecto:", error);
    res.status(500).json({ message: "Error al asignar el chofer al trayecto" });
  }
};
const obtenerChoferes = async()=>{
    try {
        const choferes = await ChoferesModel.obtenerChoferes();
        return res.status(200).json({
            message:"Lista de choferes",
            choferes
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message:"Error interno del servidor"
        })
    }
}
export const ChoferController = {
  crearChofer,
  asignarChoferATrayecto,
  obtenerChoferes
};
