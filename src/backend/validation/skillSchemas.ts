import { array, object, Schema, string, withDefault } from "./schema.js";

export interface SkillParams extends Record<string, unknown> {
  token: string;
}

export const skillParamsSchema: Schema<SkillParams> = object<SkillParams>({
  token: string({ minLength: { value: 1, message: "Portfolio token is required" } }),
});

export interface SkillBody extends Record<string, unknown> {
  skills: {
    softSkills: string[];
    techSkills: string[];
  };
}

const skillArray = withDefault(
  array(string({ minLength: { value: 1, message: "Skill must not be empty" } })),
  []
);

export const skillBodySchema: Schema<SkillBody> = object<SkillBody>({
  skills: object<SkillBody["skills"]>({
    softSkills: skillArray,
    techSkills: skillArray,
  }),
});
