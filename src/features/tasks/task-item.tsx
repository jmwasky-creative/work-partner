import type { Task } from "../../domain/models";

export function TaskItem(props: {
  task: Task;
  onComplete: (task: Task) => void;
}) {
  return (
    <li className="panel">
      <div className="row">
        <div className="stack tight">
          <strong>{props.task.title}</strong>
          <p>{props.task.description}</p>
        </div>
        <div className="stack tight">
          <span>{props.task.status === "done" ? "已完成" : "待办"}</span>
          <button
            type="button"
            onClick={() => props.onComplete(props.task)}
            disabled={props.task.status === "done"}
          >
            完成任务
          </button>
        </div>
      </div>
    </li>
  );
}
