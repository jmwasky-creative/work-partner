import { describe, expect, it } from "vitest";
import { awardFeedbackReward } from "./feedback-rewards";

describe("awardFeedbackReward", () => {
  it("awards a special item for a knowledge explanation video", () => {
    const reward = awardFeedbackReward({
      knowledgeNodeId: "closures",
      videoTitle: "Explaining closures",
    });

    expect(reward.itemType).toBe("special-item");
    expect(reward.badgeLabel).toContain("Explanation Badge");
    expect(reward.id).toContain("closures");
  });
});
