import express from "express";
import { ViajesController } from "../controller/ViajesController.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

//Ruta para obtener los viajes
router.get("/", ViajesController.obtenerViajes);
//Obtener solicitudes de usuarios naturales
router.get(
  "/solicitudes-usuarios",
  ViajesController.obtenerSolicitudesUsuariosNaturales
);

//Crear un viaje
router.post("/crear", AuthMiddleware.authToken, ViajesController.crearViaje);

//Solicitar Viaje para Usuario natural
router.post(
  "/solicitar",
  AuthMiddleware.authToken,
  ViajesController.solicitarViajeUsuarioNatural
);

//Rechazar solicitud de viaje del usuario
router.patch(
  "/solicitud/:solicitudId/rechazar",
  ViajesController.rechazarSolicitudViaje
);
router.put(
  "/solicitud/:solicitud_id/aprobar",
  ViajesController.aprobarSolicitudViaje
);

export default router;
