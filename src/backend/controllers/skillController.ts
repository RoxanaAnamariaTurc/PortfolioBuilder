import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { getSkillsByToken, updateSkills } from "../services/skillService.js";
import { SkillBody, SkillParams } from "../validation/skillSchemas.js";

export const getSkills = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.params as SkillParams;
  const skills = await getSkillsByToken(token);
  res.status(200).json(skills);
});

export const saveSkills = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.params as SkillParams;
  const body = req.body as SkillBody;
  const skills = await updateSkills({ token, skills: body.skills });
  res.status(201).json(skills);
});
