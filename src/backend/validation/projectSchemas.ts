import { object, Schema, string } from "./schema.js";

export interface CreateProjectBody extends Record<string, unknown> {
  userId: string;
  name: string;
  description: string;
  link: string;
}

export const createProjectBodySchema: Schema<CreateProjectBody> =
  object<CreateProjectBody>({
    userId: string({ minLength: { value: 1, message: "User id is required" } }),
    name: string({ minLength: { value: 1, message: "Project name is required" } }),
    description: string({
      minLength: { value: 1, message: "Project description is required" },
    }),
    link: string({ minLength: { value: 1, message: "Project link is required" } }),
  });

export interface ProjectTokenParams extends Record<string, unknown> {
  token: string;
}

export const projectTokenParamsSchema: Schema<ProjectTokenParams> =
  object<ProjectTokenParams>({
    token: string({ minLength: { value: 1, message: "Portfolio token is required" } }),
  });

export interface ProjectMutationParams extends Record<string, unknown> {
  userId: string;
  projectId: string;
}

export const projectMutationParamsSchema: Schema<ProjectMutationParams> =
  object<ProjectMutationParams>({
    userId: string({ minLength: { value: 1, message: "User id is required" } }),
    projectId: string({ minLength: { value: 1, message: "Project id is required" } }),
  });

export interface UpdateProjectBody extends Record<string, unknown> {
  name: string;
  description: string;
  link: string;
}

export const updateProjectBodySchema: Schema<UpdateProjectBody> =
  object<UpdateProjectBody>({
    name: string({ minLength: { value: 1, message: "Project name is required" } }),
    description: string({
      minLength: { value: 1, message: "Project description is required" },
    }),
    link: string({ minLength: { value: 1, message: "Project link is required" } }),
  });
