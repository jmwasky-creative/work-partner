import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PetPage } from "./pet-page";

test("lets the user keep a wish reward for a later evolution", async () => {
  const user = userEvent.setup();

  render(<PetPage />);

  await user.click(screen.getByRole("button", { name: "Keep For Later" }));

  expect(screen.getByText("Saved for a future evolution")).toBeInTheDocument();
});
