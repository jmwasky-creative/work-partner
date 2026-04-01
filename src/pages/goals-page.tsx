import { useState } from "react";
import { CreateGoalForm, type CreateGoalInput } from "../features/goals/create-goal-form";

type Goal = CreateGoalInput & {
  id: string;
  createdAt: string;
};

const initialGoals: Goal[] = [
  {
    id: "goal-001",
    title: "Master React basics",
    description: "Review hooks, JSX, and state management.",
    durationDays: 7,
    createdAt: new Date().toISOString(),
  },
];

export function GoalsPage() {
  const [goals, setGoals] = useState(initialGoals);

  const handleCreateGoal = (input: CreateGoalInput) => {
    const nextGoal: Goal = {
      id: `goal-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...input,
    };
    setGoals((previous) => [nextGoal, ...previous]);
  };

  return (
    <section className="stack">
      <h2>目标</h2>
      <CreateGoalForm onCreateGoal={handleCreateGoal} />
      <div className="stack">
        {goals.map((goal) => (
          <article key={goal.id} className="panel">
            <h3>{goal.title}</h3>
            <p>{goal.description || "No description yet."}</p>
            <small>
              {goal.durationDays} days · created {new Date(goal.createdAt).toLocaleDateString()}
            </small>
          </article>
        ))}
      </div>
    </section>
  );
}
