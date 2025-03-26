import { Router } from "express";
import { UserController } from "../controller/UserController.js";

const router = Router();

router.post("/login/chofer", UserController.loginChofer);

export default router;