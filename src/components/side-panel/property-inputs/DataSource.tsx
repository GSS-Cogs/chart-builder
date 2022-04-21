import { useContext } from "react";
import ChartContext, { ChartContextProps } from "../../../context/ChartContext";
import StandaloneContext, {
  StandaloneContextProps,
} from "../../../context/StandaloneContext";
import { NO_FILE_SELECTED_TEXT } from "../../constants/Common-constants";

const DataSource = (sectionName: any) => {
  const {
    selectedFilename,
    setSelectedFilename,
    setChartDefinition,
    setMapData,
  }: ChartContextProps = useContext(ChartContext);

  const { setSparqlQuery }: StandaloneContextProps =
    useContext(StandaloneContext);

  const resetChartState = () => {
    setSelectedFilename(NO_FILE_SELECTED_TEXT);
    setSparqlQuery("");
    setChartDefinition({});
  };

  return (
    <div key={`${sectionName}-data-selection`}>
      <div className="property-section">
        <div id="data-source"> Data source</div>
        <label id="selected-filename">{selectedFilename}</label>
        <button className="close-button" onClick={() => resetChartState()}>
          {"Reset"}
        </button>
      </div>
    </div>
  );
};

export default DataSource;
