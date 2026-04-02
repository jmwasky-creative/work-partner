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
      setMessage(`愿望已绑定到任务 ${wish.boundTaskId}，奖励外观为 ${wish.appearanceItemId}。`);
      return;
    }

    setMessage("继续完成任务后再尝试许愿。");
  };

  const markTaskComplete = () => {
    setTasks((current) => (current.length > 0 ? current.slice(0, -1) : current));
  };

  const tasksRemaining = useMemo(() => tasks.length, [tasks]);

  const handleKeepLater = () => setMessage("已保留到下一次进化");

  return (
    <section className="stack">
      <h2>宠物养成</h2>
      <p>在这里管理宠物外观、许愿结果，以及是否保留奖励到下一次进化。</p>
      <PetSummaryCard pet={pet} />
      <div className="wish-panel">
        <p>未完成任务：{tasksRemaining}</p>
        <button type="button" onClick={markTaskComplete} disabled={tasksRemaining === 0}>
          标记任务完成
        </button>
        <button type="button" onClick={handleWishAttempt}>
          试试看许愿
        </button>
        <button type="button" onClick={handleKeepLater}>
          保留到下次进化
        </button>
        <p>{message}</p>
      </div>
    </section>
  );
}
