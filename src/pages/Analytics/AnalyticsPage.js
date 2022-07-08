import { Card, Col, Row, Progress, Spin } from "antd";
import "./AnalyticsPage.css";
import AnalyticsGraph from "../../components/AnalyticsGraphs/AnalyticsGraph";
import { Fragment, useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

const spinner = <LoadingOutlined style={{ fontSize: 24 }} spin />;

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

let userId = JSON.parse(localStorage.getItem("currentUser")).uid;

const AnalyticsPage = () => {
  const [allData, setAllData] = useState(null);

  const getAllAnalytics = async () => {
    await fetch(`https://striker-backend.herokuapp.com/analytics/all/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setAllData(data);
        console.log("analytics page " + allData.totalCompletedEffort);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllAnalytics();
  }, []);

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
              {allData === null ? (
                <Spin indicator={spinner} />
              ) : (
                <Progress
                  type="circle"
                  percent={Math.round(
                    (allData.totalCompletedEffort / allData.totalEffort) * 100
                  )}
                  strokeColor={"#a0d911"}
                />
              )}
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Average No. of Tasks Completed Per Day"
              className="progress-card"
              data-testid="productive-days"
            >
              {allData === null ? (
                <Spin indicator={spinner} />
              ) : (
                <div>
                  {allData.averageDailyTaskCompleted === null
                    ? 0
                    : allData.averageDailyTaskCompleted}{" "}
                  Tasks
                </div>
              )}
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Completion Rate"
              className="progress-card"
              data-testid="completion-rate"
            >
              {allData === null ? (
                <Spin indicator={spinner} />
              ) : (
                <Progress
                  type="circle"
                  percent={Math.round(
                    (allData.totalCompletedEvents /
                      (allData.assignments + allData.events + allData.notes)) *
                      100
                  )}
                />
              )}
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
              {allData === null ? (
                <Spin indicator={spinner} />
              ) : (
                <div>
                  {allData.assignments === null ? 0 : allData.assignments} Tasks
                </div>
              )}
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Total Notes"
              className="progress-card"
              data-testid="total-reminders"
            >
              {allData === null ? (
                <Spin indicator={spinner} />
              ) : (
                <div>{allData.notes === null ? 0 : allData.notes} Notes</div>
              )}
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Total Events"
              className="progress-card"
              data-testid="total-events"
            >
              {allData === null ? (
                <Spin indicator={spinner} />
              ) : (
                <div>{allData.events === null ? 0 : allData.events} Events</div>
              )}
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
