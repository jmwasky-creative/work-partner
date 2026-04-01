import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";
import { App } from "./App";

test("renders primary navigation", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  expect(screen.getByRole("link", { name: "成长看板" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "任务" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "目标" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "宠物" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "反馈" })).toBeInTheDocument();
});
