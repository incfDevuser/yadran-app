import { RolesController } from "../controller/RolesController.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

//Obtener todos los roles
router.get("/", RolesController.obtenerRoles);

//Crear un nuevo rol
router.post("/crearRol", RolesController.crearRol);

//Eliminar un rol
router.delete("/:rolId", RolesController.eliminarRol);

//Modificar el rol de un usuario
router.put(
  "/modificar-rol-usuario",
  RolesController.modificarRolUsuario
);

export default router;
