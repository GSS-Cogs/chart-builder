import { useContext } from "react";
import DataSelection from "../data-selection/DataSelection";
import CSVUploader from "../csv-uploader/CSVUploader";
import ChartContext, { ChartContextProps } from "../../../context/ChartContext";
import { NO_FILE_SELECTED_TEXT } from "../../constants/Common-constants";

const DataSelectionSection = (sectionName: any) => {
  const { selectedFilename, setSelectedFilename }: ChartContextProps =
    useContext(ChartContext);

  const resetChartState = () => {
    setSelectedFilename(NO_FILE_SELECTED_TEXT);
  };

  return (
    <div key={`${sectionName}-data-selection`}>
      <CSVUploader />
      <div className="property-section">
        <div id="data-source"> Data source</div>
        <label id="selected-filename">{selectedFilename}</label>
        <button className="close-button" onClick={() => resetChartState()}>
          {"Reset"}
        </button>
      </div>
      <DataSelection />
    </div>
  );
};

export default DataSelectionSection;
