import type { Task } from "../../domain/models";

export function completeTask(task: Task) {
  return {
    task: { ...task, status: "done" as const },
    awardedExperience: task.experience,
  };
}
