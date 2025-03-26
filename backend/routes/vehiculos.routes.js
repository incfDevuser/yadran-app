import { Router } from "express";
import { VehiculosController } from "../controller/Vehiculos/VehiculosController.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";
const router = Router();

router.get("/", VehiculosController.obtenerVehiculos);
router.get("/:id", VehiculosController.obtenerVehiculo);
router.post(
  "/create",
  AuthMiddleware.authToken,
  VehiculosController.crearVehiculo
);
router.put("/:id", VehiculosController.actualizarVehiculo);
router.delete("/:id", VehiculosController.eliminarVehiculo);

//Informacion especifica del vehiculo y trayecto
router.get(
  "/:vehiculo_id/trayectos/:trayecto_id/usuarios",
  VehiculosController.obtenerUsuariosEnVehiculo
);

//Obtener el vehiculo general
router.get(
  "/:vehiculo_id/info",
  VehiculosController.obtenerInfoCompletaVehiculo
);

//Asignar tripulantes al vehiculo
router.post("/:vehiculo_id/tripulantes", VehiculosController.asignarTripulante);

//Obtener vehiculos por proveedor
router.get(
  "/proveedor/vehiculos",
  AuthMiddleware.authToken,
  VehiculosController.obtenerVehiculosPorProveedor
);

//Obtener pasajeros por vehiculo
router.get("/:vehiculo_id/pasajeros", VehiculosController.obtenerPasajerosPorVehiculo);

//Obtener rutas y trayectos por vehículo
router.get("/:vehiculo_id/rutas", VehiculosController.obtenerRutasYTrayectosPorVehiculo);

//Obtener rutas y trayectos por proveedor
router.get("/rutas/proveedor", AuthMiddleware.authToken, VehiculosController.obtenerRutasYTrayectosPorVehiculo);

export default router;
