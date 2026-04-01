import "fake-indexeddb/auto";
import { afterEach, expect, test } from "vitest";
import { db } from "../db";
import { loadAppSnapshot, saveAppSnapshot } from "./app-repository";

afterEach(async () => {
  await db.delete();
  await db.open();
});

test("saves and loads the app snapshot from indexeddb", async () => {
  await saveAppSnapshot({
    user: { id: "u1", name: "Test User" },
    pet: {
      id: "pet-1",
      name: "Buddy",
      stage: "growth",
      experience: 42,
      activeAppearanceIds: [],
    },
    goals: [],
    tasks: [],
    wishes: [],
    appearanceItems: [],
    pendingAppearanceRewards: [],
    videoFeedbacks: [],
    specialItems: [],
    stylePacks: [],
  });

  const snapshot = await loadAppSnapshot();

  expect(snapshot.user.name).toBe("Test User");
  expect(snapshot.pet?.experience).toBe(42);
});
