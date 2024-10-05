import express from "express";
import passport from "passport";
const router = express.Router();

//Ruta principal
router.get("/", (req, res) => {
  res.send("Autenticacion");
});
//Ruta de autenticacion de google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: true }),
  (req, res) => {
    res.send(req.user);
  }
);
export default router;
