import { z } from "zod";

export type MembershipTier = "free" | "member" | "custom";
export type PreviewMode = "dot-sketch" | "stage-2.5d" | "stage-3d";
export type Gender = "male" | "female" | "unknown";

export type StagePosition = {
  x: number;
  z: number;
  riserLevel?: number;
};

export type Appearance = {
  outfitId: string;
  upperColor: string;
  lowerColor: string;
  footwearColor: string;
  accentColor: string;
};

export type Performer = {
  id: string;
  gender: Gender;
  heightCm: number;
  roleLabel?: string;
  groupId?: string;
  position: StagePosition;
  appearance: Appearance;
};

export type StageConfiguration = {
  widthM: number;
  depthM: number;
  riserLevels: number;
  backgroundColor: string;
  ledTitle: string;
};

export type FormationKeyframe = {
  id: string;
  name: string;
  timeSec: number;
  performerPositions: Record<string, StagePosition>;
};

export type ProjectInput = {
  title: string;
  schoolStage: "primary" | "junior" | "senior";
  programType: "chorus" | "recitation" | "dance" | "instrumental" | "drama";
  performerCount: number;
  performanceDate: string;
  rehearsalFrequencyPerWeek: number;
  perPersonBudget: number;
};

export const projectInputSchema = z.object({
  title: z.string().trim().min(1, "请填写项目名称"),
  schoolStage: z.enum(["primary", "junior", "senior"]),
  programType: z.enum(["chorus", "recitation", "dance", "instrumental", "drama"]),
  performerCount: z.number().int().min(1).max(300),
  performanceDate: z.string().min(1),
  rehearsalFrequencyPerWeek: z.number().int().min(1).max(7),
  perPersonBudget: z.number().min(0),
});

export type ScheduleTask = {
  id: string;
  title: string;
  category: string;
  daysBefore: number;
  dueDate: string;
  owner: string;
  completed: boolean;
  memberOnly?: boolean;
  dependsOn?: string[];
};

export type GeneratedPlan = {
  engine: "local-rules" | "ai-assisted";
  generatedAt: string;
  version: string;
  summary: string;
  recommendedFormation: string;
  palette: string[];
  costumeNotes: string[];
  risks: string[];
};
