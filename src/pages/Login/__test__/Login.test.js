import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LoginPage from "../LoginPage";
import { BrowserRouter } from "react-router-dom";
import { UserAuthContextProvider } from "../../../context/UserAuthContext";

//need this as there are many errors without this, idk why
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

test("renders Login", () => {
  const component = render(
    <BrowserRouter>
      <UserAuthContextProvider>
        <LoginPage />
      </UserAuthContextProvider>
    </BrowserRouter>
  );
  const subheaderEl = component.getByTestId("subheader");
  expect(subheaderEl.textContent).toBe("LOGIN");
});

test("email input form is present", () => {
  const component = render(
    <BrowserRouter>
      <UserAuthContextProvider>
        <LoginPage />
      </UserAuthContextProvider>
    </BrowserRouter>
  );
  const formEl = component.getByTestId("email");
  expect(formEl.textContent).toBe("Email");
});

test("password input form is present", () => {
  const component = render(
    <BrowserRouter>
      <UserAuthContextProvider>
        <LoginPage />
      </UserAuthContextProvider>
    </BrowserRouter>
  );
  const formEl = component.getByTestId("password");
  expect(formEl.textContent).toBe("Password");
});

test("Forgot password field is present", () => {
  const component = render(
    <BrowserRouter>
      <UserAuthContextProvider>
        <LoginPage />
      </UserAuthContextProvider>
    </BrowserRouter>
  );
  const textEl = component.getByTestId("forgot-password");
  expect(textEl.textContent).toBe("Forgot Password?");
});
