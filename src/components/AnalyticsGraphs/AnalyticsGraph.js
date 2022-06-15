import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
} from "victory";
import "./AnalyticsGraph.css";

const AnalyticsGraph = (props) => {
  return (
    <div className="analytics-graph">
      <h2>{props.title}</h2>
      <VictoryChart
        domainPadding={20}
        theme={VictoryTheme.material}
        style={{ parent: { maxWidth: "200%", width: "150%" } }}
      >
        <VictoryAxis
          tickValues={[1, 2, 3, 4, 5, 6]}
          tickFormat={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
        />
        <VictoryAxis dependentAxis tickFormat={(x) => `${x}%`} />
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
  );
};

export default AnalyticsGraph;
