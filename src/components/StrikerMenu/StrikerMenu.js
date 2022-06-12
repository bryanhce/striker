import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  DesktopOutlined,
  BarChartOutlined,
  CalendarOutlined,
  HomeOutlined,
  RightOutlined,
  RightCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";

import "./StrikerMenu.css";
import { useUserAuth } from "../../context/UserAuthContext";
import { format, addDays } from "date-fns";

const StrikerMenu = () => {
  //logic for logout
  const { logOut } = useUserAuth();

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err.message);
    }
  };

  //logic for date
  const today = format(new Date(), "dd.MM.yyyy");
  const yesterday = format(addDays(new Date(), -1), "dd.MM.yyyy");
  const tomorrow = format(addDays(new Date(), 1), "dd.MM.yyyy");

  return (
    <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
      <Menu.Item key="1">
        <RightOutlined />
        <span>{tomorrow}</span>
        <Link to="/home" />
      </Menu.Item>
      <Menu.Item key="2">
        <RightCircleOutlined />
        <span>{today}</span>
        <Link to="/home" />
      </Menu.Item>
      <Menu.Item key="3">
        <RightOutlined />
        <span>{yesterday}</span>
        <Link to="/home" />
      </Menu.Item>
      <Menu.Item key="4">
        <HomeOutlined />
        <span>Home</span>
        <Link to="/home" />
      </Menu.Item>
      <Menu.Item key="5">
        <DesktopOutlined />
        <span>Monthly</span>
        <Link to="/home" />
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
      <Menu.Item key="8" onClickCapture={handleLogOut}>
        <UserOutlined />
        <span>Sign Out</span>
      </Menu.Item>
    </Menu>
  );
};

export default StrikerMenu;
