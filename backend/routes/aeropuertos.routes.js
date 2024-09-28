import { AeropuertoController } from "../controller/AeropuertosController.js";
import { Router } from "express";

const router = Router();

router.get("/", AeropuertoController.obtenerTodosLosAeropuertos)
router.get("/:id", AeropuertoController.obtenerAeropuertoPorId)
router.post("/create", AeropuertoController.crearNuevoAeropuerto)
router.put("/:id", AeropuertoController.actualizarAeropuerto)
router.delete("/:id", AeropuertoController.eliminarAeropuerto)

export default router;