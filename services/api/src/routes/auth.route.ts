import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/auth.controller";
import { validate } from "../middlewares/validate";
import { registerSchema, loginSchema } from "@rideflow/validation";
import { verifyJWT } from "../middlewares/auth.middlware";

const router = Router();

router.route("/register").post(validate(registerSchema), registerUser);
router.route("/login").post(validate(loginSchema), loginUser);
router.route("/refresh").post(refreshAccessToken);
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
