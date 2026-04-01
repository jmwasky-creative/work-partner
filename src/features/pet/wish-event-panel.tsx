export function WishEventPanel(props: {
  unfinishedTaskCount: number;
  message: string;
  onCompleteTask: () => void;
  onTriggerWish: () => void;
}) {
  return (
    <section className="panel stack">
      <h3>Wish Event</h3>
      <p>Unfinished tasks: {props.unfinishedTaskCount}</p>
      <div className="row">
        <button type="button" onClick={props.onCompleteTask} disabled={props.unfinishedTaskCount === 0}>
          Mark Task Complete
        </button>
        <button type="button" onClick={props.onTriggerWish}>
          Try A Wish
        </button>
      </div>
      <p>{props.message}</p>
    </section>
  );
}
