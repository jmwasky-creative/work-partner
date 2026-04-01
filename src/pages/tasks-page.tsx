import { useState } from "react";
import type { Task } from "../domain/models";
import { TaskList } from "../features/tasks/task-list";
import { completeTask } from "../features/tasks/task-actions";

const initialTasks: Task[] = [
  {
    id: "task-001",
    goalId: "goal-001",
    title: "Review React hooks",
    description: "Summarize useState/useEffect with short notes.",
    type: "knowledge",
    status: "todo",
    experience: 25,
    createdAt: new Date().toISOString(),
  },
  {
    id: "task-002",
    goalId: "goal-001",
    title: "Finish small quiz",
    description: "Complete the knowledge-check worksheet.",
    type: "temporary",
    status: "todo",
    experience: 15,
    createdAt: new Date().toISOString(),
  },
];

export function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);

  const handleComplete = (task: Task) => {
    const { task: updated } = completeTask(task);
    setTasks((previous) =>
      previous.map((entry) => (entry.id === task.id ? updated : entry)),
    );
  };

  return (
    <section className="stack">
      <h2>任务</h2>
      <TaskList title="Ongoing tasks" tasks={tasks} onComplete={handleComplete} />
    </section>
  );
}
