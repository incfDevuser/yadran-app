import express from "express";
import { LimpiezaController } from "../controller/LimpiezaControllers.js";

const router = express.Router();

//Hacer la limpieza de entidades
router.post("/limpiarUsuarios", LimpiezaController.limpiarUsuariosConfirmados);

export default router;
