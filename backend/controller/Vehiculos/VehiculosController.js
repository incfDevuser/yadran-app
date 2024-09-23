import { VehiculosModel } from "../../models/Vehiculos/VehiculosModel.js";

const obtenerVehiculos = async (req, res) => {
  try {
    const vehiculos = await VehiculosModel.obtenerVehiculos();
    res.status(200).json({
      message: "Vehículos obtenidos",
      vehiculos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener vehículos",
      error: error.message,
    });
  }
};

const obtenerVehiculo = async (req, res) => {
  const { id } = req.params;
  try {
    const vehiculo = await VehiculosModel.obtenerVehiculo(id);
    if (!vehiculo) {
      return res.status(404).json({
        message: "Vehículo no encontrado",
      });
    }
    res.status(200).json({
      message: "Vehículo encontrado",
      vehiculo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el vehículo",
      error: error.message,
    });
  }
};

const crearVehiculo = async (req, res) => {
  const {
    proveedor,
    num_tripulantes,
    tipo_vehiculo,
    tipo_servicio,
    capacidad_total,
    capacidad_operacional,
    estado,
    documentacion_ok,
    velocidad_promedio,
  } = req.body;

  try {
    const vehiculo = {
      proveedor,
      num_tripulantes,
      tipo_vehiculo,
      tipo_servicio,
      capacidad_total,
      capacidad_operacional,
      estado,
      documentacion_ok,
      velocidad_promedio,
    };
    const nuevoVehiculo = await VehiculosModel.crearVehiculo(vehiculo);
    res.status(201).json({
      message: "Vehículo creado exitosamente",
      nuevoVehiculo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el vehículo",
      error: error.message,
    });
  }
};

const actualizarVehiculo = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const vehiculoActualizado = await VehiculosModel.actualizarVehiculo(
      id,
      data
    );
    res.status(200).json({
      message: "Vehículo actualizado",
      vehiculoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el vehículo",
      error: error.message,
    });
  }
};

const eliminarVehiculo = async (req, res) => {
  const { id } = req.params;

  try {
    const vehiculoEliminado = await VehiculosModel.eliminarVehiculo(id);
    res.status(200).json({
      message: "Vehículo eliminado",
      vehiculoEliminado,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el vehículo",
      error: error.message,
    });
  }
};
export const VehiculosController = {
  obtenerVehiculos,
  obtenerVehiculo,
  crearVehiculo,
  actualizarVehiculo,
  eliminarVehiculo,
};
