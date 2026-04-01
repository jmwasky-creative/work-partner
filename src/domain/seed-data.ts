import type {
  AppearanceItem,
  GoalCycle,
  KnowledgeNode,
  PetStylePack,
} from "./models";

export const petStylePacks: PetStylePack[] = [
  {
    id: "style-joy",
    name: "Playful Joy",
    description: "Rounded, bright companion sculpted for early learners.",
    tags: ["low-age", "bright"],
    accentColor: "#F7C948",
  },
  {
    id: "style-classic",
    name: "Classic Mascot",
    description: "Neutral mascot with clean lines, suitable for any age.",
    tags: ["neutral", "friendly"],
    accentColor: "#5A9BD5",
  },
  {
    id: "style-companion",
    name: "Companion Persona",
    description: "Soft humanoid friend that balances expressiveness and calm.",
    tags: ["teen", "companion"],
    accentColor: "#1B998B",
  },
  {
    id: "style-anime",
    name: "Stylized Anime",
    description: "Sharp, collectible-style portrait ideal for long-term players.",
    tags: ["anime", "stylized"],
    accentColor: "#E91E63",
  },
];

export const knowledgeNodeTemplates: KnowledgeNode[] = [
  {
    id: "km-1",
    title: "Concept Clarity",
    focus: "Explain the central definition and why it matters.",
    experienceWeight: 3,
    summary: "Walk through the idea with a short example.",
  },
  {
    id: "km-2",
    title: "Applied Practice",
    focus: "Solve a focused exercise using the concept.",
    experienceWeight: 2,
    summary: "Tackle a short practice or quiz item and note the strategy.",
  },
  {
    id: "km-3",
    title: "Teach Back",
    focus: "Describe the idea in your own words.",
    experienceWeight: 4,
    summary: "Record or write a brief explanation covering the flow.",
  },
  {
    id: "km-4",
    title: "Error Review",
    focus: "Collect mistakes or unknowns discovered during practice.",
    experienceWeight: 1.5,
    summary: "Capture what tripped you up and how you'd improve next time.",
  },
];

export const appearanceItems: AppearanceItem[] = [
  {
    id: "appearance-wings",
    name: "Inspiration Wings",
    category: "accent",
    description: "Soft trailing wings that glow when you explain aloud.",
    rarity: "rare",
    linkedStyle: "style-anime",
  },
  {
    id: "appearance-halo",
    name: "Explain Halo",
    category: "effect",
    description: "A gentle halo earned by uploading a Feynman-style video.",
    rarity: "epic",
  },
  {
    id: "appearance-buddycap",
    name: "Buddy Cap",
    category: "head",
    description: "A cozy cap for the youngest learners.",
    rarity: "common",
    linkedStyle: "style-joy",
  },
  {
    id: "appearance-mecha-visor",
    name: "Discovery Visor",
    category: "head",
    description: "Transparent visor for explorers that protects the eyes and motivates focus.",
    rarity: "rare",
    linkedStyle: "style-companion",
  },
];

export const sampleGoals: GoalCycle[] = [
  {
    id: "goal-python",
    title: "10-day Python Foundation",
    description: "Cover the basics of syntax, data structures, and scripting.",
    durationDays: 10,
    startedAt: new Date().toISOString(),
    targetOutcome: "Bridge to writing simple automation scripts.",
    intensity: "steady",
    completed: false,
  },
];
