import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PetPage } from "./pet-page";

test("lets the user keep a wish reward for a later evolution", async () => {
  const user = userEvent.setup();

  render(<PetPage />);

  await user.click(screen.getByRole("button", { name: "保留到下次进化" }));

  expect(screen.getByText("已保留到下一次进化")).toBeInTheDocument();
});
