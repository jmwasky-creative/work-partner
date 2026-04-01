import type { Intensity, PetStage } from "./models";

export const WISH_TRIGGER_THRESHOLD = 3;
export const APPEARANCE_CATEGORIES = ["head", "body", "accent", "effect", "background"] as const;
export const INTENSITY_MULTIPLIER: Record<Intensity, number> = {
  light: 0.9,
  steady: 1,
  intense: 1.2,
};
export const PET_STAGE_ORDER: PetStage[] = ["baby", "growth", "advanced", "final"];
