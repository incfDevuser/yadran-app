import express from "express";
import { IntercentroController } from "../controller/IntercentroController.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

//Obtener la lista de lanchas
router.get("/lanchas", IntercentroController.obtenerLanchas);
router.get(
  "/movimientos/:movimientoId/lanchas",
  IntercentroController.obtenerLanchasPorMovimiento
);
//Obtener pontones
router.get(
  "/movimientos/:movimientoId/pontones",
  IntercentroController.obtenerPontonesPorMovimiento
);
//Crear una lancha
router.post("/crearLancha", IntercentroController.crearLanchas);

//Obtener movimientos intercentro, vista Admin
router.get("/movimientos", IntercentroController.obtenerRutasIntercentro);
//Crear movimientos de intercentro
router.post("/crearMovimiento", IntercentroController.crearRutaIntercentro);
//Obtener solicitudes de movimientos intercentro
router.get("/solicitudes", IntercentroController.obtenerSolicitudes);
//Solicitar ruta
router.post(
  "/solicitar",
  AuthMiddleware.authToken,
  IntercentroController.solicitarRuta
);

//Aprobar o rechazar Solicitud - Admin
router.put(
  "/solicitudes/:solicitud_id/aprobar",
  IntercentroController.aprobarSolicitud
);
router.put(
  "/solicitudes/:solicitudId/cancelar",
  IntercentroController.cancelarSolicitud
);

//Eliminar o cancelar la solicitud de parte de los usuarios
router.delete(
  "/cancelarSolicitud/:id",
  AuthMiddleware.authToken,
  IntercentroController.cancelarSolicitudUsuario
);

//Eliminar o cancelar la solicitud de parte del contratista
router.delete(
  "/cancelarSolicitud/trabajador/:id",
  AuthMiddleware.authToken,
  IntercentroController.cancelarSolicitudTrabajador
);
export default router;
