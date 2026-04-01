# Work Partner MVP Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a browser-based Work Partner MVP with local IndexedDB storage, goal-driven task generation, pet growth/evolution, Feynman video feedback records, and the appearance wish system.

**Architecture:** Start with a Vite + React + TypeScript single-page app. Keep state in IndexedDB through a thin repository layer, seed the app with local style packs, pet templates, and appearance data, then compose the MVP out of five pages: dashboard, tasks, goals, pet, and feedback.

**Tech Stack:** Vite, React, TypeScript, React Router, Dexie, Vitest, Testing Library

---

### Task 1: Bootstrap The Frontend App Shell

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/app/App.tsx`
- Create: `src/app/routes.tsx`
- Create: `src/styles/theme.css`
- Create: `src/styles/reset.css`
- Create: `src/pages/dashboard-page.tsx`
- Create: `src/pages/tasks-page.tsx`
- Create: `src/pages/goals-page.tsx`
- Create: `src/pages/pet-page.tsx`
- Create: `src/pages/feedback-page.tsx`
- Test: `src/app/app.test.tsx`

**Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { App } from "./App";

test("renders primary navigation", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  expect(screen.getByRole("link", { name: "成长看板" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "任务" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "目标" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "宠物" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "反馈" })).toBeInTheDocument();
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- src/app/app.test.tsx`
Expected: FAIL with missing `App` module or missing test setup.

**Step 3: Write minimal implementation**

```tsx
// src/app/App.tsx
import { NavLink, Outlet } from "react-router-dom";

const links = [
  { to: "/", label: "成长看板" },
  { to: "/tasks", label: "任务" },
  { to: "/goals", label: "目标" },
  { to: "/pet", label: "宠物" },
  { to: "/feedback", label: "反馈" },
];

export function App() {
  return (
    <div className="shell">
      <aside className="shell-nav">
        <h1>Work Partner</h1>
        <nav>
          {links.map((link) => (
            <NavLink key={link.to} to={link.to}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="shell-content">
        <Outlet />
      </main>
    </div>
  );
}
```

```tsx
// src/app/routes.tsx
import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { DashboardPage } from "../pages/dashboard-page";
import { TasksPage } from "../pages/tasks-page";
import { GoalsPage } from "../pages/goals-page";
import { PetPage } from "../pages/pet-page";
import { FeedbackPage } from "../pages/feedback-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "tasks", element: <TasksPage /> },
      { path: "goals", element: <GoalsPage /> },
      { path: "pet", element: <PetPage /> },
      { path: "feedback", element: <FeedbackPage /> },
    ],
  },
]);
```

**Step 4: Run test to verify it passes**

Run: `npm test -- src/app/app.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add package.json tsconfig.json vite.config.ts index.html src
git commit -m "feat: bootstrap work partner browser shell"
```

### Task 2: Define Shared Domain Models And Seed Data

**Files:**
- Create: `src/domain/models.ts`
- Create: `src/domain/constants.ts`
- Create: `src/domain/seed-data.ts`
- Create: `src/domain/task-generator.ts`
- Test: `src/domain/task-generator.test.ts`

**Step 1: Write the failing test**

```ts
import { generateKnowledgeTasks } from "./task-generator";

test("generates knowledge tasks from a goal topic", () => {
  const tasks = generateKnowledgeTasks({
    goalTitle: "掌握 Python 基础",
    durationDays: 7,
  });

  expect(tasks.length).toBeGreaterThanOrEqual(4);
  expect(tasks.every((task) => task.type === "knowledge")).toBe(true);
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- src/domain/task-generator.test.ts`
Expected: FAIL because generator module does not exist.

**Step 3: Write minimal implementation**

