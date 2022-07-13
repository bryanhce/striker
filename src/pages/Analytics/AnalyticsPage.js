import { Card, Col, Row, Progress, Spin, Tooltip } from "antd";
import "./AnalyticsPage.css";
import AnalyticsGraph from "../../components/AnalyticsGraphs/AnalyticsGraph";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { auth } from "../../firebase";

const spinner = <LoadingOutlined style={{ fontSize: 24 }} spin />;

var productivityData = [
  { month: 1, productivity: 0 },
  { month: 2, productivity: 0 },
  { month: 3, productivity: 0 },
  { month: 4, productivity: 0 },
  { month: 5, productivity: 0 },
  { month: 6, productivity: 0 },
];

var completionData = [
  { month: 1, productivity: 0 },
  { month: 2, productivity: 0 },
  { month: 3, productivity: 0 },
  { month: 4, productivity: 0 },
  { month: 5, productivity: 0 },
  { month: 6, productivity: 0 },
];

function createLabelArr(data) {
  return data.map((obj) => obj.productivity.toString() + "%");
}

const createLastSixMonthsWithYear = (month, year, arr, count) => {
  if (count === 7) {
    return arr.reverse();
  }

  if (month === 0) {
    arr[count] = (year - 1).toString() + "-" + 12 + "-01";
    return createLastSixMonthsWithYear(11, year - 1, arr, count + 1);
  } else if (month < 10) {
    arr[count] = year.toString() + "-0" + month + "-01";
    return createLastSixMonthsWithYear(month - 1, year, arr, count + 1);
  } else {
    arr[count] = year.toString() + "-" + month + "-01";
    return createLastSixMonthsWithYear(month - 1, year, arr, count + 1);
  }
};

var dateNow = new Date();
//need to get additional month for the range query to work properly
var monthNow = dateNow.getMonth() + 2;
var yearNow = dateNow.getFullYear();
var dateArr = createLastSixMonthsWithYear(monthNow, yearNow, [], 0);

let user = auth.currentUser;
let userId = 0;
if (user !== null) {
  userId = JSON.parse(localStorage.getItem("currentUser")).uid;
}

const AnalyticsPage = () => {
  const [allData, setAllData] = useState(null);
  const [completionLabelArr, setCompletionLabelArr] = useState([]);
  const [productivityLabelArr, setProductivityLabelArr] = useState([]);

  const getAllAnalytics = async () => {
    await fetch(`https://striker-backend.herokuapp.com/analytics/all/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setAllData(data);
      })
      .catch((err) => console.log(err));
  };

  const getLastSixMonthsProductivity = async (start, end, count) => {
    await fetch(
      `https://striker-backend.herokuapp.com/analytics/${userId}?start-date=${start}&end-date=${end}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.totalEffort === 0) {
          productivityData[count]["productivity"] = 0;
        } else {
          productivityData[count]["productivity"] = Math.round(
            (data.totalCompletedEffort / data.totalEffort) * 100
          );
        }
        if (data.events + data.notes + data.assignments === 0) {
          completionData[count]["productivity"] = 0;
        } else {
          completionData[count]["productivity"] = Math.round(
            (data.totalCompletedEvents /
              (data.events + data.notes + data.assignments)) *
              100
          );
        }
        setCompletionLabelArr(createLabelArr(completionData));
        setProductivityLabelArr(createLabelArr(productivityData));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllAnalytics();
    //for loop to call the api 6 times
    for (let i = 0; i < 6; i++) {
      getLastSixMonthsProductivity(dateArr[i], dateArr[i + 1], i);
    }
  }, []);

  return (
    <div className="overall-analytics-layout">
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <Tooltip title="Total effort of completed task over total effort">
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
                    format={(p) => (p === 100 ? "100%" : p + "%")}
                    percent={Math.round(
                      (allData.totalCompletedEffort / allData.totalEffort) * 100
                    )}
                    strokeColor={"#a0d911"}
                  />
                )}
              </Card>
            </Tooltip>
          </Col>
          <Col span={8}>
            <Tooltip title="Average number of tasks striked in a day">
              <Card
                title="Avg No. of Tasks Completed Per Day"
                className="progress-card"
                data-testid="productive-days"
                style={{ height: "100%" }}
              >
                {allData === null ? (
                  <Spin indicator={spinner} />
                ) : (
                  <span
                    style={{
                      display: "flex",
                      textAlign: "center",
                      justifyContent: "center",
                      fontSize: "5vh",
                      paddingTop: "7%",
                    }}
                  >
                    {allData.averageDailyTaskCompleted === null
                      ? 0
                      : allData.averageDailyTaskCompleted}{" "}
                    Tasks
                  </span>
                )}
              </Card>
            </Tooltip>
          </Col>
          <Col span={8}>
            <Tooltip title="Total completed tasks over total tasks">
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
                    format={(p) => (p === 100 ? "100%" : p + "%")}
                    percent={Math.round(
                      (allData.totalCompletedEvents /
                        (allData.assignments +
                          allData.events +
                          allData.notes)) *
                        100
                    )}
                  />
                )}
              </Card>
            </Tooltip>
          </Col>
        </Row>
      </div>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <Tooltip title="Total number of assignments created">
              <Card
                title="Total Tasks Completed"
                className="progress-card"
                data-testid="tasks-completed"
              >
                {allData === null ? (
                  <Spin indicator={spinner} />
                ) : (
                  <div>
                    {allData.assignments === null ? 0 : allData.assignments}{" "}
                    Tasks
                  </div>
                )}
              </Card>
            </Tooltip>
          </Col>
          <Col span={8}>
            <Tooltip title="Total number of notes created">
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
            </Tooltip>
          </Col>
          <Col span={8}>
            <Tooltip title="Total number of events created">
              <Card
                title="Total Events"
                className="progress-card"
                data-testid="total-events"
              >
                {allData === null ? (
                  <Spin indicator={spinner} />
                ) : (
                  <div>
                    {allData.events === null ? 0 : allData.events} Events
                  </div>
                )}
              </Card>
            </Tooltip>
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
          data={completionData}
          labelArr={completionLabelArr}
        />
      </div>
    </div>
  );
};

export default AnalyticsPage;
