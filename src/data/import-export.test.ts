import { parseSnapshot, serializeSnapshot } from "./import-export";

test("round-trips an app snapshot", () => {
  const json = serializeSnapshot({
    user: { id: "u1", name: "Test User" },
    pet: null,
    goals: [],
    tasks: [],
    wishes: [],
    appearanceItems: [],
    pendingAppearanceRewards: [],
    videoFeedbacks: [],
    specialItems: [],
    stylePacks: [],
  });

  expect(parseSnapshot(json).user.name).toBe("Test User");
});
