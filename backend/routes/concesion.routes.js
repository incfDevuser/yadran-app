import { Router } from "express";
import { ConcesionController } from "../controller/ConcesionController.js";

const router = Router();

//Ruta para obtener las conceciones
router.get("/", ConcesionController.obtenerConcesiones);
//Ruta para obtener una concesion
router.get("/:id", ConcesionController.obtenerConcesion);
//Ruta para crear una concesion
router.post("/create", ConcesionController.crearConcesion);
//Ruta para actualizaar una concesion

//Ruta para eliminar una concesion
router.delete("/:id", ConcesionController.eliminarConcesion);

export default router;
