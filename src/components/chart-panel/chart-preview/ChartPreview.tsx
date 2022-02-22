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
  const { chartDefinition, fullScreenMode, setFullScreenMode }: any =
    useContext(ChartContext);

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
    <div id="chart-preview-container">
      <div id="chart-preview">
        <Title />
        <Summary />
        <Plot data={data} layout={layout} config={config} />
        <Source />
        <Footnotes />
      </div>
      <div id="publish">
        <PublishButton />
      </div>
    </div>
  );
};
export default ChartPreview;
