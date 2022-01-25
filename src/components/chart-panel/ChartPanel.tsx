import ChartPreview from "./chart-preview/ChartPreview";
import ChartProperties from "./chart-properties/ChartProperties";
import "./chart-panel.css";

const ChartPanel = (): JSX.Element => {
  return (
    <div id="chart-panel">
      <ChartPreview />
      {/* <ChartProperties /> */}
    </div>
  );
};
export default ChartPanel;
