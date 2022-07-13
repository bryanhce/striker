import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  DesktopOutlined,
  BarChartOutlined,
  CalendarOutlined,
  HomeOutlined,
  RightOutlined,
  RightCircleOutlined,
  UserOutlined,
  SettingOutlined,
  BookOutlined,
} from "@ant-design/icons";

import { useUserAuth } from "../../context/UserAuthContext";
import { format, addDays } from "date-fns";

const StrikerMenu = ({ setDateSelected }) => {
  //logic for logout
  const { logOut } = useUserAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  //logic for date
  const today = new Date();
  const yesterday = addDays(today, -1);
  const tomorrow = addDays(today, 1);
  const todayString = format(today, "yyyy-MM-dd");
  const yesterdayString = format(yesterday, "yyyy-MM-dd");
  const tomorrowString = format(tomorrow, "yyyy-MM-dd");
  const todayDisplay = format(today, "dd.MM.yyyy");
  const yesterdayDisplay = format(yesterday, "dd.MM.yyyy");
  const tomorrowDisplay = format(tomorrow, "dd.MM.yyyy");

  //function to default select key based on url
  const highlightDefaultKey = () => {
    var path = window.location.pathname;
    switch (path) {
      case "/daily-task-list":
        return "4";
      case "/monthly-task-list":
        return "5";
      case "/calendar":
        return "6";
      case "/analytics":
        return "7";
      case "/user-guide":
        return "8";
      case "/settings":
        return "9";
      default:
        return "4";
    }
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={highlightDefaultKey()}
    >
      <Menu.Item key="1">
        <RightOutlined />
        <span>{tomorrowDisplay}</span>
        <Link to={"/daily-task-list/" + tomorrowString} />
      </Menu.Item>
      <Menu.Item key="2">
        <RightCircleOutlined />
        <span>{todayDisplay}</span>
        <Link to={"/daily-task-list/" + todayString} />
      </Menu.Item>
      <Menu.Item key="3">
        <RightOutlined />
        <span>{yesterdayDisplay}</span>
        <Link to={"/daily-task-list/" + yesterdayString} />
      </Menu.Item>
      <Menu.Item key="4">
        <HomeOutlined />
        <span>Home</span>
        <Link to={"/daily-task-list/" + todayString} />
      </Menu.Item>
      <Menu.Item key="5">
        <DesktopOutlined />
        <span>Monthly</span>
        <Link to="/monthly-task-list" />
      </Menu.Item>
      <Menu.Item key="6">
        <CalendarOutlined />
        <span>Calendar</span>
        <Link to="/calendar" />
      </Menu.Item>
      <Menu.Item key="7">
        <BarChartOutlined />
        <span>Analytics</span>
        <Link to="/analytics" />
      </Menu.Item>
      <Menu.Item key="8">
        <BookOutlined />
        <span>User Guide</span>
        <Link to="/user-guide" />
      </Menu.Item>
      <Menu.Item key="9">
        <SettingOutlined />
        <span>Settings</span>
        <Link to="/settings" />
      </Menu.Item>
      <Menu.Item key="10" onClickCapture={handleLogOut}>
        <UserOutlined />
        <span>Sign Out</span>
      </Menu.Item>
    </Menu>
  );
};

export default StrikerMenu;
