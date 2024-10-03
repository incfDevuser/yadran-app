import express from "express";
import { ViajesController } from "../controller/ViajesController.js";

const router = express.Router();

//Ruta para obtener los viajes
router.get('/', ViajesController.obtenerViajes)
router.post('/solicitar',ViajesController.solicitarViaje)
router.put('/', ViajesController.aprobarRechazarViaje)

export default router;
