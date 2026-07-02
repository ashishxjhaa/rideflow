import { Router } from "express";
import {
  getCaptainProfile,
  loginCaptain,
  registerCaptain,
} from "../controllers/captain.controller";
import { validate } from "../middlewares/validate";
import {
  loginCaptainSchema,
  registerCaptainSchema,
} from "@rideflow/validation";
import { verifyJWT } from "../middlewares/session.middleware";

const router = Router();

router
  .route("/register")
  .post(validate(registerCaptainSchema), registerCaptain);

router.route("/login").post(validate(loginCaptainSchema), loginCaptain);

router.route("/me").get(verifyJWT, getCaptainProfile);

export default router;
