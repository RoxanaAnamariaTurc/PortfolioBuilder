import { Document, Schema, Types, model, models } from "mongoose";

export interface Project {
  _id?: Types.ObjectId;
  name: string;
  description: string;
  image: string | null;
  link: string;
}

export interface SkillSet {
  softSkills: string[];
  techSkills: string[];
}

export interface UserAttributes {
  fullName: string;
  email: string;
  password: string;
  jobTitle: string;
  profileImage: string | null;
  projects: Project[];
  skills: SkillSet;
  portfolioToken: string;
}

export interface UserDocument extends UserAttributes, Document {}

const projectSchema = new Schema<Project>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: null },
    link: { type: String, required: true },
  },
  { timestamps: true }
);

const skillSetSchema = new Schema<SkillSet>(
  {
    softSkills: { type: [String], default: [] },
    techSkills: { type: [String], default: [] },
  },
  { _id: false }
);

const userSchema = new Schema<UserDocument>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    jobTitle: { type: String, required: true },
    profileImage: { type: String, default: null },
    projects: { type: [projectSchema], default: [] },
    skills: {
      type: skillSetSchema,
      default: () => ({ softSkills: [], techSkills: [] }),
    },
    portfolioToken: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const UserModel = models.User || model<UserDocument>("User", userSchema);

export default UserModel;
