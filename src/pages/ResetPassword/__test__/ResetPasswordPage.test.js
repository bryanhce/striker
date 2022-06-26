import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ResetPasswordPage from "../ResetPasswordPage";
import { BrowserRouter } from "react-router-dom";
import { UserAuthContextProvider } from "../../../context/UserAuthContext";

window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // deprecated
  removeListener: jest.fn(), // deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

test("renders Password Reset", () => {
  const component = render(
    <BrowserRouter>
      <UserAuthContextProvider>
        <ResetPasswordPage />
      </UserAuthContextProvider>
    </BrowserRouter>
  );
  const subheaderEl = component.getByTestId("subheader");
  expect(subheaderEl.textContent).toBe("PASSWORD RESET");
});

test("email input form is present", () => {
  const component = render(
    <BrowserRouter>
      <UserAuthContextProvider>
        <ResetPasswordPage />
      </UserAuthContextProvider>
    </BrowserRouter>
  );
  const formEl = component.getByTestId("email");
  expect(formEl.textContent).toBe("Email");
});
