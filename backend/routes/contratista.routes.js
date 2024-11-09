import express from "express";
import { ContratistaController } from "../controller/ContratistaController.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

//Ruta para obtener la lista de trabajadores y sus estados
router.get(
  "/misTrabajadores",
  AuthMiddleware.authToken,
  ContratistaController.obtenerTrabajadoresPorContratista
);

//Ruta para agregar un trabajador
router.post(
  "/trabajadores",
  AuthMiddleware.authToken,
  ContratistaController.agregarTrabajador
);

//Ruta para agendar un viaje de intercentro del trabajador
router.post(
  "/agendarTrabajadores",
  AuthMiddleware.authToken,
  ContratistaController.agendarTrabajadoresParaMovimiento
);

//Ruta para modificar la ruta de un trabajador
router.put(
  "/modificar/:trabajadorId",
  AuthMiddleware.authToken,
  ContratistaController.modificarRutaTrabajador
);

export default router;
