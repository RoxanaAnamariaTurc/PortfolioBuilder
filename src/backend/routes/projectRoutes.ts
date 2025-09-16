import { Router } from "express";
import {
  addProject,
  editProject,
  getProjects,
  removeProject,
} from "../controllers/projectController.js";
import { upload } from "../config/multer.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  createProjectBodySchema,
  projectMutationParamsSchema,
  projectTokenParamsSchema,
  updateProjectBodySchema,
} from "../validation/projectSchemas.js";

const router = Router();

router.post(
  "/projects",
  upload.single("image"),
  validateRequest({ body: createProjectBodySchema }),
  addProject
);

router.get(
  "/projects/:token",
  validateRequest({ params: projectTokenParamsSchema }),
  getProjects
);

router.put(
  "/projects/:userId/:projectId",
  upload.single("image"),
  validateRequest({
    params: projectMutationParamsSchema,
    body: updateProjectBodySchema,
  }),
  editProject
);

router.delete(
  "/users/:userId/projects/:projectId",
  validateRequest({ params: projectMutationParamsSchema }),
  removeProject
);

export default router;
