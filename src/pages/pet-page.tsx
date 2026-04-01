import { useMemo, useState } from "react";
import { maybeCreateWishEvent } from "../features/pet/pet-engine";
import { PetSummaryCard, usePetProgress } from "../features/pet/pet-state";

const INITIAL_TASKS = ["task-1", "task-2", "task-3", "task-4", "task-5", "task-6"];

export function PetPage() {
  const { pet, bindWish } = usePetProgress();
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [message, setMessage] = useState("完成任务才能触发愿望。");

  const handleWishAttempt = () => {
    const wish = maybeCreateWishEvent({
      cycleId: "cycle-1",
      unfinishedTaskIds: tasks,
      appearanceItemId: "appearance-halo",
    });
    if (wish) {
      bindWish(wish);
      setMessage(`Wish bound to ${wish.boundTaskId} for ${wish.appearanceItemId}.`);
    } else {
      setMessage("继续完成任务后再尝试许愿。");
    }
  };

  const markTaskComplete = () => {
    setTasks((current) => (current.length > 0 ? current.slice(0, -1) : current));
  };

  const tasksRemaining = useMemo(() => tasks.length, [tasks]);

  const handleKeepLater = () => setMessage("Saved for a future evolution");

  return (
    <section className="stack">
      <h2>Pet Customization</h2>
      <p>选择外观、许愿和决定是否保留奖励。</p>
      <PetSummaryCard pet={pet} />
      <div className="wish-panel">
        <p>未完成任务：{tasksRemaining}</p>
        <button onClick={markTaskComplete} disabled={tasksRemaining === 0}>
          标记任务完成
        </button>
        <button onClick={handleWishAttempt}>试试看许愿</button>
        <button onClick={handleKeepLater}>Keep For Later</button>
        <p>{message}</p>
      </div>
    </section>
  );
}
