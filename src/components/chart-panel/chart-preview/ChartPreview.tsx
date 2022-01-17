import { useContext } from "react";
import { ChartContext } from "../../../context/ChartContext";
import Plot from "react-plotly.js";
import "./chart-preview.css";

const ChartPreview = (): JSX.Element => {
  const { chartDefinition }: any = useContext(ChartContext);

  if (Object.keys(chartDefinition).length === 0)
    return <div id="no-data">No data to show</div>;

  const { data, layout } = chartDefinition;

  return (
    <div id="chart-preview">
      <h1 id="preview-heading">Preview</h1>
      <h3 id="preview-fullscreen-link">View in full screen</h3>

      <Plot data={data} layout={layout} />
    </div>
  );
};
export default ChartPreview;
