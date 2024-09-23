import { Router } from "express";
import { ZonasController } from "../controller/ZonasController.js";

const router = Router();

//Ruta para obtener las zonas
router.get("/", ZonasController.obtenerZonas)
//Ruta para obtener una zona
router.get("/:id", ZonasController.obtenerZona)
//Ruta para crear una zona
router.post("/create", ZonasController.crearZona)
//Ruta para actualizar una zona

//Ruta para eliminar una zona
router.delete("/:id", ZonasController.eliminarZona)

export default router;