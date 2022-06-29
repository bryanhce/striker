import StrikerLayout from "../StrikerLayout/StrikerLayout";
import { Card, Col, Row, Progress } from "antd";
import "./AnalyticsPage.css";
import AnalyticsGraph from "../../components/AnalyticsGraphs/AnalyticsGraph";
import { Fragment } from "react";

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

const AnalyticsPage = () => {
  return (
    <Fragment>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <Card
              title="Productivity/ Effort Rate"
              className="progress-card"
              data-testid="productivity-rate"
            >
              <Progress type="circle" percent={89} strokeColor={"#a0d911"} />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Completion Rate"
              className="progress-card"
              data-testid="completion-rate"
            >
              <Progress type="circle" percent={77} />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Productive Days Per Year"
              className="progress-card"
              data-testid="productive-days"
            >
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
            <Card
              title="Total Tasks Completed"
              className="progress-card"
              data-testid="tasks-completed"
            >
              109 Tasks
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Total Reminders"
              className="progress-card"
              data-testid="total-reminders"
            >
              77 Reminders
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Total Events"
              className="progress-card"
              data-testid="total-events"
            >
              42 Events
            </Card>
          </Col>
        </Row>
      </div>
      <div className="graph-div">
        <AnalyticsGraph
          title="Graph of Productivity Per Month"
          data={productivityData}
          labelArr={productivityLabelArr}
        />
        <AnalyticsGraph
          title="Graph of Completion Per Month"
          data={CompletionData}
          labelArr={CompletionLabelArr}
        />
      </div>
    </Fragment>
  );
};

export default AnalyticsPage;
