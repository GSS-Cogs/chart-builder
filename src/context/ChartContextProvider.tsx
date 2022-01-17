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

  useEffect(() => {
    if (data.length === 0) {
      setChartDefinition({});
      return;
    }
    updateChartDefinition(data);
  }, [data]);

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
      title: "Covid-19 Triple Vaccination by UK Nation",
      xaxis: {
        title: "Week beginning",
      },
      yaxis: {
        title: "Percentage of people vaccinated",
      },
      paper_bgcolor: "rgb(220, 220, 220)",
      plot_bgcolor: "rgb(220, 220, 220)",
    };
    setChartDefinition({ data: chartData, layout });
  };

  return (
    <ChartContext.Provider
      value={{
        setData,
        chartDefinition,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};

export default ChartContextProvider;
