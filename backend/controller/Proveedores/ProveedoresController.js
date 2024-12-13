import { ProveedoresModel } from "../../models/Proveedores/ProveedoresModel.js";

// Obtener todos los proveedores
const obtenerProveedores = async (req, res) => {
  try {
    const proveedores = await ProveedoresModel.obtenerProveedoresConVehiculos();
    res.status(200).json({
      message: "Lista de proveedores",
      proveedores,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los proveedores" });
  }
};

// Obtener un proveedor específico con sus vehículos
const obtenerProveedorConVehiculos = async (req, res) => {
  const { nombre_proveedor, rut } = req.body; // Puedes ajustar a req.params si es necesario
  try {
    const proveedor = await ProveedoresModel.obtenerProveedorConVehiculos({
      nombre_proveedor,
      rut,
    });
    if (!proveedor) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }
    res.status(200).json({
      message: "Proveedor encontrado con sus vehículos",
      proveedor,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener el proveedor con vehículos" });
  }
};

// Crear un nuevo proveedor
const crearProveedor = async (req, res) => {
  const {
    nombre_proveedor,
    rut,
    encargado,
    contacto,
    email_encargado,
    telefono_encargado,
    representante_interno,
    estado,
    tipo_servicio,
    ciclo_cultivo,
    tarea_realizar,
    fecha_termino_servicio,
    frecuencia_servicio,
    cantidad_usuarios_autorizados,
  } = req.body;

  try {
    const nuevoProveedor = await ProveedoresModel.crearProveedor({
      nombre_proveedor,
      rut,
      encargado,
      contacto,
      email_encargado,
      telefono_encargado,
      representante_interno,
      estado,
      tipo_servicio,
      ciclo_cultivo,
      tarea_realizar,
      fecha_termino_servicio,
      frecuencia_servicio,
      cantidad_usuarios_autorizados,
    });
    res.status(201).json(nuevoProveedor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el proveedor" });
  }
};

// Eliminar un proveedor por ID
const eliminarProveedor = async (req, res) => {
  const { id } = req.params;
  try {
    const proveedorEliminado = await ProveedoresModel.eliminarProveedor(id);
    if (!proveedorEliminado) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }
    res.status(200).json({ message: "Proveedor eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el proveedor" });
  }
};

export const ProveedoresController = {
  obtenerProveedores,
  obtenerProveedorConVehiculos,
  crearProveedor,
  eliminarProveedor,
};
