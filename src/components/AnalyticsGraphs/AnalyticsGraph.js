import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
} from "victory";
import "./AnalyticsGraph.css";

const createLastSixMonths = (month, arr, count) => {
  if (count === 6) {
    return arr.reverse();
  }

  if (month === 0) {
    arr[count] = 12;
    return createLastSixMonths(11, arr, count + 1);
  } else {
    arr[count] = month;
    return createLastSixMonths(month - 1, arr, count + 1);
  }
};

const monthDict = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

const AnalyticsGraph = (props) => {
  var monthNow = new Date().getMonth() + 1;
  var lastSixMonthsArr = createLastSixMonths(monthNow, [], 0);
  var lastSixMonthsText = lastSixMonthsArr.map((x) => monthDict[x]);

  return (
    <div className="analytics-graph">
      <h2>{props.title}</h2>
      <div className="analytics-chart">
        <VictoryChart
          domainPadding={20}
          theme={VictoryTheme.material}
          style={{ parent: { maxWidth: "200%", width: "150%" } }}
        >
          <VictoryAxis
            tickValues={[1, 2, 3, 4, 5, 6]}
            tickFormat={lastSixMonthsText}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => `${x}%`}
            domain={[0, 100]}
          />
          <VictoryBar
            data={props.data}
            x="month"
            y="productivity"
            animate
            labelComponent={<VictoryLabel />}
            labels={props.labelArr}
            style={{ labels: { fill: "black", fontSize: "9" } }}
          />
        </VictoryChart>
      </div>
    </div>
  );
};

export default AnalyticsGraph;
