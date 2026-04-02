import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TasksPage } from "./tasks-page";

test("shows Chinese sample tasks and completes a task", async () => {
  const user = userEvent.setup();

  render(<TasksPage />);

  expect(screen.getByText("复习 React Hooks")).toBeInTheDocument();
  expect(screen.getByText("整理 useState 和 useEffect 的核心用法。")).toBeInTheDocument();

  await user.click(screen.getAllByRole("button", { name: "完成任务" })[0]);

  expect(screen.getByText("已完成")).toBeInTheDocument();
  expect(screen.getAllByRole("button", { name: "完成任务" })[0]).toBeDisabled();
});
