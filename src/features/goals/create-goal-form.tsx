import { useState } from "react";

export interface CreateGoalInput {
  title: string;
  description: string;
  durationDays: number;
}

export function CreateGoalForm(props: {
  onCreateGoal: (input: CreateGoalInput) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [durationDays, setDurationDays] = useState(7);

  return (
    <form
      className="stack"
      onSubmit={(event) => {
        event.preventDefault();
        props.onCreateGoal({ title, description, durationDays });
      }}
    >
      <label>
        <span>Goal Title</span>
        <input
          aria-label="Goal title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <label>
        <span>Goal Description</span>
        <textarea
          aria-label="Goal description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>
      <label>
        <span>Duration Days</span>
        <input
          aria-label="Cycle days"
          type="number"
          min={1}
          value={durationDays}
          onChange={(event) => setDurationDays(Number(event.target.value))}
        />
      </label>
      <button type="submit">Create Goal</button>
    </form>
  );
}
