import { NotificacionesController } from "../controller/NotificacionesController.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

//Ruta para obtener las notificaciones
router.get("/", NotificacionesController.obtenerNotificaciones);

//Crear notificaciones globales
router.post(
  "/crear-notificacion",
  NotificacionesController.crearNotificacionGlobal
);

//Rutas para notificaciones específicas de usuarios
router.get(
  "/notificaciones-usuario",
  AuthMiddleware.authToken,
  NotificacionesController.obtenerNotificacionesPorUsuario
);

//Ruta para actualizar el estado de la notificacion
router.put(
  "/usuario/marcar-leida/:notificacion_id",
  AuthMiddleware.authToken,
  NotificacionesController.marcarNotificacionComoLeida
);
router.put(
  "/actualizar/:id",
  AuthMiddleware.authToken,
  NotificacionesController.actualizarNotificacion
);
//Rutas para eliminar una notificacion
router.delete(
  "/eliminar/:id",
  AuthMiddleware.authToken,
  NotificacionesController.eliminarNotificacion
);

export default router;
