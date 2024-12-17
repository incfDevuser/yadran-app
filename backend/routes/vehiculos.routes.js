import { Router } from "express";
import { VehiculosController } from "../controller/Vehiculos/VehiculosController.js";

const router = Router();

router.get("/", VehiculosController.obtenerVehiculos);
router.get("/:id", VehiculosController.obtenerVehiculo);
router.post("/create", VehiculosController.crearVehiculo);
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

export default router;
