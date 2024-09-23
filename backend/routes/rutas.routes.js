import { Router } from "express";
import { RutasController } from "../controller/Rutas/RutasController.js";

const router = Router();

router.get("/", RutasController.obtenerRutas);
router.get("/:id", RutasController.obtenerRuta);
router.post("/create", RutasController.crearRuta);
router.put("/:id", RutasController.actualizarRuta);
router.delete("/:id", RutasController.eliminarRuta);

export default router;
