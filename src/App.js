import "./App.css";
import { Route, Routes } from "react-router-dom";
import DailyTasklist from "./pages/DailyTasklist/DailyTasklist";
import MonthlyTasklist from "./pages/MonthlyTasklist/MonthlyTasklist";
import CalendarPage from "./pages/Calendar/CalendarPage";
import AnalyticsPage from "./pages/Analytics/AnalyticsPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import LoginPage from "./pages/Login/LoginPage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import ResetPasswordPage from "./pages/ResetPassword/ResetPasswordPage";
import UserGuidePage from "./pages/UserGuide/UserGuidePage";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import StrikerLayout from "./pages/StrikerLayout/StrikerLayout";
import { PomodoroContextProvider } from "./context/PomodoroContext";
import { ColourBlindContextProvider } from "./context/ColourBlindContext";
import { useState } from "react";
import { setDate } from "date-fns";

function App() {

  return (
    <UserAuthContextProvider>
      <PomodoroContextProvider>
        <ColourBlindContextProvider>
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <StrikerLayout />
                </ProtectedRoute>
              }
            >
              {/* nested routes */}
              <Route
                exact
                path="daily-task-list/:date"
                element={
                  <ProtectedRoute>
                    <DailyTasklist />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="monthly-task-list"
                element={
                  <ProtectedRoute>
                    <MonthlyTasklist />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="calendar"
                element={
                  <ProtectedRoute>
                    <CalendarPage />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="analytics"
                element={
                  <ProtectedRoute>
                    <AnalyticsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="user-guide"
                element={
                  <ProtectedRoute>
                    <UserGuidePage />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="settings"
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="*" element={<LoginPage />} /> {/* page not found */}
          </Routes>
        </ColourBlindContextProvider>
      </PomodoroContextProvider>
    </UserAuthContextProvider>
  );
}

export default App;
