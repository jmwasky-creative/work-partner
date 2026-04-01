import { PetSummaryCard, usePetProgress } from "../features/pet/pet-state";

export function DashboardPage() {
  const { pet, addExperience } = usePetProgress();

  return (
    <section className="stack">
      <h2>Current Pet Growth</h2>
      <p>Track your pet stage, current experience, and the next evolution milestone.</p>
      <PetSummaryCard pet={pet} />
      <section className="panel stack">
        <h3>Wish Event</h3>
        <p>Need more than three unfinished tasks to trigger a random wish binding.</p>
        <button type="button" onClick={() => addExperience(35)}>
          Complete One Task (+35 XP)
        </button>
      </section>
    </section>
  );
}
