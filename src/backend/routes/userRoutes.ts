import { Router } from "express";
import {
  getPortfolio,
  getUser,
  updateUser,
} from "../controllers/userController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  tokenParamsSchema,
  updateUserBodySchema,
  updateUserParamsSchema,
} from "../validation/userSchemas.js";

const router = Router();

router.get(
  "/portfolio/:token",
  validateRequest({ params: tokenParamsSchema }),
  getPortfolio
);

router.get(
  "/user/:token",
  validateRequest({ params: tokenParamsSchema }),
  getUser
);

router.put(
  "/user/:userId",
  validateRequest({
    params: updateUserParamsSchema,
    body: updateUserBodySchema,
  }),
  updateUser
);

export default router;
