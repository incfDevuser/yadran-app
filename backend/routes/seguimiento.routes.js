import express from "express";
import { SeguimientoController } from "../controller/SegumientoController.js";
const router = express.Router();

// Ruta para obtener el detalle completo de un viaje
router.get("/viajes/:viajeId/detalle", SeguimientoController.obtenerDetalleCompletoViaje);
// Ruta para obtener el detalle completo de un viaje
router.get("/intercentro/:intercentroId/detalle", SeguimientoController.obtenerDetalleCompletoIntercentro);
export default router;
