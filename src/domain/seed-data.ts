import type {
  AppearanceItem,
  GoalCycle,
  KnowledgeNode,
  PetStylePack,
} from "./models";
import type { AppSnapshot } from "../data/app-snapshot";

export const petStylePacks: PetStylePack[] = [
  {
    id: "style-joy",
    name: "轻快活力",
    description: "圆润明亮的伙伴造型，适合刚开始学习的阶段。",
    tags: ["low-age", "bright"],
    accentColor: "#F7C948",
  },
  {
    id: "style-classic",
    name: "经典搭子",
    description: "线条简洁、气质稳定，适合长期陪伴。",
    tags: ["neutral", "friendly"],
    accentColor: "#5A9BD5",
  },
  {
    id: "style-companion",
    name: "伙伴人格",
    description: "更有人味的陪伴形象，兼顾亲和与沉稳。",
    tags: ["teen", "companion"],
    accentColor: "#1B998B",
  },
  {
    id: "style-anime",
    name: "收藏系风格",
    description: "更有辨识度的进阶外观，适合长期养成。",
    tags: ["anime", "stylized"],
    accentColor: "#E91E63",
  },
];

export const knowledgeNodeTemplates: KnowledgeNode[] = [
  {
    id: "km-1",
    title: "概念理解",
    focus: "说明核心定义，以及它为什么重要。",
    experienceWeight: 3,
    summary: "用一个短例子讲清楚这条知识点。",
  },
  {
    id: "km-2",
    title: "应用练习",
    focus: "围绕这个知识点完成一次聚焦练习。",
    experienceWeight: 2,
    summary: "完成一道短练习或小测，并记录自己的解题思路。",
  },
  {
    id: "km-3",
    title: "反向讲解",
    focus: "尝试用自己的话把知识点讲出来。",
    experienceWeight: 4,
    summary: "录制或写下一段解释，梳理整体流程。",
  },
  {
    id: "km-4",
    title: "错题复盘",
    focus: "整理练习中暴露出的疑问与错误。",
    experienceWeight: 1.5,
    summary: "记录卡住的地方，以及下一次该如何改进。",
  },
];

export const appearanceItems: AppearanceItem[] = [
  {
    id: "appearance-wings",
    name: "灵感羽翼",
    category: "accent",
    description: "当你开口讲解时，会轻轻发光的羽翼。",
    rarity: "rare",
    linkedStyle: "style-anime",
  },
  {
    id: "appearance-halo",
    name: "讲解光环",
    category: "effect",
    description: "完成费曼式讲解后获得的柔和光环。",
    rarity: "epic",
  },
  {
    id: "appearance-buddycap",
    name: "伙伴小帽",
    category: "head",
    description: "为学习起步阶段准备的温暖帽饰。",
    rarity: "common",
    linkedStyle: "style-joy",
  },
  {
    id: "appearance-mecha-visor",
    name: "探索护目镜",
    category: "head",
    description: "适合探索型伙伴的透明护目镜，兼顾专注与动感。",
    rarity: "rare",
    linkedStyle: "style-companion",
  },
];

export const sampleGoals: GoalCycle[] = [
  {
    id: "goal-python",
    title: "10 天 Python 入门",
    description: "覆盖语法、数据结构与基础脚本能力。",
    durationDays: 10,
    startedAt: new Date().toISOString(),
    targetOutcome: "能够写出简单的自动化脚本。",
    intensity: "steady",
    completed: false,
  },
];

const DEMO_TIMESTAMP = "2026-04-01T00:00:00.000Z";

export function createDemoSnapshot(): AppSnapshot {
  const [primaryGoal] = sampleGoals;
  const demoGoal: GoalCycle =
    primaryGoal ?? {
      id: "goal-demo",
      title: "演示学习冲刺",
      description: "通过一轮简短的学习周期快速上手 Work Partner。",
      durationDays: 7,
      startedAt: DEMO_TIMESTAMP,
      targetOutcome: "熟悉 Work Partner 的完整闭环。",
      intensity: "steady",
      completed: false,
    };

  const demoTasks = knowledgeNodeTemplates.slice(0, 4).map((node, index) => ({
    id: `${demoGoal.id}-task-${index + 1}`,
    goalId: demoGoal.id,
    title: `${node.title}：${node.focus}`,
    description: node.summary,
    type: "knowledge" as const,
    status: "todo" as const,
    experience: Math.max(15, Math.round(node.experienceWeight * 15)),
    createdAt: new Date(Date.parse(DEMO_TIMESTAMP) + index * 1000).toISOString(),
  }));

  return {
    user: { id: "local-user", name: "演示伙伴" },
    pet: {
      id: "pet-demo",
      name: "搭子",
      stage: "baby",
      experience: 20,
      stylePackId: petStylePacks[0]?.id,
      activeAppearanceIds: appearanceItems.slice(0, 1).map((item) => item.id),
    },
    goals: [demoGoal],
    tasks: demoTasks,
    wishes: [],
    appearanceItems: [...appearanceItems],
    pendingAppearanceRewards: [],
    videoFeedbacks: [],
    specialItems: [],
    stylePacks: [...petStylePacks],
  };
}