```ts
// src/domain/models.ts
export type TaskType = "temporary" | "knowledge" | "assigned";
export type TaskStatus = "todo" | "done";
export type PetStage = "baby" | "growth" | "advanced" | "final";
export type WishStatus = "pending" | "bound" | "rewarded";

export interface GoalCycle {
  id: string;
  title: string;
  description: string;
  durationDays: number;
  startedAt: string;
}

export interface Task {
  id: string;
  goalId: string;
  title: string;
  type: TaskType;
  status: TaskStatus;
  experience: number;
  wishId?: string;
}
```

```ts
// src/domain/task-generator.ts
import type { Task } from "./models";

export function generateKnowledgeTasks(input: {
  goalTitle: string;
  durationDays: number;
}): Task[] {
  const fragments = ["理解概念", "完成练习", "复述要点", "整理错题"];

  return fragments.map((fragment, index) => ({
    id: `knowledge-${index}`,
    goalId: "draft-goal",
    title: `${input.goalTitle} - ${fragment}`,
    type: "knowledge",
    status: "todo",
    experience: 20 + index * 5,
  }));
}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- src/domain/task-generator.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/domain
git commit -m "feat: add domain models and task generation seeds"
```

### Task 3: Add IndexedDB Persistence And Import Export

**Files:**
- Create: `src/data/db.ts`
- Create: `src/data/repositories/app-repository.ts`
- Create: `src/data/import-export.ts`
- Create: `src/data/app-snapshot.ts`
- Test: `src/data/import-export.test.ts`

**Step 1: Write the failing test**

```ts
import { serializeSnapshot, parseSnapshot } from "./import-export";

test("round-trips an app snapshot", () => {
  const json = serializeSnapshot({
    user: { id: "u1", name: "Test User" },
    tasks: [],
    goals: [],
    pet: null,
  });

  expect(parseSnapshot(json).user.name).toBe("Test User");
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- src/data/import-export.test.ts`
Expected: FAIL because persistence helpers are missing.

**Step 3: Write minimal implementation**

```ts
// src/data/import-export.ts
import type { AppSnapshot } from "./app-snapshot";

export function serializeSnapshot(snapshot: AppSnapshot): string {
  return JSON.stringify(snapshot, null, 2);
}

export function parseSnapshot(raw: string): AppSnapshot {
  return JSON.parse(raw) as AppSnapshot;
}
```

```ts
// src/data/db.ts
import Dexie, { type Table } from "dexie";
import type { GoalCycle, Task } from "../domain/models";

export interface UserRecord {
  id: string;
  name: string;
}

export interface PetRecord {
  id: string;
  name: string;
  stage: string;
  experience: number;
}

export class WorkPartnerDb extends Dexie {
  users!: Table<UserRecord, string>;
  goals!: Table<GoalCycle, string>;
  tasks!: Table<Task, string>;

  constructor() {
    super("work-partner");
    this.version(1).stores({
      users: "id",
      goals: "id, startedAt",
      tasks: "id, goalId, status, type",
    });
  }
}

export const db = new WorkPartnerDb();
```

**Step 4: Run test to verify it passes**

Run: `npm test -- src/data/import-export.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/data
git commit -m "feat: add indexeddb persistence and snapshot utilities"
```

### Task 4: Implement Goal Creation And Task Management

**Files:**
- Create: `src/features/goals/create-goal-form.tsx`
- Create: `src/features/tasks/task-list.tsx`
- Create: `src/features/tasks/task-item.tsx`
- Create: `src/features/tasks/task-actions.ts`
- Modify: `src/pages/goals-page.tsx`
- Modify: `src/pages/tasks-page.tsx`
- Test: `src/features/tasks/task-actions.test.ts`

**Step 1: Write the failing test**

```ts
import { completeTask } from "./task-actions";
import type { Task } from "../../domain/models";

test("marks a task done and awards experience", () => {
  const task: Task = {
    id: "t1",
    goalId: "g1",
    title: "完成闭包练习",
    type: "knowledge",
    status: "todo",
    experience: 30,
  };

  const result = completeTask(task);

  expect(result.task.status).toBe("done");
  expect(result.awardedExperience).toBe(30);
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- src/features/tasks/task-actions.test.ts`
Expected: FAIL because task action logic is missing.

