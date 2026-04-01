import { db } from "../db";
import type { AppSnapshot, PetSnapshot } from "../app-snapshot";

const defaultSnapshotUser = { id: "local-user", name: "Local Partner" };

function pickFirst<T>(records: T[]): T | null {
  return records.length === 0 ? null : records[0];
}

export async function loadAppSnapshot(): Promise<AppSnapshot> {
  const [users, pets, goals, tasks, wishes, appearanceItems, pendingAppearanceRewards, videoFeedbacks, specialItems, stylePacks] =
    await Promise.all([
      db.users.toArray(),
      db.pets.toArray(),
      db.goals.toArray(),
      db.tasks.toArray(),
      db.wishes.toArray(),
      db.appearanceItems.toArray(),
      db.pendingAppearanceRewards.toArray(),
      db.videoFeedbacks.toArray(),
      db.specialItems.toArray(),
      db.stylePacks.toArray(),
    ]);

  return {
    user: users[0] ?? defaultSnapshotUser,
    pet: pickFirst<PetSnapshot>(pets),
    goals,
    tasks,
    wishes,
    appearanceItems,
    pendingAppearanceRewards,
    videoFeedbacks,
    specialItems,
    stylePacks,
  };
}

export async function saveAppSnapshot(snapshot: AppSnapshot): Promise<void> {
  await db.transaction(
    "rw",
    [
      db.users,
      db.pets,
      db.goals,
      db.tasks,
      db.wishes,
      db.appearanceItems,
      db.pendingAppearanceRewards,
      db.videoFeedbacks,
      db.specialItems,
      db.stylePacks,
    ],
    async () => {
      await db.users.clear();
      await db.pets.clear();
      await db.goals.clear();
      await db.tasks.clear();
      await db.wishes.clear();
      await db.appearanceItems.clear();
      await db.pendingAppearanceRewards.clear();
      await db.videoFeedbacks.clear();
      await db.specialItems.clear();
      await db.stylePacks.clear();

      await Promise.all([
        db.users.add(snapshot.user),
        snapshot.pet ? db.pets.add(snapshot.pet) : Promise.resolve(undefined),
        db.goals.bulkAdd(snapshot.goals),
        db.tasks.bulkAdd(snapshot.tasks),
        db.wishes.bulkAdd(snapshot.wishes),
        db.appearanceItems.bulkAdd(snapshot.appearanceItems),
        db.pendingAppearanceRewards.bulkAdd(snapshot.pendingAppearanceRewards),
        db.videoFeedbacks.bulkAdd(snapshot.videoFeedbacks),
        db.specialItems.bulkAdd(snapshot.specialItems),
        db.stylePacks.bulkAdd(snapshot.stylePacks),
      ]);
    },
  );
}
