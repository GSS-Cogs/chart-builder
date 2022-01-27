import { useContext } from "react";
import ChartContext from "../../context/ChartContext";
import ChartPanel from "../chart-panel/ChartPanel";
import CSVUploader from "../side-panel/csv-uploader/CSVUploader";
import SidePanel from "../side-panel/SidePanel";
import "./chart-builder.css";

const ChartBuilder = (): JSX.Element => {
  const { previewMode }: any = useContext(ChartContext);
  return (
    <div id="chart-builder">
      <SidePanel />
      {previewMode ? <ChartPanel /> : <CSVUploader />}
    </div>
  );
};

export default ChartBuilder;
