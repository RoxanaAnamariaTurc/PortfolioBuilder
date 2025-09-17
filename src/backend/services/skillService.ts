import { AppError } from "../errors/AppError.js";
import UserModel, { SkillSet } from "../models/User.js";

export const getSkillsByToken = async (token: string): Promise<SkillSet> => {
  const user = await UserModel.findOne({ portfolioToken: token });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user.skills;
};

export interface UpdateSkillsInput {
  token: string;
  skills: SkillSet;
}

export const updateSkills = async (
  input: UpdateSkillsInput
): Promise<SkillSet> => {
  const user = await UserModel.findOne({ portfolioToken: input.token });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  user.skills.softSkills = input.skills.softSkills;
  user.skills.techSkills = input.skills.techSkills;

  await user.save();
  return user.skills;
};
