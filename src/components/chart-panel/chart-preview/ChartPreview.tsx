import { useContext, useEffect } from "react";
import { ChartContext } from "../../../context/ChartContext";
import Plot from "react-plotly.js";
import "./chart-preview.css";

// function to extract a vector from a matrix (i.e. an array column from 2D array))
const arrayColumn = (arr: [], key: string) => arr.map((x) => x[key]);

function titleCase(str: string) {
  return str
    .toLowerCase()
    .split("_")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

// array of colors for each series
const colors = ["#a05195", "#f95d6a", "#ffa600", "#003f5c"];

const Chart = (): JSX.Element => {
  const { parsedCsvData: data }: any = useContext(ChartContext);

  if (data.length === 0) return <div id="no-data">No data to show</div>;

  let chartData = [{}];

  const colNames = Object.keys(data[0]);
  const xValues = arrayColumn(data, colNames[0]);

  // iterate over the data columns to build up the traces (series) for the chart.
  // we ignore the first column which is for the x-axis values
  for (let index = 1; index < colNames.length; index++) {
    chartData.push({
      x: xValues,
      y: arrayColumn(data, colNames[index]),
      name: titleCase(colNames[index]),
      type: "scatter",
      mode: "lines",
      line: {
        color: colors[index - 1],
      },
    });
  }

  // in later iterations these hard-coded values will be defined in the properties inspector or CSV metadata
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

      <Plot data={chartData} layout={layout} />
    </div>
  );
};
export default Chart;
