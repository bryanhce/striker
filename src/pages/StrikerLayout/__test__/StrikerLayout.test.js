import StrikerLayout from "../StrikerLayout";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UserAuthContextProvider } from "../../../context/UserAuthContext";
import { BrowserRouter } from "react-router-dom";

test("foot is present", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <UserAuthContextProvider>
        <StrikerLayout />
      </UserAuthContextProvider>
    </BrowserRouter>
  );
  const footerEl = getByTestId("footer");
  expect(footerEl.textContent).toBe(
    "Striker ©2022 Created by Head in the Clouds"
  );
});

test("slider has the correct menu items", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <UserAuthContextProvider>
        <StrikerLayout />
      </UserAuthContextProvider>
    </BrowserRouter>
  );
  const sliderEl = getByTestId("slider");
  const menuItems = sliderEl.textContent.substring(30);
  expect(menuItems).toBe("HomeMonthlyCalendarAnalyticsSign Out");
});
