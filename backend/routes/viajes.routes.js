import express from "express";
import { ViajesController } from "../controller/ViajesController.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

//Ruta para obtener los viajes
router.get('/', ViajesController.obtenerViajes)
//Crear un viaje
router.post('/crear', AuthMiddleware.authToken ,ViajesController.crearViaje)
//Ruta para solicitar un viaje
router.post('/solicitar',AuthMiddleware.authToken,ViajesController.solicitarViaje)
//Actualizar el estado del viaje
router.put('/:viaje_usuario_id', ViajesController.aprobarRechazarViaje)
//Obtener las solicitudes de viaje
router.get('/solicitudes', ViajesController.solicitudes)
//Cancelar el viaje del usuario
router.delete('/eliminar/:viaje_usuario_id', AuthMiddleware.authToken, ViajesController.eliminarViajeUsuario);




export default router;
