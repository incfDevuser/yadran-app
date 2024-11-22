import express from "express";
import { QrController } from "../controller/QrController.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

//Ruta para asignar QR al pontón
router.post("/asignar-qr/:ponton_id", QrController.asignarQRAPonton);

//Ruta para eliminar QR del pontón
router.delete("/eliminar-qr/:ponton_id", QrController.eliminarQRPonton);


//Ruta para registrarse en vehiculo - trayecto, UNICO DE CADA TRAYECTO
router.post(
  "/registrar-en-trayecto",
  AuthMiddleware.authToken,
  QrController.registrarEnTrayecto
);

//Ruta para registrarse en el ponton
router.post(
  "/registrar-ponton",
  AuthMiddleware.authToken,
  QrController.registrarEnPonton
);
export default router;
