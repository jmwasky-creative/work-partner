import type { PetStage } from "../../domain/models";

const STAGE_ORDER: PetStage[] = ["baby", "growth", "advanced", "final"];

export interface WishEvent {
  id: string;
  cycleId: string;
  appearanceItemId: string;
  boundTaskId: string;
  status: "bound";
  createdAt: string;
}

export interface WishInput {
  cycleId: string;
  appearanceItemId: string;
  unfinishedTaskIds: string[];
  rng?: (length: number) => number;
}

export function maybeCreateWishEvent(input: WishInput): WishEvent | null {
  if (input.unfinishedTaskIds.length <= 3) {
    return null;
  }
  const rng = input.rng ?? ((length: number) => Math.floor(Math.random() * length));
  const index = Math.min(Math.max(rng(input.unfinishedTaskIds.length), 0), input.unfinishedTaskIds.length - 1);
  return {
    id: `${input.cycleId}-${input.appearanceItemId}-${Date.now()}`,
    cycleId: input.cycleId,
    appearanceItemId: input.appearanceItemId,
    boundTaskId: input.unfinishedTaskIds[index],
    status: "bound",
    createdAt: new Date().toISOString(),
  };
}

export interface PetEvolutionInput {
  currentStage?: PetStage;
  stage?: PetStage;
  currentExperience?: number;
  experience?: number;
  rewardAppearanceIds?: string[];
  pendingAppearanceIds?: string[];
  selectedAppearanceIds: string[];
}

export interface PetEvolutionResult {
  nextStage: PetStage;
  pendingAppearanceIds: string[];
  equippedAppearanceIds: string[];
}

export function evolvePet(input: PetEvolutionInput): PetEvolutionResult {
  const currentStage = input.currentStage ?? input.stage ?? "baby";
  const currentExperience = input.currentExperience ?? input.experience ?? 0;
  const rewardAppearanceIds = input.rewardAppearanceIds ?? input.pendingAppearanceIds ?? [];
  const currentIndex = STAGE_ORDER.indexOf(currentStage);
  const shouldAdvance = currentExperience >= 100 && currentIndex < STAGE_ORDER.length - 1;
  const nextStage = shouldAdvance ? STAGE_ORDER[currentIndex + 1] : currentStage;
  const pendingAppearanceIds = rewardAppearanceIds.filter(
    (item) => !input.selectedAppearanceIds.includes(item),
  );
  return {
    nextStage,
    pendingAppearanceIds,
    equippedAppearanceIds: [...input.selectedAppearanceIds],
  };
}
