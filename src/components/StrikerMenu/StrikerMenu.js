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
} from "@ant-design/icons";

import "./StrikerMenu.css";
import { useUserAuth } from "../../context/UserAuthContext";
import { format, addDays } from "date-fns";

const StrikerMenu = () => {
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
  const todayDisplay = format(new Date(), "dd.MM.yyyy");
  const yesterdayDisplay = format(addDays(new Date(), -1), "dd.MM.yyyy");
  const tomorrowDisplay = format(addDays(new Date(), 1), "dd.MM.yyyy");

  const todayProp = format(new Date(), "yyyy-MM-dd");
  const yesterdayProp = format(addDays(new Date(), -1), "yyyy-MM-dd");
  const tomorrowProp = format(addDays(new Date(), 1), "yyyy-MM-dd");

  return (
    <Menu theme="dark" mode="inline">
      <Menu.Item key="1">
        <RightOutlined />
        <span>{tomorrowDisplay}</span>
        <Link to="/daily-task-list" state={tomorrowProp} />
      </Menu.Item>
      <Menu.Item key="2">
        <RightCircleOutlined />
        <span>{todayDisplay}</span>
        <Link to="/daily-task-list" state={todayProp} />
      </Menu.Item>
      <Menu.Item key="3">
        <RightOutlined />
        <span>{yesterdayDisplay}</span>
        <Link to="/daily-task-list" state={yesterdayProp} />
      </Menu.Item>
      <Menu.Item key="4">
        <HomeOutlined />
        <span>Home</span>
        <Link to="/daily-task-list" />
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
        <SettingOutlined />
        <span>Settings</span>
        <Link to="/settings" />
      </Menu.Item>
      <Menu.Item key="9" onClickCapture={handleLogOut}>
        <UserOutlined />
        <span>Sign Out</span>
      </Menu.Item>
    </Menu>
  );
};

export default StrikerMenu;
