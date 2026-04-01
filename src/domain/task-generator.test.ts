import { generateKnowledgeTasks } from "./task-generator";

describe("generateKnowledgeTasks", () => {
  it("returns knowledge tasks for a goal", () => {
    const tasks = generateKnowledgeTasks({
      goalTitle: "掌握 Python 基础",
      durationDays: 7,
      intensity: "steady",
    });

    expect(tasks.length).toBeGreaterThanOrEqual(3);
    expect(tasks.every((task) => task.type === "knowledge")).toBe(true);
    expect(tasks.every((task) => task.experience > 0)).toBe(true);
  });
});
