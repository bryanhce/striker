import { Tabs } from "antd";
import Pluggin from "../../components/Settings/Pluggin/Pluggin";
import Details from "../../components/Settings/Details/Details";
import View from "../../components/Settings/View/View";
import DataPolicy from "../../components/Settings/DataPolicy/DataPolicy";
const { TabPane } = Tabs;

const SettingsPage = () => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Additional Features" key="1">
        <Pluggin />
      </TabPane>
      <TabPane tab="User Details" key="2">
        <Details />
      </TabPane>
      <TabPane tab="View" key="3">
        <View />
      </TabPane>
      <TabPane tab="Data Policy" key="4">
        <DataPolicy />
      </TabPane>
    </Tabs>
  );
};

export default SettingsPage;
