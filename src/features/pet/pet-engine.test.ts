import { describe, expect, it } from "vitest";
import { evolvePet, maybeCreateWishEvent } from "./pet-engine";

describe("maybeCreateWishEvent", () => {
  it("creates a wish event only when remaining tasks are greater than three", () => {
    const result = maybeCreateWishEvent({
      cycleId: "g1",
      unfinishedTaskIds: ["t1", "t2", "t3", "t4"],
      appearanceItemId: "wing-1",
    });

    expect(result?.boundTaskId).toBeDefined();
  });
});

describe("evolvePet", () => {
  it("preserves an unused reward after evolution", () => {
    const result = evolvePet({
      currentStage: "growth",
      currentExperience: 120,
      rewardAppearanceIds: ["halo-1"],
      selectedAppearanceIds: [],
    });

    expect(result.pendingAppearanceIds).toContain("halo-1");
    expect(result.nextStage).toBe("advanced");
  });
});
