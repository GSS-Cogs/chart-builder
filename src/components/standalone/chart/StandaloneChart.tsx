import { ReactChildren, ReactChild } from "react";
import PublishButton from "../PublishButton";
import "./standalone-chart.css";
import { useContext } from "react";
import ChartContext from "../../../context/ChartContext";
import StandaloneContext from "../../../context/StandaloneContext";
import CSVUploader from "../csv-uploader/CSVUploader";
import SparqlInput from "../sparql-input/SparqlInput";

interface Props {
  children: ReactChild | ReactChildren;
}

const ChartPreviewStandalone = ({ children }: Props) => {
  const { chartDefinition, setChartDefinition, chartProperties }: any =
    useContext(ChartContext);
  const { isFullScreen, setIsFullScreen } = useContext(StandaloneContext);

  const emptyDataState = Object.keys(chartDefinition).length === 0;
  const isAMap = chartProperties.chartTypes.chartType === "Map";

  if (emptyDataState) {
    return isAMap ? <SparqlInput /> : <CSVUploader />;
  }

  const onFullScreenClick = () => {
    setIsFullScreen(!isFullScreen);
    const { layout } = chartDefinition;
    // increment datarevision to force plotly to update the chart width.
    layout.datarevision++;
    setChartDefinition({ ...chartDefinition, layout: { ...layout } });
  };

  return (
    <div id="preview-wrapper">
      <div id="chart-preview-container">
        <div id="preview-heading-area">
          <h2 id="preview-heading">Preview</h2>
          <h3 className="link" onClick={onFullScreenClick}>
            {isFullScreen ? "Exit full screen" : "View full screen"}
          </h3>
        </div>
        <div id="chart-preview">
          {children}
          <div id="publish">
            <PublishButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartPreviewStandalone;
