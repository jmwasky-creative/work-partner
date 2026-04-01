export function EvolutionChoicePanel(props: {
  pendingAppearanceCount: number;
  onKeepForLater: () => void;
  statusMessage: string;
}) {
  return (
    <section className="panel stack">
      <h3>Evolution Choice</h3>
      <p>Pending appearance rewards: {props.pendingAppearanceCount}</p>
      <button type="button" onClick={props.onKeepForLater}>
        Keep For Later
      </button>
      <p>{props.statusMessage}</p>
    </section>
  );
}
