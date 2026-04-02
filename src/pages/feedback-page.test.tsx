import { fireEvent, render, screen } from "@testing-library/react";
import { FeedbackPage } from "./feedback-page";

test("submits a feedback record and shows the earned reward", async () => {
  render(<FeedbackPage />);

  fireEvent.change(screen.getByLabelText("知识节点"), {
    target: { value: "closures" },
  });
  fireEvent.change(screen.getByLabelText("视频标题"), {
    target: { value: "Explaining closures" },
  });
  fireEvent.change(screen.getByLabelText("总结"), {
    target: { value: "Nested functions keep access to outer scope." },
  });
  fireEvent.click(screen.getByRole("button", { name: "保存反馈" }));

  expect(screen.getByText("Explaining closures")).toBeInTheDocument();
  expect(screen.getByText(/已获得：/)).toBeInTheDocument();
});
