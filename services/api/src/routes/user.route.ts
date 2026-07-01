import { Router } from "express";
import { getUserProfile } from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middlware";

const router = Router();

router.route("/me").get(verifyJWT, getUserProfile);

export default router;
