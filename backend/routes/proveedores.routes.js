import { Router } from 'express'
import { ProveedoresController } from '../controller/Proveedores/ProveedoresController.js'

const router = Router();

//Ruta para obtener todos los proveedores
router.get("/", ProveedoresController.obtenerProveedores)
//Ruta para obtener un proveedor
router.post("/", ProveedoresController.obtenerProveedorConVehiculos)
//Ruta para crear un proveedor
router.post("/create", ProveedoresController.crearProveedor)
//Ruta para eliminar un proveedor
router.delete("/:id", ProveedoresController.eliminarProveedor)

export default router