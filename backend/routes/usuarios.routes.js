import express from "express";
import { UserController } from "../controller/UserController.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

// Ruta para obtener a los usuarios (requiere autenticación)
router.get("/", UserController.obtenerUsuarios);
router.get("/usuario/:id", UserController.obtenerUsuario);
router.delete("/:id", UserController.eliminarUsuario);
//Inicio de sesiones para proveedores
router.post("/register-proveedor", UserController.registerProveedor);
router.post("/login-proveedor", UserController.loginProveedor);
//Sesiones para contratistas
router.post("/register-contratista", UserController.registerContratista);
router.post("/login-contratista", UserController.loginContratista);
//Sesion para choferes
router.post("/login-chofer", UserController.loginChofer);
// Obtener el perfil del usuario autenticado
router.get("/miPerfil", AuthMiddleware.authToken, UserController.myProfile);
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  return res.status(200).json({ message: "Cierre de sesión exitoso" });
});
router.put("/usuario/:id", UserController.actualizarUsuario);

export default router;
