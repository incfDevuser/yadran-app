import { Router } from "express";
import { PontonesController } from "../controller/PontonesController.js";

const router = Router();

//Ruta para obtener los Pontones
router.get("/", PontonesController.obtenerPontones);
//Ruta para obtener un Ponton mediante el ID
router.get("/:id", PontonesController.obtenerPonton);
//Crear Ponton
router.post("/create", PontonesController.crearPonton);

//Acutalizar un Ponton

//Eliminar un Ponton
router.delete("/:id", PontonesController.eliminarPonton);

export default router;
