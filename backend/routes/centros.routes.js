import { Router } from "express";
import { CentrosController } from "../controller/CentrosController.js";

const router = Router();

router.get("/", CentrosController.obtenerCentros);
router.get("/:id", CentrosController.obtenerCentro);
router.post("/create", CentrosController.crearCentro);
router.delete("/:id", CentrosController.eliminarCentro);
router.put("/:id", CentrosController.actualizarCentro);


export default router;
