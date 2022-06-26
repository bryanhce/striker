import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SignUpPage from "../SignUpPage";
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

test("renders Sign Up", () => {
  const component = render(
    <BrowserRouter>
      <UserAuthContextProvider>
        <SignUpPage />
      </UserAuthContextProvider>
    </BrowserRouter>
  );
  const subheaderEl = component.getByTestId("subheader");
  expect(subheaderEl.textContent).toBe("SIGN UP");
});

test("email input form is present", () => {
  const component = render(
    <BrowserRouter>
      <UserAuthContextProvider>
        <SignUpPage />
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
        <SignUpPage />
      </UserAuthContextProvider>
    </BrowserRouter>
  );
  const formEl = component.getByTestId("password");
  expect(formEl.textContent).toBe("Password");
});
