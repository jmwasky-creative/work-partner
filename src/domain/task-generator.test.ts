import { describe, expect, it } from "vitest";
import { generateKnowledgeTasks } from "./task-generator";

describe("generateKnowledgeTasks", () => {
  it("returns knowledge tasks for a goal", () => {
    const tasks = generateKnowledgeTasks({
      goalTitle: "Python Foundation",
      durationDays: 7,
      intensity: "steady",
    });

    expect(tasks.length).toBeGreaterThanOrEqual(3);
    expect(tasks.every((task) => task.type === "knowledge")).toBe(true);
    expect(tasks.every((task) => task.experience > 0)).toBe(true);
  });

  it("formats generated task titles with the focus area", () => {
    const [firstTask] = generateKnowledgeTasks({
      goalTitle: "React Basics",
      durationDays: 5,
      intensity: "light",
    });

    expect(firstTask.goalId).toBe("react-basics");
    expect(firstTask.title).toContain(":");
    expect(firstTask.description.length).toBeGreaterThan(0);
  });
});
