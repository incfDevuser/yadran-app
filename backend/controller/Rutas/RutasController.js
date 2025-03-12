import { RutasModel } from "../../models/Rutas/RutasModel.js";

const obtenerRutas = async (req, res) => {
  try {
    const rutas = await RutasModel.obtenerRutas();
    res.status(200).json({
      message: "Rutas obtenidas",
      rutas,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener rutas",
      error: error.message,
    });
  }
};

const obtenerRuta = async (req, res) => {
  const { id } = req.params;
  try {
    const ruta = await RutasModel.obtenerRuta(id);
    if (!ruta) {
      return res.status(404).json({
        message: "Ruta no encontrada",
      });
    }
    res.status(200).json({
      message: "Ruta encontrada",
      ruta,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener la ruta",
      error: error.message,
    });
  }
};

const crearRuta = async (req, res) => {
  const {
    nombre_ruta,
    zona,
    origen,
    destino,
    escalas,
    tiempo_estimado,
    mov_interno
  } = req.body;

  try {
    const ruta = {
      nombre_ruta,
      zona,
      origen,
      destino,
      escalas,
      tiempo_estimado,
      mov_interno    };
    const nuevaRuta = await RutasModel.crearRuta(ruta);
    res.status(201).json({
      message: "Ruta creada exitosamente",
      nuevaRuta,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear la ruta",
      error: error.message,
    });
  }
};

const actualizarRuta = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const rutaActualizada = await RutasModel.actualizarRuta(id, data);
    res.status(200).json({
      message: "Ruta actualizada",
      rutaActualizada,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar la ruta",
      error: error.message,
    });
  }
};

const eliminarRuta = async (req, res) => {
  const { id } = req.params;

  try {
    const rutaEliminada = await RutasModel.eliminarRuta(id);
    res.status(200).json({
      message: "Ruta eliminada",
      rutaEliminada,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar la ruta",
      error: error.message,
    });
  }
};

const obtenerRutasConTrayectos = async (req, res) => {
  try {
    const rutas = await RutasModel.obtenerRutasConTrayectos();
    res.status(200).json({
      message: "Rutas obtenidas con trayectos",
      rutas,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener rutas con trayectos",
      error: error.message,
    });
  }
};

export const RutasController = {
  obtenerRutas,
  obtenerRuta,
  crearRuta,
  actualizarRuta,
  eliminarRuta,
  obtenerRutasConTrayectos
};
