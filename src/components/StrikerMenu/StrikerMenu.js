import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  DesktopOutlined,
  BarChartOutlined,
  CalendarOutlined,
  HomeOutlined,
  RightOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";

import "./StrikerMenu.css";

const StrikerMenu = () => {
  return (
    <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
      <Menu.Item key="1">
        <RightOutlined />
        <span>25.08.22</span>
        <Link to="/" />
      </Menu.Item>
      <Menu.Item key="2">
        <RightCircleOutlined />
        <span>24.08.22</span>
        <Link to="/" />
      </Menu.Item>
      <Menu.Item key="3">
        <RightOutlined />
        <span>23.08.22</span>
        <Link to="/" />
      </Menu.Item>
      <Menu.Item key="4">
        <HomeOutlined />
        <span>Home</span>
        <Link to="/" />
      </Menu.Item>
      <Menu.Item key="5">
        <DesktopOutlined />
        <span>Monthly</span>
        <Link to="/" />
      </Menu.Item>
      <Menu.Item key="6">
        <CalendarOutlined />
        <span>Calendar</span>
        <Link to="/calendar" />
      </Menu.Item>
      <Menu.Item key="7">
        <BarChartOutlined />
        <span>Progress</span>
        <Link to="/progress" />
      </Menu.Item>
    </Menu>
  );
};

export default StrikerMenu;
