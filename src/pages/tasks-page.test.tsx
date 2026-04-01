import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TasksPage } from "./tasks-page";

test("completes a task and shows awarded experience", async () => {
  const user = userEvent.setup();

  render(<TasksPage />);

  await user.click(screen.getAllByRole("button", { name: "Complete Task" })[0]);

  expect(screen.getByText("Done")).toBeInTheDocument();
  expect(screen.getAllByRole("button", { name: "Complete Task" })[0]).toBeDisabled();
});
