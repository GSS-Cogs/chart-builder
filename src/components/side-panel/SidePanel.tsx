import { useContext } from "react";
import { ChartContext } from "../../context/ChartContext";
import CSVUploader from "./csv-uploader/CSVUploader";
import "./side-panel.css";

const chartProperties: string[] = [
  "Show gridlines",
  "Show title",
  "Show legend",
  "Show x-axis",
  "Show y-axis",
  "Show x-axis title",
  "Show y-axis title",
];

const SidePanel = (): JSX.Element => {
  const { showTitle, setShowTitle, showGridLines, setShowGridLines }: any =
    useContext(ChartContext);

  const handleOnChange = (e: any) => {
    const value = e.target.checked;
    const property = e.target.value;
    if (property === "Show gridlines") {
      setShowGridLines(value);
    }
    if (property === "Show title") {
      setShowTitle(value);
    }
  };

  return (
    <div id="side-panel">
      <p id="data-source">Data Source</p>
      <CSVUploader />

      <h3>Configure the Chart</h3>

      {chartProperties.map((item, index) => (
        <div className="property-checkbox" key={item}>
          <input
            type="checkbox"
            id={"chartProperty" + index}
            name={item}
            value={item}
            checked={
              item === "Show gridlines"
                ? showGridLines
                : item === "Show title"
                ? showTitle
                : false
            }
            onChange={handleOnChange}
          />{" "}
          {item}
          <br />
        </div>
      ))}
    </div>
  );
};
export default SidePanel;
