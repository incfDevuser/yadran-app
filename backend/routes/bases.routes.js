import { Router } from "express";
import { BaseController } from "../controller/BasesController.js";

const router = Router();

router.get("/", BaseController.obtenerBases);
router.get("/:id", BaseController.obtenerBase);
router.post("/create", BaseController.crearBase);
router.delete("/:id", BaseController.eliminarBase);

export default router;
