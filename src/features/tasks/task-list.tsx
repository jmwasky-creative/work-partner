import type { Task } from "../../domain/models";
import { TaskItem } from "./task-item";

export function TaskList(props: {
  title: string;
  tasks: Task[];
  onComplete: (task: Task) => void;
}) {
  return (
    <section className="stack">
      <h3>{props.title}</h3>
      <ul className="stack">
        {props.tasks.map((task) => (
          <TaskItem key={task.id} task={task} onComplete={props.onComplete} />
        ))}
      </ul>
    </section>
  );
}
