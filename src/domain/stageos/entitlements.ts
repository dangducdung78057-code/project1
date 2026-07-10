import type { MembershipTier, PreviewMode } from "./types";

export type Entitlements = {
  tier: MembershipTier;
  previewModes: PreviewMode[];
  maxPerformers: number;
  formationTemplateLimit: number | null;
  canUsePerformerSprites: boolean;
  canUseCostumeEditor: boolean;
  canUseStageAssets: boolean;
  canUseTimeline: boolean;
  canUseMovementPaths: boolean;
  canUseDiagnostics: boolean;
  canExportHighResolution: boolean;
  maxSnapshots: number | null;
};

export const ENTITLEMENTS: Record<MembershipTier, Entitlements> = {
  free: {
    tier: "free",
    previewModes: ["dot-sketch"],
    maxPerformers: 60,
    formationTemplateLimit: 4,
    canUsePerformerSprites: false,
    canUseCostumeEditor: false,
    canUseStageAssets: false,
    canUseTimeline: false,
    canUseMovementPaths: false,
    canUseDiagnostics: false,
    canExportHighResolution: false,
    maxSnapshots: 1,
  },
  member: {
    tier: "member",
    previewModes: ["dot-sketch", "stage-2.5d", "stage-3d"],
    maxPerformers: 100,
    formationTemplateLimit: null,
    canUsePerformerSprites: true,
    canUseCostumeEditor: true,
    canUseStageAssets: true,
    canUseTimeline: true,
    canUseMovementPaths: true,
    canUseDiagnostics: true,
    canExportHighResolution: true,
    maxSnapshots: null,
  },
  custom: {
    tier: "custom",
    previewModes: ["dot-sketch", "stage-2.5d", "stage-3d"],
    maxPerformers: 300,
    formationTemplateLimit: null,
    canUsePerformerSprites: true,
    canUseCostumeEditor: true,
    canUseStageAssets: true,
    canUseTimeline: true,
    canUseMovementPaths: true,
    canUseDiagnostics: true,
    canExportHighResolution: true,
    maxSnapshots: null,
  },
};

export function getEntitlements(tier: MembershipTier): Entitlements {
  return ENTITLEMENTS[tier];
}

export function canUsePreview(tier: MembershipTier, mode: PreviewMode): boolean {
  return getEntitlements(tier).previewModes.includes(mode);
}
