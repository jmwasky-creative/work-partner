import { render, screen } from "@testing-library/react";
import { DashboardPage } from "./dashboard-page";

test("shows a wish summary and pet evolution progress", () => {
  render(<DashboardPage />);

  expect(screen.getByText("当前宠物成长")).toBeInTheDocument();
  expect(screen.getByText("愿望事件")).toBeInTheDocument();
});
