import { useContext } from "react";
import { ChartContext } from "../../context/ChartContext";
import CSVUploader from "./csv-uploader/CSVUploader";
import "./side-panel.css";

// const chartProperties: string[] = [
//   "Show gridlines",
//   "Show title",
//   "Show legend",
//   "Show x-axis",
//   "Show y-axis",
//   "Show x-axis title",
//   "Show y-axis title",
// ];

const SidePanel = (): JSX.Element => {
  const { chartPropertyState, setChartPropertyState }: any =
    useContext(ChartContext);

  const handleOnChange = (e: any) => {
    const value = e.target.checked;
    const property = e.target.value;
    if (property === "Show gridlines") {
      setChartPropertyState({ ...chartPropertyState, showGridLines: value });
    }
    if (property === "Show title") {
      setChartPropertyState({ ...chartPropertyState, showTitle: value });
    }
  };


  const getCheckbox = (key: string, value: boolean, index: number) => {
    return <div className="property-checkbox" key={key}><input
      type="checkbox"
      className="checkbox"
      id={"chartProperty" + index}
      name={key}
      value={key}
      checked={value}
      onChange={handleOnChange} />
      <label className="label"
        htmlFor={"chartProperty" + index}
      >{key}</label></div>
  }

  const getTextbox = (key: string, value: string, index: number) => {
    return <div className="property-checkbox" key={key}><input
      className="textbox"
      id={"chartProperty" + index}
      name={key}
      value={value}
      onChange={handleOnChange} />
    </div>
  }


  return (
    <div id="side-panel">
      <p id="data-source">Data Source</p>
      <CSVUploader />

      <h3>Configure the Chart</h3>
      {
        Object.entries(chartPropertyState).map(([key, value], index) => {
          if (typeof (value) === "boolean") {
            return getCheckbox(key, value, index);
          }
          else if (typeof (value) === "string") {
            return getTextbox(key, value, index);
          }
        })
      }
    </div>
  );
};
export default SidePanel;
