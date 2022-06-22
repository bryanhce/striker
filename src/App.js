import "./App.css";
import { Route, Routes } from "react-router-dom";
import TaskList from "./pages/TaskList/TaskList";
import DailyTasklist from "./pages/DailyTasklist/DailyTasklist";
import MonthlyTasklist from "./pages/MonthlyTasklist/MonthlyTasklist";
import CalendarPage from "./pages/Calendar/CalendarPage";
import AnalyticsPage from "./pages/Analytics/AnalyticsPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import LoginPage from "./pages/Login/LoginPage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import ResetPasswordPage from "./pages/ResetPassword/ResetPasswordPage";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import ProtectedRoute from "./components/AssistantFeatures/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <UserAuthContextProvider>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route
          path="/daily-task-list"
          element={
            <ProtectedRoute>
              <DailyTasklist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/monthly-task-list"
          element={
            <ProtectedRoute>
              <MonthlyTasklist />
            </ProtectedRoute>
          }
        />        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <CalendarPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <AnalyticsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </UserAuthContextProvider>
  );
}

export default App;
