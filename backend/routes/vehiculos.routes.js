import { Router } from "express";
import { VehiculosController } from "../controller/Vehiculos/VehiculosController.js";

const router = Router();

router.get("/", VehiculosController.obtenerVehiculos);
router.get("/:id", VehiculosController.obtenerVehiculo);
router.post("/create", VehiculosController.crearVehiculo);
router.put("/:id", VehiculosController.actualizarVehiculo);
router.delete("/:id", VehiculosController.eliminarVehiculo);

export default router;
