import type {
  AppearanceItem,
  GoalCycle,
  PendingAppearanceReward,
  PetStylePack,
  SpecialItem,
  Task,
  VideoFeedback,
  Wish,
} from "../domain/models";

export interface PetSnapshot {
  id: string;
  name: string;
  stage: string;
  experience: number;
  stylePackId?: string;
  activeAppearanceIds: string[];
}

export interface AppSnapshot {
  user: { id: string; name: string };
  pet: PetSnapshot | null;
  goals: GoalCycle[];
  tasks: Task[];
  wishes: Wish[];
  appearanceItems: AppearanceItem[];
  pendingAppearanceRewards: PendingAppearanceReward[];
  videoFeedbacks: VideoFeedback[];
  specialItems: SpecialItem[];
  stylePacks: PetStylePack[];
}
