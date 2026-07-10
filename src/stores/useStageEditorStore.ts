import { create } from "zustand";
import type { MembershipTier, Performer, StageConfiguration, StagePosition } from "@/domain/stageos/types";
import { FORMATIONS, type FormationTemplateId } from "@/domain/stageos/formations";
import { getEntitlements } from "@/domain/stageos/entitlements";
import { buildSamplePerformers } from "@/domain/stageos/sampleFormation";

export type StageEditorState = {
  tier: MembershipTier;
  stage: StageConfiguration;
  performers: Performer[];
  selectedIds: string[];
  activeTemplateId: FormationTemplateId | null;
  dirty: boolean;

  setTier: (tier: MembershipTier) => void;
  setPerformerCount: (count: number) => void;
  selectOnly: (id: string | null) => void;
  updatePosition: (id: string, position: StagePosition) => void;
  applyTemplate: (id: FormationTemplateId) => void;
  setLedTitle: (title: string) => void;
  markSaved: () => void;
  loadFormation: (payload: { stage: StageConfiguration; performers: Performer[]; activeTemplateId?: FormationTemplateId | null }) => void;
};

const DEFAULT_STAGE: StageConfiguration = {
  widthM: 14,
  depthM: 8,
  riserLevels: 4,
  backgroundColor: "#1c2733",
  ledTitle: "校园文艺汇演",
};

function clampCount(tier: MembershipTier, count: number) {
  const max = getEntitlements(tier).maxPerformers;
  return Math.max(1, Math.min(max, Math.round(count)));
}

export const useStageEditorStore = create<StageEditorState>((set, get) => ({
  tier: "free",
  stage: DEFAULT_STAGE,
  performers: buildSamplePerformers(36),
  selectedIds: [],
  activeTemplateId: "three-rows",
  dirty: false,

  setTier: (tier) => {
    const { performers } = get();
    const max = getEntitlements(tier).maxPerformers;
    set({
      tier,
      performers: performers.length > max ? performers.slice(0, max) : performers,
    });
  },

  setPerformerCount: (count) => {
    const { tier, performers, activeTemplateId } = get();
    const next = clampCount(tier, count);
    if (next === performers.length) return;
    let list: Performer[];
    if (next < performers.length) {
      list = performers.slice(0, next);
    } else {
      const extra = buildSamplePerformers(next).slice(performers.length);
      list = [...performers, ...extra];
    }
    const template = FORMATIONS.find((f) => f.id === activeTemplateId) ?? FORMATIONS[0];
    const positions = template.generate(list);
    set({
      performers: list.map((p) => ({ ...p, position: positions[p.id] ?? p.position })),
      dirty: true,
    });
  },

  selectOnly: (id) => set({ selectedIds: id ? [id] : [] }),

  updatePosition: (id, position) =>
    set((state) => ({
      performers: state.performers.map((p) => (p.id === id ? { ...p, position } : p)),
      dirty: true,
    })),

  applyTemplate: (id) => {
    const { performers, tier } = get();
    const template = FORMATIONS.find((f) => f.id === id);
    if (!template) return;
    if (template.memberOnly && tier === "free") return;
    const positions = template.generate(performers);
    set({
      performers: performers.map((p) => ({ ...p, position: positions[p.id] ?? p.position })),
      activeTemplateId: id,
      dirty: true,
    });
  },

  setLedTitle: (title) =>
    set((state) => ({ stage: { ...state.stage, ledTitle: title }, dirty: true })),

  markSaved: () => set({ dirty: false }),

  loadFormation: ({ stage, performers, activeTemplateId }) =>
    set({ stage, performers, activeTemplateId: activeTemplateId ?? null, dirty: false, selectedIds: [] }),
}));
