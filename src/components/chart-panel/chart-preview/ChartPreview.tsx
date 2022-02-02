import { useContext } from "react";
import ChartContext from "../../../context/ChartContext";
import Plot from "react-plotly.js";
import "./chart-preview.css";
import { PublishButton } from "../../publish-chart/PublishButton";
import NoDataIcon from "../../../assets/icons/chart-preview/NoDataIcon.svg";

const ChartPreview = (): JSX.Element => {
  const { chartDefinition }: any = useContext(ChartContext);

  if (Object.keys(chartDefinition).length === 0)
    return (
      <div id="no-data-container">
        <div id="no-data">
          <NoDataIcon />
        </div>
      </div>
    );

  const { data, layout, config, htmlProps } = chartDefinition;

  return (
    <div id="preview-wrapper">
      <div id="chart-preview-container">
        <div id="preview-heading-area">
          <h2 id="preview-heading">Preview</h2>
          <h3 id="preview-fullscreen-link">View in full screen</h3>
        </div>

        <div id="chart-preview">
          {htmlProps.showTitle && <h2>{htmlProps.chartTitle}</h2>}
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
