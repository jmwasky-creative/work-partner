export function WishEventPanel(props: {
  unfinishedTaskCount: number;
  message: string;
  onCompleteTask: () => void;
  onTriggerWish: () => void;
}) {
  return (
    <section className="panel stack">
      <h3>愿望事件</h3>
      <p>未完成任务：{props.unfinishedTaskCount}</p>
      <div className="row">
        <button type="button" onClick={props.onCompleteTask} disabled={props.unfinishedTaskCount === 0}>
          标记任务完成
        </button>
        <button type="button" onClick={props.onTriggerWish}>
          试试看许愿
        </button>
      </div>
      <p>{props.message}</p>
    </section>
  );
}
