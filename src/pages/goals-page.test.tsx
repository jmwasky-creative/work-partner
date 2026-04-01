import { fireEvent, render, screen } from "@testing-library/react";
import { GoalsPage } from "./goals-page";

test("creates a goal and shows generated knowledge tasks", async () => {
  render(<GoalsPage />);

  fireEvent.change(screen.getByLabelText("Goal title"), {
    target: { value: "React Basics" },
  });
  fireEvent.change(screen.getByLabelText("Goal description"), {
    target: { value: "Learn components and props." },
  });
  fireEvent.change(screen.getByLabelText("Cycle days"), {
    target: { value: "5" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Create Goal" }));

  expect(screen.getByText("React Basics")).toBeInTheDocument();
  expect(screen.getAllByText("Learn components and props.").length).toBeGreaterThan(1);
  expect(screen.getAllByRole("article").length).toBeGreaterThan(1);
});
