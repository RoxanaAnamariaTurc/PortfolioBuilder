import { AppError } from "../errors/AppError.js";
import UserModel, { Project, SkillSet } from "../models/User.js";

export interface UserSummary {
  fullName: string;
  email: string;
  jobTitle: string;
  profileImage: string | null;
}

export interface PortfolioPayload extends UserSummary {
  projects: Project[];
  skills: SkillSet;
}

export interface UpdateUserProfileInput {
  userId: string;
  token: string;
  updates: Pick<UserSummary, "fullName" | "email" | "jobTitle">;
}

export const getPortfolioByToken = async (
  token: string
): Promise<PortfolioPayload> => {
  const user = await UserModel.findOne({ portfolioToken: token });
  if (!user) {
    throw new AppError("Portfolio not found", 404);
  }

  return {
    fullName: user.fullName,
    email: user.email,
    jobTitle: user.jobTitle,
    profileImage: user.profileImage,
    projects: user.projects,
    skills: user.skills,
  };
};

export const getUserByToken = async (token: string): Promise<UserSummary> => {
  const user = await UserModel.findOne({ portfolioToken: token });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  return {
    fullName: user.fullName,
    email: user.email,
    jobTitle: user.jobTitle,
    profileImage: user.profileImage,
  };
};

export const updateUserProfile = async (
  input: UpdateUserProfileInput
): Promise<UserSummary> => {
  const user = await UserModel.findOne({
    _id: input.userId,
    portfolioToken: input.token,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  user.fullName = input.updates.fullName;
  user.email = input.updates.email;
  user.jobTitle = input.updates.jobTitle;

  await user.save();

  return {
    fullName: user.fullName,
    email: user.email,
    jobTitle: user.jobTitle,
    profileImage: user.profileImage,
  };
};
