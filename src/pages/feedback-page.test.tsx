import { fireEvent, render, screen } from "@testing-library/react";
import { FeedbackPage } from "./feedback-page";

test("submits a feedback record and shows the earned reward", async () => {
  render(<FeedbackPage />);

  fireEvent.change(screen.getByLabelText("Knowledge Node"), {
    target: { value: "closures" },
  });
  fireEvent.change(screen.getByLabelText("Video Title"), {
    target: { value: "Explaining closures" },
  });
  fireEvent.change(screen.getByLabelText("Summary"), {
    target: { value: "Nested functions keep access to outer scope." },
  });
  fireEvent.click(screen.getByRole("button", { name: "Save Feedback" }));

  expect(screen.getByText("Explaining closures")).toBeInTheDocument();
  expect(screen.getByText(/Earned:/)).toBeInTheDocument();
});
