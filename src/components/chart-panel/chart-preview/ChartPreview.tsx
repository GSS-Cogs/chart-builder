import { useContext } from "react";
import ChartContext from "../../../context/ChartContext";
import Plot from "react-plotly.js";
import "./chart-preview.css";
import { PublishButton } from "../../publish-chart/PublishButton";

const ChartPreview = (): JSX.Element => {
  const { chartDefinition }: any = useContext(ChartContext);

  if (Object.keys(chartDefinition).length === 0)
    return <div id="no-data">No data to show</div>;

  const { data, layout, config } = chartDefinition;

  return (
    <div id="preview-wrapper">
      <div id="chart-preview-container">
        <div id="preview-heading-area">
          <h2 id="preview-heading">Preview</h2>
          <h3 id="preview-fullscreen-link">View in full screen</h3>
        </div>

        <div id="chart-preview">
          <Plot data={data} layout={layout} config={config} />
        </div>
        <div id="publish">
          <PublishButton />
        </div>
      </div>
    </div>
  );
};
export default ChartPreview;
