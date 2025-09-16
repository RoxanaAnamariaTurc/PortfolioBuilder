import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import {
  createProject,
  deleteProject,
  getProjectsByToken,
  updateProject,
} from "../services/projectService.js";
import {
  CreateProjectBody,
  ProjectMutationParams,
  ProjectTokenParams,
  UpdateProjectBody,
} from "../validation/projectSchemas.js";

export const addProject = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as CreateProjectBody;
  const image = req.file ? req.file.path : null;
  const project = await createProject({
    userId: body.userId,
    name: body.name,
    description: body.description,
    link: body.link,
    image,
  });

  res.status(201).json(project);
});

export const getProjects = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.params as ProjectTokenParams;
  const projects = await getProjectsByToken(token);
  res.status(200).json(projects);
});

export const editProject = asyncHandler(async (req: Request, res: Response) => {
  const params = req.params as ProjectMutationParams;
  const body = req.body as UpdateProjectBody;
  const image = req.file ? req.file.path : null;

  const projects = await updateProject({
    userId: params.userId,
    projectId: params.projectId,
    updates: {
      name: body.name,
      description: body.description,
      link: body.link,
      image,
    },
  });

  res.status(200).json(projects);
});

export const removeProject = asyncHandler(async (req: Request, res: Response) => {
  const params = req.params as ProjectMutationParams;
  await deleteProject({
    userId: params.userId,
    projectId: params.projectId,
  });

  res.status(200).json({ message: "Project deleted successfully" });
});
