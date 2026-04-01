import { render, screen } from "@testing-library/react";
import { DashboardPage } from "./dashboard-page";

test("shows a wish summary and pet evolution progress", () => {
  render(<DashboardPage />);

  expect(screen.getByText("Current Pet Growth")).toBeInTheDocument();
  expect(screen.getByText("Wish Event")).toBeInTheDocument();
});
