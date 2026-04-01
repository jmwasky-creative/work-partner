import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { CreateGoalForm } from "./create-goal-form";

describe("CreateGoalForm", () => {
  test("calls onCreateGoal with title and duration", async () => {
    const onCreateGoal = vi.fn();

    render(<CreateGoalForm onCreateGoal={onCreateGoal} />);

    fireEvent.change(screen.getByLabelText("Goal title"), {
      target: { value: "Practice React" },
    });
    fireEvent.change(screen.getByLabelText("Goal description"), {
      target: { value: "Work through exercises" },
    });
    const durationInput = screen.getByLabelText("Cycle days");
    fireEvent.change(durationInput, { target: { value: "7" } });
    fireEvent.click(screen.getByRole("button", { name: "Create Goal" }));

    expect(onCreateGoal).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Practice React",
        durationDays: 7,
      }),
    );
  });
});
