import express from "express";
import { IntercentroController } from "../controller/IntercentroController.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

//Obtener la lista de lanchas
router.get("/lanchas", IntercentroController.obtenerLanchas);
//Obtener movimientos intercentro, vista Admin
router.get("/movimientos", IntercentroController.obtenerRutasIntercentro);
//Solicitar ruta
router.post("/solicitar", IntercentroController.solicitarRuta);
//Cambiar el estado de la solicitud, rechazar o autorizar
router.put("/estadoSolicitud/:id", IntercentroController.estadoSolicitud);
//Eliminar o cancelar la solicitud de parte de los usuarios
router.delete(
  "/cancelarSolicitud/:id",
  IntercentroController.cancelarSolicitud
);

export default router;
