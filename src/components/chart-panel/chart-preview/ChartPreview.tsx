import React, { useContext } from "react";
import ChartContext from "../../../context/ChartContext";
import "./chart-preview.css";
import { PublishButton } from "../../publish-chart/PublishButton";
import NoDataIcon from "../../../assets/icons/chart-preview/NoDataIcon.svg";
import Title from "../../../chart-demo/Title";
import Summary from "../../../chart-demo/Summary";
import Footnotes from "../../../chart-demo/Footnotes";
import Source from "../../../chart-demo/Source";

const Plot =
  typeof window !== "undefined" ? require("react-plotly.js").default : null;

const ChartPreview = (): JSX.Element => {
  const { chartDefinition, fullScreenMode, setFullScreenMode }: any = useContext(ChartContext);

  return (
    <ActualChart
      chartDefinition={chartDefinition}
      fullScreenMode={fullScreenMode}
      setFullScreenMode={setFullScreenMode}
    />
  );
}

export const ActualChart = ({ chartDefinition, fullScreenMode, setFullScreenMode }): JSX.Element => {
  if (Object.keys(chartDefinition).length === 0)
    return (
      <div id="no-data-container">
        <div id="no-data">
          <NoDataIcon />
        </div>
      </div>
    );

  const { data, layout, config } = chartDefinition;

  return (
    <div id="preview-wrapper">
      <div id="chart-preview-container">
        <div id="preview-heading-area">
          <h2 id="preview-heading">Preview</h2>
          <h3
            className="link"
            onClick={() => setFullScreenMode(!fullScreenMode)}
          >
            {fullScreenMode ? "Exit full screen" : "View in full screen"}
          </h3>
        </div>

        <div id="chart-preview">
          <Title />
          <Summary />
          {Plot ? <Plot data={data} layout={layout} config={config} /> : null}
          <Source />
          <Footnotes />
        </div>
        <div id="publish">
          <PublishButton />
        </div>
      </div>
    </div>
  );
};
export default ChartPreview;
