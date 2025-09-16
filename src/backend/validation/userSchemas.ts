import { object, Schema, string } from "./schema.js";

export interface TokenParams extends Record<string, unknown> {
  token: string;
}

export const tokenParamsSchema: Schema<TokenParams> = object<TokenParams>({
  token: string({ minLength: { value: 1, message: "Portfolio token is required" } }),
});

export interface UpdateUserParams extends Record<string, unknown> {
  userId: string;
}

export const updateUserParamsSchema: Schema<UpdateUserParams> =
  object<UpdateUserParams>({
    userId: string({ minLength: { value: 1, message: "User id is required" } }),
  });

export interface UpdateUserBody extends Record<string, unknown> {
  fullName: string;
  email: string;
  jobTitle: string;
}

export const updateUserBodySchema: Schema<UpdateUserBody> =
  object<UpdateUserBody>({
    fullName: string({ minLength: { value: 1, message: "Full name is required" } }),
    email: string({ email: { message: "A valid email is required" } }),
    jobTitle: string({ minLength: { value: 1, message: "Job title is required" } }),
  });
