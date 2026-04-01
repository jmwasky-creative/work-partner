export type TaskType = "temporary" | "knowledge" | "assigned";
export type TaskStatus = "todo" | "done";
export type PetStage = "baby" | "growth" | "advanced" | "final";
export type WishStatus = "pending" | "bound" | "rewarded";
export type Intensity = "steady" | "intense" | "light";

export interface GoalCycle {
  id: string;
  title: string;
  description: string;
  durationDays: number;
  startedAt: string;
  targetOutcome: string;
  intensity: Intensity;
  completed: boolean;
}

export interface Task {
  id: string;
  goalId: string;
  title: string;
  description: string;
  type: TaskType;
  status: TaskStatus;
  experience: number;
  createdAt: string;
  dueDate?: string;
  wishId?: string;
}

export interface KnowledgeNode {
  id: string;
  title: string;
  focus: string;
  experienceWeight: number;
  summary: string;
}

export interface PetStylePack {
  id: string;
  name: string;
  description: string;
  tags: string[];
  accentColor: string;
}

export interface AppearanceItem {
  id: string;
  name: string;
  category: string;
  description: string;
  rarity: "common" | "rare" | "epic";
  linkedStyle?: string;
}

export interface Wish {
  id: string;
  cycleId: string;
  appearanceItemId: string;
  boundTaskId?: string;
  status: WishStatus;
  createdAt: string;
}

export interface PendingAppearanceReward {
  id: string;
  appearanceItemId: string;
  sourceWishId: string;
  retainedUntil?: string;
}

export interface VideoFeedback {
  id: string;
  taskId: string;
  knowledgeNodeId: string;
  summary: string;
  recordedAt: string;
}

export interface SpecialItem {
  id: string;
  label: string;
  badge: string;
  description: string;
}
