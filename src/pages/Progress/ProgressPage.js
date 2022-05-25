import StrikerLayout from "../StrikerLayout/StrikerLayout";
import { Card, Col, Row, Progress } from "antd";
import "./ProgressPage.css";
import ProgressGraph from "../../components/ProgressGraphs/ProgressGraph";

const productivityData = [
  { month: 1, productivity: 60 },
  { month: 2, productivity: 83 },
  { month: 3, productivity: 3 },
  { month: 4, productivity: 45 },
  { month: 5, productivity: 100 },
  { month: 6, productivity: 32 },
];

const productivityLabelArr = productivityData.map(
  (obj) => obj.productivity.toString() + "%"
);

const CompletionData = [
  { month: 1, productivity: 34 },
  { month: 2, productivity: 50 },
  { month: 3, productivity: 97 },
  { month: 4, productivity: 88 },
  { month: 5, productivity: 67 },
  { month: 6, productivity: 49 },
];

const CompletionLabelArr = CompletionData.map(
  (obj) => obj.productivity.toString() + "%"
);

const ProgressPage = () => {
  return (
    <StrikerLayout>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Productivity/ Effort Rate" className="progress-card">
              <Progress type="circle" percent={89} strokeColor={"#a0d911"} />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Completion Rate" className="progress-card">
              <Progress type="circle" percent={77} />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Productive Days Per Year" className="progress-card">
              <Progress
                type="dashboard"
                format={() => "37 Days"}
                percent={20}
                strokeColor="orange"
              />
            </Card>
          </Col>
        </Row>
      </div>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Total Tasks Completed" className="progress-card">
              109 Tasks
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Total Reminders" className="progress-card">
              77 Reminders
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Total Events" className="progress-card">
              42 Events
            </Card>
          </Col>
        </Row>
      </div>
      <div className="graph-div">
        <ProgressGraph
          title="Graph of Productivity Per Month"
          data={productivityData}
          labelArr={productivityLabelArr}
        />
        <ProgressGraph
          title="Graph of Completion Per Month"
          data={CompletionData}
          labelArr={CompletionLabelArr}
        />
      </div>
    </StrikerLayout>
  );
};

export default ProgressPage;
