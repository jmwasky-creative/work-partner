import Dexie, { type Table } from "dexie";
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
import type { PetSnapshot } from "./app-snapshot";

export interface UserRecord {
  id: string;
  name: string;
}

export interface PetRecord extends PetSnapshot {}

export class WorkPartnerDb extends Dexie {
  users!: Table<UserRecord, string>;
  pets!: Table<PetRecord, string>;
  goals!: Table<GoalCycle, string>;
  tasks!: Table<Task, string>;
  wishes!: Table<Wish, string>;
  appearanceItems!: Table<AppearanceItem, string>;
  pendingAppearanceRewards!: Table<PendingAppearanceReward, string>;
  videoFeedbacks!: Table<VideoFeedback, string>;
  specialItems!: Table<SpecialItem, string>;
  stylePacks!: Table<PetStylePack, string>;

  constructor() {
    super("work-partner");
    this.version(1).stores({
      users: "id",
      pets: "id",
      goals: "id, startedAt",
      tasks: "id, goalId, status, type",
      wishes: "id, cycleId, status",
      appearanceItems: "id, category, rarity",
      pendingAppearanceRewards: "id, sourceWishId",
      videoFeedbacks: "id, taskId",
      specialItems: "id",
      stylePacks: "id, tags",
    });
  }
}

export const db = new WorkPartnerDb();
