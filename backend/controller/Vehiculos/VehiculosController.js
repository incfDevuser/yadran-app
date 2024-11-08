import { VehiculosModel } from "../../models/Vehiculos/VehiculosModel.js";

// Obtener todos los vehículos
const obtenerVehiculos = async (req, res) => {
  try {
    const vehiculos = await VehiculosModel.obtenerVehiculos();
    res.status(200).json({
      message: "Vehículos obtenidos exitosamente",
      vehiculos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener vehículos",
      error: error.message,
    });
  }
};

// Obtener un vehículo específico por su ID
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

//Crear un nuevo vehículo y asignarlo a un proveedor
const crearVehiculo = async (req, res) => {
  const {
    proveedor_id,
    num_tripulantes,
    tipo_vehiculo,
    tipo_servicio,
    capacidad_total,
    capacidad_operacional,
    estado,
    documentacion_ok,
    velocidad_promedio,
    chofer_id
  } = req.body;

  try {
    const vehiculo = {
      proveedor_id,
      num_tripulantes,
      tipo_vehiculo,
      tipo_servicio,
      capacidad_total,
      capacidad_operacional,
      estado,
      documentacion_ok,
      velocidad_promedio,
      chofer_id
    };
    const nuevoVehiculo = await VehiculosModel.crearVehiculo(vehiculo);
    res.status(201).json({
      message: "Vehículo creado exitosamente y asignado al proveedor",
      nuevoVehiculo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el vehículo",
      error: error.message,
    });
  }
};

// Actualizar un vehículo existente y asignarlo a un proveedor
const actualizarVehiculo = async (req, res) => {};

// Eliminar un vehículo
const eliminarVehiculo = async (req, res) => {
  const { id } = req.params;

  try {
    const vehiculoEliminado = await VehiculosModel.eliminarVehiculo(id);
    if (!vehiculoEliminado) {
      return res.status(404).json({
        message: "Vehículo no encontrado",
      });
    }
    res.status(200).json({
      message: "Vehículo eliminado exitosamente",
      vehiculoEliminado,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el vehículo",
      error: error.message,
    });
  }
};

const obtenerUsuariosEnVehiculo = async (req, res) => {
  const { vehiculo_id, trayecto_id } = req.params;

  try {
    const usuarios = await VehiculosModel.obtenerUsuariosEnVehiculo(
      vehiculo_id,
      trayecto_id
    );
    if (usuarios.length === 0) {
      return res.status(404).json({
        message:
          "No se encontraron usuarios en el vehículo para el trayecto especificado",
      });
    }
    res.status(200).json({
      message: "Usuarios en el vehículo obtenidos exitosamente",
      usuarios,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los usuarios en el vehículo",
      error: error.message,
    });
  }
};

const obtenerInfoCompletaVehiculo = async (req, res) => {
  const { vehiculo_id } = req.params;
  try {
    const vehiculoInfo = await VehiculosModel.obtenerUsuariosPorVehiculoYTrayecto(
      vehiculo_id
    );

    if (!vehiculoInfo) {
      return res.status(404).json({
        message: "Vehículo no encontrado",
      });
    }

    res.status(200).json({
      message: "Información completa del vehículo obtenida exitosamente",
      vehiculoInfo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener la información completa del vehículo",
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
  obtenerUsuariosEnVehiculo,
  obtenerInfoCompletaVehiculo,
};