**Step 3: Write minimal implementation**

```ts
// src/features/tasks/task-actions.ts
import type { Task } from "../../domain/models";

export function completeTask(task: Task) {
  return {
    task: { ...task, status: "done" as const },
    awardedExperience: task.experience,
  };
}
```

```tsx
// src/features/goals/create-goal-form.tsx
import { useState } from "react";

export function CreateGoalForm(props: {
  onCreateGoal: (input: { title: string; description: string; durationDays: number }) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [durationDays, setDurationDays] = useState(7);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.onCreateGoal({ title, description, durationDays });
      }}
    >
      <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="学习目标" />
      <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
      <input
        type="number"
        value={durationDays}
        onChange={(event) => setDurationDays(Number(event.target.value))}
      />
      <button type="submit">创建目标</button>
    </form>
  );
}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- src/features/tasks/task-actions.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/features src/pages
git commit -m "feat: add goal creation and task completion flow"
```

### Task 5: Implement Pet Growth, Evolution, And Wish Binding

**Files:**
- Create: `src/features/pet/pet-engine.ts`
- Create: `src/features/pet/pet-summary-card.tsx`
- Create: `src/features/pet/wish-event-panel.tsx`
- Create: `src/features/pet/evolution-choice-panel.tsx`
- Modify: `src/pages/dashboard-page.tsx`
- Modify: `src/pages/pet-page.tsx`
- Test: `src/features/pet/pet-engine.test.ts`

**Step 1: Write the failing test**

```ts
import { maybeCreateWishEvent, evolvePet } from "./pet-engine";

test("creates a wish event only when remaining tasks are greater than three", () => {
  const result = maybeCreateWishEvent({
    cycleId: "g1",
    unfinishedTaskIds: ["t1", "t2", "t3", "t4"],
    appearanceItemId: "wing-1",
  });

  expect(result?.boundTaskId).toBeDefined();
});

test("preserves an unused reward after evolution", () => {
  const pet = evolvePet({
    currentStage: "growth",
    currentExperience: 120,
    rewardAppearanceIds: ["halo-1"],
    selectedAppearanceIds: [],
  });

  expect(pet.pendingAppearanceIds).toContain("halo-1");
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- src/features/pet/pet-engine.test.ts`
Expected: FAIL because pet engine logic does not exist.

**Step 3: Write minimal implementation**

```ts
// src/features/pet/pet-engine.ts
export function maybeCreateWishEvent(input: {
  cycleId: string;
  unfinishedTaskIds: string[];
  appearanceItemId: string;
}) {
  if (input.unfinishedTaskIds.length <= 3) {
    return null;
  }

  const boundTaskId = input.unfinishedTaskIds[0];

  return {
    cycleId: input.cycleId,
    appearanceItemId: input.appearanceItemId,
    boundTaskId,
    status: "bound" as const,
  };
}

export function evolvePet(input: {
  currentStage: string;
  currentExperience: number;
  rewardAppearanceIds: string[];
  selectedAppearanceIds: string[];
}) {
  return {
    nextStage: input.currentExperience >= 100 ? "advanced" : input.currentStage,
    equippedAppearanceIds: input.selectedAppearanceIds,
    pendingAppearanceIds: input.rewardAppearanceIds.filter(
      (item) => !input.selectedAppearanceIds.includes(item),
    ),
  };
}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- src/features/pet/pet-engine.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/features/pet src/pages
git commit -m "feat: add pet evolution and wish binding logic"
```

### Task 6: Implement Video Feedback Records And Special Rewards

**Files:**
- Create: `src/features/feedback/video-feedback-form.tsx`
- Create: `src/features/feedback/feedback-rewards.ts`
- Modify: `src/pages/feedback-page.tsx`
- Test: `src/features/feedback/feedback-rewards.test.ts`

**Step 1: Write the failing test**

