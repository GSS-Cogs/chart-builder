import { ReactChildren, ReactChild } from "react";
import PublishButton from "../PublishButton";
import "./standalone-chart.css";
import { useContext } from "react";
import ChartContext from "../../../context/ChartContext";
import CSVUploader from "../csv-uploader/CSVUploader";
import SparqlInput from "../sparql-input/SparqlInput";

interface Props {
  children: ReactChild | ReactChildren;
}

const ChartPreviewStandalone = ({ children }: Props) => {
  const { chartDefinition, chartProperties }: any = useContext(ChartContext);

  const emptyDataState = Object.keys(chartDefinition).length === 0;
  const isAMap = chartProperties.chartTypes.chartType === "Map";

  if (emptyDataState) {
    return isAMap ? <SparqlInput /> : <CSVUploader />;
  }

  return (
    <div id="preview-wrapper">
      <div id="chart-preview-container">
        <div id="preview-heading-area">
          <h2 id="preview-heading">Preview</h2>
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
