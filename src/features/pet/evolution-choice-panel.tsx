export function EvolutionChoicePanel(props: {
  pendingAppearanceCount: number;
  onKeepForLater: () => void;
  statusMessage: string;
}) {
  return (
    <section className="panel stack">
      <h3>进化选择</h3>
      <p>待领取外观奖励：{props.pendingAppearanceCount}</p>
      <button type="button" onClick={props.onKeepForLater}>
        保留到下次进化
      </button>
      <p>{props.statusMessage}</p>
    </section>
  );
}
