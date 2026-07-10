import type { CostumePlanPayload, PlatformSearchItem, Risk, ScheduleItem } from "@/lib/stageos";
import type { ConstraintLevel, ConstraintScope } from "@/lib/stageConstraints";
import type { PaletteColorEntry } from "@/lib/paletteLibrary";
import type { FormationTemplate } from "@/lib/stageKnowledge";
import type { PlanEngineMetadata } from "./schemas";

export type ConstraintNotice = {
  ruleId: string;
  level: ConstraintLevel;
  scope: ConstraintScope;
  reason: string;
  alternative?: string;
};

export type VisualPlan = {
  palette: PaletteColorEntry[];
  formation: Pick<FormationTemplate, "name" | "summary" | "rows" | "spacingRule" | "tips">;
  stage: {
    venueType: string;
    screenThemeColor: string;
    lightingStyle: string;
    backgroundGuidance: string;
  };
  props: {
    strategy: "none" | "minimal" | "featured";
    guidance: string[];
  };
};

export type GeneratedStagePlan = {
  costumePlan: CostumePlanPayload;
  visualPlan: VisualPlan;
  risks: Risk[];
  reverseSchedule: ScheduleItem[];
  platformSearch: PlatformSearchItem[];
  constraints: ConstraintNotice[];
  metadata: PlanEngineMetadata;
};
