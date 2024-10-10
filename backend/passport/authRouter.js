import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

//Ruta de autenticación de Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email", "https://www.googleapis.com/auth/userinfo.email"],
    prompt: "select_account"
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      {
        id: req.user.id,
        nombre: req.user.nombre,
        isAdmin: req.user.isadmin,
        email: req.user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "Strict",
    });
    res.redirect(`${process.env.REACT_URL_APP}`)
  }
);
export default router;
