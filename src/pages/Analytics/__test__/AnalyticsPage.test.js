import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AnalyticsPage from "../AnalyticsPage";
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

test("renders productivity/effort rate", () => {
  const component = render(
    <BrowserRouter>
      <UserAuthContextProvider>
        <AnalyticsPage />
      </UserAuthContextProvider>
    </BrowserRouter>
  );
  const cardEl = component.getByTestId("productivity-rate");
  expect(cardEl).toBeInTheDocument();
});

test("renders completion rate", () => {
  const component = render(
    <BrowserRouter>
      <UserAuthContextProvider>
        <AnalyticsPage />
      </UserAuthContextProvider>
    </BrowserRouter>
  );
  const cardEl = component.getByTestId("completion-rate");
  expect(cardEl).toBeInTheDocument();
});

test("renders productive days per year", () => {
  const component = render(
    <BrowserRouter>
      <UserAuthContextProvider>
        <AnalyticsPage />
      </UserAuthContextProvider>
    </BrowserRouter>
  );
  const cardEl = component.getByTestId("productive-days");
  expect(cardEl).toBeInTheDocument();
});

test("renders total tasks completed", () => {
  const component = render(
    <BrowserRouter>
      <UserAuthContextProvider>
        <AnalyticsPage />
      </UserAuthContextProvider>
    </BrowserRouter>
  );
  const cardEl = component.getByTestId("tasks-completed");
  expect(cardEl).toBeInTheDocument();
});

test("renders total reminders", () => {
  const component = render(
    <BrowserRouter>
      <UserAuthContextProvider>
        <AnalyticsPage />
      </UserAuthContextProvider>
    </BrowserRouter>
  );
  const cardEl = component.getByTestId("total-reminders");
  expect(cardEl).toBeInTheDocument();
});

test("renders total events", () => {
  const component = render(
    <BrowserRouter>
      <UserAuthContextProvider>
        <AnalyticsPage />
      </UserAuthContextProvider>
    </BrowserRouter>
  );
  const cardEl = component.getByTestId("total-events");
  expect(cardEl).toBeInTheDocument();
});
