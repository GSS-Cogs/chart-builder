import ChartPreview from "./chart-preview/ChartPreview";
import ChartProperties from "./chart-properties/ChartProperties";

const ChartPanel = (): JSX.Element => {
  return (
    <div id="chart-panel">
      <ChartPreview />
      <ChartProperties />
    </div>
  );
};
export default ChartPanel;
