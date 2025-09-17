import { Router } from "express";
import { getSkills, saveSkills } from "../controllers/skillController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  skillBodySchema,
  skillParamsSchema,
} from "../validation/skillSchemas.js";

const router = Router();

router.get(
  "/user/:token/skills",
  validateRequest({ params: skillParamsSchema }),
  getSkills
);

router.post(
  "/user/:token/skills",
  validateRequest({ params: skillParamsSchema, body: skillBodySchema }),
  saveSkills
);

export default router;
