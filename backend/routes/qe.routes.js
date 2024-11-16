import express from "express";
import { QrController } from "../controller/QrController.js";

const router = express.Router();

//Ruta para asignar QR al pontón
router.post("/asignar-qr/:ponton_id", QrController.asignarQRAPonton);

//Ruta para eliminar QR del pontón
router.delete("/eliminar-qr/:ponton_id", QrController.eliminarQRPonton);

export default router;
