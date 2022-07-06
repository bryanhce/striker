import React from "react";
import { Tabs } from "antd";
import HomeGuide from "../../components/UserGuide/HomeGuide/HomeGuide";
import MonthlyGuide from "../../components/UserGuide/MonthlyGuide/MonthlyGuide";
import CalendarGuide from "../../components/UserGuide/CalendarGuide/CalendarGuide";
import AnalyticsGuide from "../../components/UserGuide/AnalyticsGuide/AnalyticsGuide";
import Philosophy from "../../components/UserGuide/Philosophy/Philosophy";

const { TabPane } = Tabs;

const UserGuidePage = () => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Philosophy" key="1">
        <Philosophy />
      </TabPane>
      <TabPane tab="Home" key="2">
        <HomeGuide />
      </TabPane>
      <TabPane tab="Monthly" key="3">
        <MonthlyGuide />
      </TabPane>
      <TabPane tab="Calendar" key="4">
        <CalendarGuide />
      </TabPane>
      <TabPane tab="Analytics" key="5">
        <AnalyticsGuide />
      </TabPane>
    </Tabs>
  );
};

export default UserGuidePage;
