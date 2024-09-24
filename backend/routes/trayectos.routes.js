import { TrayectosController } from "../controller/Trayectos/TrayectosController.js";
import { Router } from "express";

const router = Router();

router.get("/", TrayectosController.obtenerTrayectos);
router.get("/:id", TrayectosController.obtenerTrayecto);
router.post("/create", TrayectosController.crearTrayecto);
//Aca faltaria la ruta para poder actualizar un trayecto
router.delete("/:id", TrayectosController.eliminarTrayecto);

export default router;
