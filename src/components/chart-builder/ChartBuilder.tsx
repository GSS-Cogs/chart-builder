import ChartPanel from "../chart-panel/ChartPanel";
import SidePanel from "../side-panel/SidePanel";
import "./chart-builder.css";

const ChartBuilder = (): JSX.Element => {
  return (
    <div id="chart-builder">
      <SidePanel />
      <ChartPanel />
    </div>
  );
};

export default ChartBuilder;
