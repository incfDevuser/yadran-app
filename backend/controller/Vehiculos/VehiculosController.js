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

// Crear un nuevo vehículo asignado al proveedor autenticado y con chofer asignado
const crearVehiculo = async (req, res) => {
  const {
    num_tripulantes,
    tipo_vehiculo,
    tipo_servicio,
    capacidad_total,
    capacidad_operacional,
    estado,
    documentacion_ok,
    velocidad_promedio,
    chofer_id,
  } = req.body;
  const { proveedor_id } = req.user;
  if (
    !proveedor_id ||
    num_tripulantes === undefined ||
    !tipo_vehiculo ||
    !tipo_servicio ||
    capacidad_total === undefined ||
    capacidad_operacional === undefined ||
    !estado ||
    documentacion_ok === undefined ||
    velocidad_promedio === undefined ||
    !chofer_id
  ) {
    return res.status(400).json({ error: "Datos incompletos" });
  }
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
      chofer_id,
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
const actualizarVehiculo = async (req, res) => {
  const { id } = req.params;
  const {
    num_tripulantes,
    tipo_vehiculo,
    tipo_servicio,
    capacidad_total,
    capacidad_operacional,
    estado,
    documentacion_ok,
    velocidad_promedio,
    chofer_id,
  } = req.body;

  try {
    const vehiculo = {
      id,
      num_tripulantes,
      tipo_vehiculo,
      tipo_servicio,
      capacidad_total,
      capacidad_operacional,
      estado,
      documentacion_ok,
      velocidad_promedio,
      chofer_id,
    };

    const vehiculoActualizado = await VehiculosModel.actualizarVehiculo(id, vehiculo);
    
    if (!vehiculoActualizado) {
      return res.status(404).json({
        message: "Vehículo no encontrado",
      });
    }

    res.status(200).json({
      message: "Vehículo actualizado exitosamente",
      vehiculo: vehiculoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el vehículo",
      error: error.message,
    });
  }
};

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
    const vehiculoInfo =
      await VehiculosModel.obtenerUsuariosPorVehiculoYTrayecto(vehiculo_id);

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
const asignarTripulante = async (req, res) => {
  const { vehiculo_id } = req.params;
  const {
    nombre_tripulante,
    rut_tripulante,
    fecha_nacimiento,
    empresa,
    cargo,
  } = req.body;
  try {
    const nuevoTripulante = await VehiculosModel.asignarTripulante({
      vehiculo_id,
      nombre_tripulante,
      rut_tripulante,
      fecha_nacimiento,
      empresa,
      cargo,
    });
    res.status(201).json({
      message: "Tripulante asignado exitosamente al vehículo",
      tripulante: nuevoTripulante,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al asignar el tripulante al vehículo",
      error: error.message,
    });
  }
};

const obtenerVehiculosPorProveedor = async (req, res) => {
  const { proveedor_id } = req.user;
  try {
    const vehiculos = await VehiculosModel.obtenerVehiculosPorProveedor(
      proveedor_id
    );
    res.status(200).json({
      message: "Vehículos del proveedor obtenidos exitosamente",
      vehiculos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los vehículos del proveedor",
      error: error.message,
    });
  }
};

const obtenerPasajerosPorVehiculo = async (req, res) => {
  const { vehiculo_id } = req.params;
  try {
    const pasajeros = await VehiculosModel.obtenerPasajerosPorVehiculo(vehiculo_id);
    res.status(200).json({
      message: "Pasajeros obtenidos exitosamente",
      pasajeros,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los pasajeros",
      error: error.message,
    });
  }
};

const obtenerRutasYTrayectosPorVehiculo = async (req, res) => {
  const { vehiculo_id } = req.params;
  try {
    const rutas = await VehiculosModel.obtenerRutasYTrayectosPorVehiculo(vehiculo_id);
    res.status(200).json({
      message: "Rutas y trayectos obtenidos exitosamente",
      rutas,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las rutas y trayectos",
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
  asignarTripulante,
  obtenerVehiculosPorProveedor,
  obtenerPasajerosPorVehiculo,
  obtenerRutasYTrayectosPorVehiculo, // Añadir el nuevo método al objeto exportado
};
