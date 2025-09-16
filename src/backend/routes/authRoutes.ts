import { Router } from "express";
import { upload } from "../config/multer.js";
import { register, login } from "../controllers/authController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  loginBodySchema,
  registerBodySchema,
} from "../validation/authSchemas.js";

const router = Router();

router.post(
  "/register",
  upload.single("profileImage"),
  validateRequest({ body: registerBodySchema }),
  register
);

router.post("/login", validateRequest({ body: loginBodySchema }), login);

export default router;
