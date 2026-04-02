import { fireEvent, render, screen } from "@testing-library/react";
import { GoalsPage } from "./goals-page";

test("shows Chinese sample goals and creates a goal", async () => {
  render(<GoalsPage />);

  expect(screen.getByText("掌握 React 基础")).toBeInTheDocument();
  expect(screen.getByText("复习 Hooks、JSX 与状态管理。")).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText("目标名称"), {
    target: { value: "React Basics" },
  });
  fireEvent.change(screen.getByLabelText("目标描述"), {
    target: { value: "Learn components and props." },
  });
  fireEvent.change(screen.getByLabelText("周期天数"), {
    target: { value: "5" },
  });
  fireEvent.click(screen.getByRole("button", { name: "创建目标" }));

  expect(screen.getByText("React Basics")).toBeInTheDocument();
  expect(screen.getAllByText("Learn components and props.").length).toBeGreaterThan(1);
  expect(screen.getAllByRole("article").length).toBeGreaterThan(1);
});
