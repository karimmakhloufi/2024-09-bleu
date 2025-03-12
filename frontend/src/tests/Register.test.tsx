import "@testing-library/jest-dom";
import { expect, test, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterPage from "../pages/Register";

const registerMutationMock = vi.fn(({ onCompleted }) => {
  onCompleted();
});
const useNavigateMock = vi.fn();

vi.mock("../generated/graphql-types", () => ({
  useRegisterMutation: () => [registerMutationMock],
}));
vi.mock("react-router-dom", () => ({
  useNavigate: () => useNavigateMock,
}));

test("displays register page", async () => {
  render(<RegisterPage />);
  const emailInput = screen.getByPlaceholderText("email");
  const passwordInput = screen.getByPlaceholderText("password");
  const submitButton = screen.getByRole("button");
  fireEvent.change(emailInput, { target: { value: "email@gmail.com" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(useNavigateMock).toHaveBeenCalledWith("/confirm");
    expect(registerMutationMock).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { data: { email: "email@gmail.com", password: "password" } },
      })
    );
  });
});
