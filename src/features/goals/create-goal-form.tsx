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
        <span>目标名称</span>
        <input
          aria-label="目标名称"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <label>
        <span>目标描述</span>
        <textarea
          aria-label="目标描述"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>
      <label>
        <span>周期天数</span>
        <input
          aria-label="周期天数"
          type="number"
          min={1}
          value={durationDays}
          onChange={(event) => setDurationDays(Number(event.target.value))}
        />
      </label>
      <button type="submit">创建目标</button>
    </form>
  );
}
