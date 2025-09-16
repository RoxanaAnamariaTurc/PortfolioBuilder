import { AppError } from "../errors/AppError.js";
import UserModel, { Project } from "../models/User.js";

export interface CreateProjectInput {
  userId: string;
  name: string;
  description: string;
  link: string;
  image: string | null;
}

export const createProject = async (
  input: CreateProjectInput
): Promise<Project> => {
  const user = await UserModel.findById(input.userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const newProject: Project = {
    name: input.name,
    description: input.description,
    link: input.link,
    image: input.image,
  };

  user.projects.push(newProject);
  const savedUser = await user.save();
  const createdProject = savedUser.projects[savedUser.projects.length - 1];

  return {
    _id: createdProject._id,
    name: createdProject.name,
    description: createdProject.description,
    link: createdProject.link,
    image: createdProject.image,
  };
};

export const getProjectsByToken = async (token: string): Promise<Project[]> => {
  const user = await UserModel.findOne({ portfolioToken: token });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user.projects;
};

export interface UpdateProjectInput {
  userId: string;
  projectId: string;
  updates: Pick<Project, "name" | "description" | "link" | "image">;
}

export const updateProject = async (
  input: UpdateProjectInput
): Promise<Project[]> => {
  const user = await UserModel.findById(input.userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const project = user.projects.find(
    (item: Project) => item._id?.toString() === input.projectId
  );

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  project.name = input.updates.name;
  project.description = input.updates.description;
  project.link = input.updates.link;
  project.image = input.updates.image;

  await user.save();
  return user.projects;
};

export interface DeleteProjectInput {
  userId: string;
  projectId: string;
}

export const deleteProject = async (
  input: DeleteProjectInput
): Promise<void> => {
  const user = await UserModel.findById(input.userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const projectIndex = user.projects.findIndex(
    (item: Project) => item._id?.toString() === input.projectId
  );

  if (projectIndex === -1) {
    throw new AppError("Project not found", 404);
  }

  user.projects.splice(projectIndex, 1);
  await user.save();
};