```ts
import { awardFeedbackReward } from "./feedback-rewards";

test("awards a special item for a knowledge explanation video", () => {
  const reward = awardFeedbackReward({
    knowledgeNodeId: "closure",
    videoTitle: "我来解释闭包",
  });

  expect(reward.itemType).toBe("special-item");
  expect(reward.badgeLabel).toContain("讲解");
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- src/features/feedback/feedback-rewards.test.ts`
Expected: FAIL because reward logic is missing.

**Step 3: Write minimal implementation**

```ts
// src/features/feedback/feedback-rewards.ts
export function awardFeedbackReward(input: {
  knowledgeNodeId: string;
  videoTitle: string;
}) {
  return {
    knowledgeNodeId: input.knowledgeNodeId,
    itemType: "special-item" as const,
    badgeLabel: `讲解徽章: ${input.videoTitle}`,
  };
}
```

```tsx
// src/features/feedback/video-feedback-form.tsx
export function VideoFeedbackForm() {
  return (
    <form>
      <input placeholder="视频标题" />
      <textarea placeholder="这一段知识点你是怎么讲给别人听的？" />
      <button type="submit">保存讲解记录</button>
    </form>
  );
}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- src/features/feedback/feedback-rewards.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/features/feedback src/pages/feedback-page.tsx
git commit -m "feat: add feynman feedback rewards"
```

### Task 7: Add Import Export UI, Seeded Demo Data, And Smoke Tests

**Files:**
- Create: `src/features/settings/import-export-panel.tsx`
- Create: `src/app/app-smoke.test.tsx`
- Modify: `src/pages/dashboard-page.tsx`
- Modify: `src/domain/seed-data.ts`
- Modify: `README.md`

**Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { DashboardPage } from "../pages/dashboard-page";

test("dashboard shows import export controls", () => {
  render(<DashboardPage />);

  expect(screen.getByRole("button", { name: "导出存档" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "导入存档" })).toBeInTheDocument();
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- src/app/app-smoke.test.tsx`
Expected: FAIL because import/export controls are missing.

**Step 3: Write minimal implementation**

```tsx
// src/features/settings/import-export-panel.tsx
export function ImportExportPanel(props: {
  onExport: () => void;
  onImport: (file: File) => void;
}) {
  return (
    <section>
      <button type="button" onClick={props.onExport}>
        导出存档
      </button>
      <label>
        导入存档
        <input
          type="file"
          accept="application/json"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              props.onImport(file);
            }
          }}
        />
      </label>
    </section>
  );
}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- src/app/app-smoke.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add src/features/settings src/pages/dashboard-page.tsx src/domain/seed-data.ts README.md
git commit -m "feat: add save import export controls and demo seeds"
```

### Task 8: Final Verification And Manual QA

**Files:**
- Modify: `README.md`
- Modify: `docs/plans/2026-04-01-work-partner-mvp-implementation.md`

**Step 1: Run the full automated test suite**

Run: `npm test`
Expected: PASS with all unit and smoke tests green.

**Step 2: Run the development app**

Run: `npm run dev`
Expected: Local Vite URL appears, app loads in browser.

**Step 3: Execute manual QA checklist**

1. Create a goal and confirm knowledge tasks appear.
2. Create a temporary task and complete it.
3. Confirm pet experience increases after task completion.
4. Confirm a wish event appears only when unfinished tasks are greater than 3.
5. Complete the bound wish task and confirm a pending appearance reward is created.
6. Trigger pet evolution and verify the reward can be fused or kept for later.
7. Save a feedback record and confirm a special reward appears.
8. Export the save, clear the browser data, import the save, and confirm state restoration.

**Step 4: Update docs with the verified startup commands**

```md
- `npm install`
- `npm run dev`
- `npm test`
```

**Step 5: Commit**

```bash
git add README.md docs/plans/2026-04-01-work-partner-mvp-implementation.md
git commit -m "docs: finalize mvp implementation and verification notes"
```
