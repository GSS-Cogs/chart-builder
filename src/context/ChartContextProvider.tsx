import { ChartContext } from "./ChartContext";
import { useState, useEffect, ReactNode } from "react";
import { titleCase } from "../helper-functions/string-helpers";
import { arrayColumn } from "../helper-functions/array-helpers";

interface Props {
  children: ReactNode;
}

// array of colors for each series
const colors = ["#a05195", "#f95d6a", "#ffa600", "#003f5c"];

const ChartContextProvider = ({ children }: Props): JSX.Element => {
  const [data, setData] = useState([]);
  const [chartDefinition, setChartDefinition] = useState({});
  const [showTitle, setShowTitle] = useState(true);
  const [showGridLines, setShowGridLines] = useState(true);

  useEffect(() => {
    if (data.length === 0) {
      setChartDefinition({});
      return;
    }
    updateChartDefinition(data);
  }, [data, showGridLines, showTitle]);

  const updateChartDefinition = (data: any) => {
    const chartData = [];
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

    // in future these hard-coded values will be defined in the properties inspector or CSV metadata
    const layout = {
      title: showTitle ? "Covid-19 Triple Vaccination by UK Nation" : "",
      xaxis: {
        showgrid: showGridLines,
        title: "Week beginning",
      },
      yaxis: {
        showgrid: showGridLines,
        title: "Percentage of people vaccinated",
      },
      paper_bgcolor: "rgb(220, 220, 220)",
      plot_bgcolor: "rgb(220, 220, 220)",
    };

    const config = { responsive: true };

    setChartDefinition({ data: chartData, layout, config });
  };

  return (
    <ChartContext.Provider
      value={{
        setData,
        chartDefinition,
        showTitle,
        setShowTitle,
        showGridLines,
        setShowGridLines,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};

export default ChartContextProvider;
