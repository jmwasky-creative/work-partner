import type { Intensity, Task } from "./models";
import { knowledgeNodeTemplates } from "./seed-data";
import { INTENSITY_MULTIPLIER } from "./constants";

export interface KnowledgeTaskInput {
  goalTitle: string;
  durationDays: number;
  intensity?: Intensity;
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function generateKnowledgeTasks(input: KnowledgeTaskInput): Task[] {
  const intensity = input.intensity ?? "steady";
  const multiplier = INTENSITY_MULTIPLIER[intensity];
  const goalId = slugify(input.goalTitle) || "goal";
  const baseTasks = knowledgeNodeTemplates.slice(0, Math.min(knowledgeNodeTemplates.length, 4));

  return baseTasks.map((node, index) => {
    const experience = Math.max(15, Math.round(node.experienceWeight * 15 * multiplier));
    return {
      id: `${goalId}-knowledge-${index}`,
      goalId,
      title: `${node.title}: ${node.focus}`,
      description: node.summary,
      type: "knowledge" as const,
      status: "todo" as const,
      experience,
      createdAt: new Date(Date.now() + index).toISOString(),
    };
  });
}
