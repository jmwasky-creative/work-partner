import { render, screen } from "@testing-library/react";
import { DashboardPage } from "../pages/dashboard-page";

test("dashboard shows import export controls", () => {
  render(<DashboardPage />);

  expect(screen.getByRole("button", { name: "导出存档" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "导入存档" })).toBeInTheDocument();
});
