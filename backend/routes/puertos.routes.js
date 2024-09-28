import { Router } from 'express'
import { PuertosController } from '../controller/PuertosController.js';
const router = Router();

router.get("/", PuertosController.obtenerTodosLosPuertos)
router.get("/:id", PuertosController.obtenerPuertoPorId)
router.post("/create", PuertosController.crearNuevoPuerto)
router.put("/:id", PuertosController.actualizarPuerto)
router.delete("/:id", PuertosController.eliminarPuerto)

export default router