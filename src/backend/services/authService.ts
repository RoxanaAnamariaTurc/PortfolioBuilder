import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "../errors/AppError.js";
import UserModel, { UserDocument } from "../models/User.js";

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  jobTitle: string;
  profileImage: string | null;
}

export interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
  jobTitle: string;
  profileImage: string | null;
}

export interface RegisterResult {
  user: AuthUser;
  token: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

const toAuthUser = (user: UserDocument): AuthUser => ({
  id: user.id,
  fullName: user.fullName,
  email: user.email,
  jobTitle: user.jobTitle,
  profileImage: user.profileImage,
});

export const registerUser = async (
  input: RegisterInput
): Promise<RegisterResult> => {
  const existingUser = await UserModel.findOne({ email: input.email });
  if (existingUser) {
    throw new AppError("User already registered.", 400);
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);
  const token = uuidv4();

  const user = await UserModel.create({
    fullName: input.fullName,
    email: input.email,
    password: hashedPassword,
    jobTitle: input.jobTitle,
    profileImage: input.profileImage,
    portfolioToken: token,
  });

  return {
    user: toAuthUser(user),
    token,
  };
};

export const loginUser = async (
  input: LoginInput
): Promise<RegisterResult> => {
  const user = await UserModel.findOne({ email: input.email });
  if (!user) {
    throw new AppError("Invalid email or password", 404);
  }

  const isMatch = await bcrypt.compare(input.password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 404);
  }

  if (!user.portfolioToken) {
    user.portfolioToken = uuidv4();
    await user.save();
  }

  return {
    user: toAuthUser(user),
    token: user.portfolioToken,
  };
};
