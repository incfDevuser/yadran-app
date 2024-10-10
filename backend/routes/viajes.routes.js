import express from "express";
import { ViajesController } from "../controller/ViajesController.js";

const router = express.Router();

//Ruta para obtener los viajes
router.get('/', ViajesController.obtenerViajes)
//Crear un viaje
router.post('/crear', ViajesController.crearViaje)
//Ruta para solicitar un viaje
router.post('/solicitar',ViajesController.solicitarViaje)
//Actualizar el estado del viaje
router.put('/:viaje_usuario_id', ViajesController.aprobarRechazarViaje)
//Obtener las solicitudes de viaje
router.get('/solicitudes', ViajesController.solicitudes)


export default router;
