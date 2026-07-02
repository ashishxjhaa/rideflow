import { Router } from "express";
import { logout, refresh } from "../controllers/session.controller";
import { verifyJWT } from "../middlewares/session.middleware";

const router = Router();

router.route("/refresh").post(refresh);

router.route("/logout").post(verifyJWT, logout);

export default router;
