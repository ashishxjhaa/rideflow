import { Router } from "express";
import { getUserProfile } from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/session.middleware";
import { validate } from "../middlewares/validate";
import { loginSchema, registerSchema } from "@rideflow/validation";
import { loginUser, registerUser } from "../controllers/user.controller";

const router = Router();

router.route("/register").post(validate(registerSchema), registerUser);

router.route("/login").post(validate(loginSchema), loginUser);

router.route("/me").get(verifyJWT, getUserProfile);

export default router;
