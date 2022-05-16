import "./App.css";
import { Route, Routes } from "react-router-dom";
import TaskList from "./pages/TaskList/TaskList";
import CalendarPage from "./pages/Calendar/CalendarPage";
import ProgressPage from "./pages/Progress/ProgressPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import LoginPage from "./pages/Login/LoginPage";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<TaskList />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/progress" element={<ProgressPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
