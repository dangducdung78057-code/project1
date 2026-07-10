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

// ---------------------------------------------------------------------------
// 统一坐标 / 队形 / 外观 / 倒排 / 权益 Schema
// 2.5D 与 3D 共用米制 {x, z, riserLevel} 坐标（x 向右、z 向舞台深处、riserLevel 台阶层级）。
// ---------------------------------------------------------------------------

export const stagePositionSchema = z.object({
  x: z.number().finite(),
  z: z.number().finite(),
  riserLevel: z.number().int().nonnegative().optional(),
});

export const appearanceSchema = z.object({
  outfitId: z.string().trim().min(1),
  upperColor: z.string().trim().min(1),
  lowerColor: z.string().trim().min(1),
  footwearColor: z.string().trim().min(1),
  accentColor: z.string().trim().min(1),
});

export const performerSchema = z.object({
  id: z.string().trim().min(1),
  gender: z.enum(["male", "female", "unknown"]),
  heightCm: z.number().finite().positive(),
  roleLabel: z.string().trim().optional(),
  groupId: z.string().trim().optional(),
  position: stagePositionSchema,
  appearance: appearanceSchema,
});

export const stageConfigurationSchema = z.object({
  widthM: z.number().finite().positive(),
  depthM: z.number().finite().positive(),
  riserLevels: z.number().int().nonnegative(),
  backgroundColor: z.string().trim().min(1),
  ledTitle: z.string().trim(),
});

export const formationKeyframeSchema = z.object({
  id: z.string().trim().min(1),
  name: z.string().trim().min(1),
  timeSec: z.number().finite().nonnegative(),
  performerPositions: z.record(z.string(), stagePositionSchema),
});

export const formationSchema = z.object({
  id: z.string().trim().min(1),
  name: z.string().trim().min(1),
  stage: stageConfigurationSchema,
  performers: z.array(performerSchema),
  keyframes: z.array(formationKeyframeSchema).default([]),
  updatedAt: z.string().datetime().optional(),
});

export const scheduleTaskSchema = z.object({
  id: z.string().trim().min(1),
  title: z.string().trim().min(1),
  category: z.string().trim().min(1),
  daysBefore: z.number().int().nonnegative(),
  dueDate: z.string().trim().min(1),
  owner: z.string().trim(),
  completed: z.boolean(),
  memberOnly: z.boolean().optional(),
  dependsOn: z.array(z.string()).optional(),
  bufferDays: z.number().int().nonnegative().optional(),
  durationDays: z.number().int().positive().optional(),
});

export const scheduleSchema = z.object({
  performanceDate: z.string().trim().min(1),
  tasks: z.array(scheduleTaskSchema),
  generatedAt: z.string().datetime().optional(),
});

export const entitlementsSchema = z.object({
  tier: z.enum(["free", "member", "custom"]),
  previewModes: z.array(z.enum(["dot-sketch", "stage-2.5d", "stage-3d"])),
  maxProjects: z.number().int().positive(),
  ganttEnabled: z.boolean(),
  autoRescheduleEnabled: z.boolean(),
  exportFormats: z.array(z.string()),
});

export type StageInput = z.infer<typeof stageInputSchema>;
export type PlanEngineMetadata = z.infer<typeof planEngineMetadataSchema>;
export type StagePositionInput = z.infer<typeof stagePositionSchema>;
export type AppearanceInput = z.infer<typeof appearanceSchema>;
export type PerformerInput = z.infer<typeof performerSchema>;
export type StageConfigurationInput = z.infer<typeof stageConfigurationSchema>;
export type FormationInput = z.infer<typeof formationSchema>;
export type FormationKeyframeInput = z.infer<typeof formationKeyframeSchema>;
export type ScheduleTaskInput = z.infer<typeof scheduleTaskSchema>;
export type ScheduleInput = z.infer<typeof scheduleSchema>;
export type EntitlementsInput = z.infer<typeof entitlementsSchema>;
