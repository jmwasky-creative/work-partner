import { expect, test } from "vitest";
import { completeTask } from "./task-actions";
import type { Task } from "../../domain/models";

test("marks the task done and returns awarded experience", () => {
  const input: Task = {
    id: "t1",
    goalId: "g1",
    title: "Read a chapter",
    description: "Understand the concept",
    type: "knowledge",
    status: "todo",
    experience: 25,
    createdAt: new Date().toISOString(),
  };

  const result = completeTask(input);

  expect(result.task.status).toBe("done");
  expect(result.awardedExperience).toBe(25);
});
