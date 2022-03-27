import ChartPreview from "../chart-preview/ChartPreview";
import SidePanel from "../side-panel/SidePanel";
import "./chart-builder.css";

const ChartBuilder = (): JSX.Element => {
  return (
    <div id="chart-builder">
      <SidePanel />
      <ChartPreview />
    </div>
  );
};

export default ChartBuilder;
