import { z } from "zod";

const studentSchema = z.object({
  studentId: z.string().trim().min(1),
  gender: z.enum(["male", "female"]),
  heightCm: z.number().finite().positive(),
  roleLabel: z.string().trim().optional(),
});

export const stageInputSchema = z.object({
  schoolStage: z.string().trim().optional(),
  programType: z.string().trim().optional(),
  programTheme: z.string().trim().optional(),
  venueType: z.string().trim().optional(),
  performerCount: z.number().int().positive().optional(),
  maleCount: z.number().int().nonnegative().optional(),
  femaleCount: z.number().int().nonnegative().optional(),
  perPersonBudget: z.number().finite().nonnegative().optional(),
  screenThemeColor: z.string().trim().optional(),
  lightingStyle: z.string().trim().optional(),
  specialExpectation: z.string().trim().optional(),
  performanceDate: z.string().trim().optional(),
  rehearsalFrequencyPerWeek: z.union([z.literal(2), z.literal(3), z.literal(5)]).optional(),
  students: z.array(studentSchema).optional(),
  confirmedFormation: z.object({
    summary: z.string().trim().optional(),
    rows: z.number().int().positive().optional(),
    layoutName: z.string().trim().optional(),
    spacingRule: z.string().trim().optional(),
  }).optional(),
}).superRefine((value, ctx) => {
  if (
    value.performerCount !== undefined &&
    value.maleCount !== undefined &&
    value.femaleCount !== undefined &&
    value.maleCount + value.femaleCount !== value.performerCount
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["performerCount"],
      message: "男生数与女生数之和必须等于总人数。",
    });
  }

  if (
    value.performerCount !== undefined &&
    value.students &&
    value.students.length > 0 &&
    value.students.length !== value.performerCount
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["students"],
      message: "学生名录数量必须与总人数一致。",
    });
  }
});

export const planEngineMetadataSchema = z.object({
  engine: z.enum(["local_rules", "ai_assisted"]),
  generatedAt: z.string().datetime(),
  schemaVersion: z.string(),
  knowledgeVersion: z.string(),
  constraintVersion: z.string(),
  paletteVersion: z.string(),
  fallbackUsed: z.boolean(),
});

export type StageInput = z.infer<typeof stageInputSchema>;
export type PlanEngineMetadata = z.infer<typeof planEngineMetadataSchema>;
