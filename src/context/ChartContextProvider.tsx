import { ChartContext } from "./ChartContext";
import { useState, useEffect, ReactNode } from "react";
import { titleCase } from "../helper-functions/string-helpers";
import { arrayColumn } from "../helper-functions/array-helpers";
import initialChartState from "./initialChartState";

interface Props {
  children: ReactNode;
}

// array of colors for each series
const colors = ["#a05195", "#f95d6a", "#ffa600", "#003f5c"];

const ChartContextProvider = ({ children }: Props): JSX.Element => {
  const [data, setData] = useState([]);
  const [chartDefinition, setChartDefinition] = useState({});
  const [chartProperties, setChartProperties] = useState(initialChartState);

  useEffect(() => {
    if (data.length === 0) {
      setChartDefinition({});
      return;
    }
    updateChartDefinition(data);
  }, [data, chartProperties]);

  const flattenChartProperties = (): any => {
    let flatProps: any = {};
    chartProperties.forEach((section: any) => {
      section.properties.forEach((property: any) => {
        flatProps = { ...flatProps, [property.name]: property.value };
      });
    });
    return flatProps;
  };

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

    const chartProps: any = flattenChartProperties();

    const layout = {
      title: chartProps.showTitle ? chartProps.title : "",
      xaxis: {
        showgrid: chartProps.showGridLines,
        title: chartProps.xAxisTitle,
        tickangle: chartProps.xAxisTickAngle,
      },
      yaxis: {
        showgrid: chartProps.showGridLines,
        title: chartProps.yAxisTitle,
      },
      paper_bgcolor: chartProps.chartBackgroundColour,
      plot_bgcolor: chartProps.chartBackgroundColour,
      showlegend: chartProps.showLegend,
    };
    setChartDefinition({ data: chartData, layout });
  };

  return (
    <ChartContext.Provider
      value={{
        setData,
        chartDefinition,
        chartProperties,
        setChartProperties,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};

export default ChartContextProvider;
