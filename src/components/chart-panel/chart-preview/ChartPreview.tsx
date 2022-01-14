import { useContext, useEffect } from "react";
import { ChartContext } from "../../../context/ChartContext";
import Plot from "react-plotly.js";
import "./chart-preview.css";

const Chart = (): JSX.Element => {
  const { parsedCsvData }: any = useContext(ChartContext);

  if (parsedCsvData.length === 0)
    return <div id="no-data">No data to show</div>;

  const arrayColumn = (arr: [], key: string) => arr.map((x) => x[key]);

  let xTime = arrayColumn(parsedCsvData, "week_starting");

  const yEngland = arrayColumn(parsedCsvData, "england");
  const yScotland = arrayColumn(parsedCsvData, "scotland");
  const yWales = arrayColumn(parsedCsvData, "wales");
  const yNI = arrayColumn(parsedCsvData, "northern_ireland");

  let trace1 = {};
  let trace2 = {};
  let trace3 = {};
  let trace4 = {};

  trace1 = {
    y: yEngland,
    x: xTime,
    name: "England",
    type: "scatter",
    mode: "lines",
    line: {
      color: "#a05195",
    },
  };

  trace2 = {
    y: yWales,
    x: xTime,
    name: "Wales",
    type: "scatter",
    mode: "lines",
    line: {
      color: "#f95d6a",
    },
  };

  trace3 = {
    y: yScotland,
    x: xTime,
    name: "Scotland",
    type: "scatter",
    mode: "lines",
    line: {
      color: "#ffa600",
    },
  };

  trace4 = {
    y: yNI,
    x: xTime,
    name: "NI",
    type: "scatter",
    mode: "lines",
    line: {
      color: "#003f5c",
    },
  };

  const data = [trace1, trace2, trace3, trace4];

  const layout = {
    title: "Covid-19 Triple Vaccination by UK Nation",
    xaxis: {
      title: "Week beginning",
    },
    yaxis: {
      title: "Percentage of people vaccinated",
    },
  };

  return (
    <div id="chart-preview">
      <h1>Preview</h1>
      <h2>View in full screen</h2>

      <Plot data={data} layout={layout} />
    </div>
  );
};
export default Chart;
