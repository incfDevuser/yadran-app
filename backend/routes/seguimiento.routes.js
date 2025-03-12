import express from "express";
import { SeguimientoController } from "../controller/SegumientoController.js";
import { AuthMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.get("/viajes/:viajeId/detalle", SeguimientoController.obtenerDetalleCompletoViaje);
router.get("/intercentro/:intercentroId/detalle", SeguimientoController.obtenerDetalleCompletoIntercentro);
router.delete(
  '/usuarios/:id',
  AuthMiddleware.authToken,
  SeguimientoController.eliminarUsuarioSeguimiento
);

export default router;
