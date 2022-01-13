import { useContext } from "react";
import { ChartContext } from "../../../context/ChartContext";

const Chart = (): JSX.Element => {
  const { parsedCsvData }: any = useContext(ChartContext);
  console.table(parsedCsvData);

  return (
    <div id="chart-preview">
      <h1>Preview</h1>
      <h2>View in full screen</h2>
      <div>[Chart placeholder]</div>
    </div>
  );
};
export default Chart;
