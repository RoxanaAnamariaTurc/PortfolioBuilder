import { object, Schema, string } from "./schema.js";

export interface RegisterBody extends Record<string, unknown> {
  fullName: string;
  email: string;
  password: string;
  jobTitle: string;
}

export const registerBodySchema: Schema<RegisterBody> = object<RegisterBody>({
  fullName: string({ minLength: { value: 1, message: "Full name is required" } }),
  email: string({ email: { message: "A valid email is required" } }),
  password: string({
    minLength: {
      value: 6,
      message: "Password must contain at least 6 characters",
    },
  }),
  jobTitle: string({ minLength: { value: 1, message: "Job title is required" } }),
});

export interface LoginBody extends Record<string, unknown> {
  email: string;
  password: string;
}

export const loginBodySchema: Schema<LoginBody> = object<LoginBody>({
  email: string({ email: { message: "A valid email is required" } }),
  password: string({ minLength: { value: 1, message: "Password is required" } }),
});
