import { ChartContext } from "./ChartContext";
import { useState, useEffect, ReactNode } from "react";
import { titleCase } from "../helper-functions/string-helpers";
import { arrayColumn } from "../helper-functions/array-helpers";
import initialChartState from "./initialChartState";

interface Props {
  children: ReactNode;
}

interface Series {
  name: string;
  values: string[];
}

interface ChartData {
  xSeries: Series;
  ySeries: Series[];
}

// array of colors for each series
const colors = ["#a05195", "#f95d6a", "#ffa600", "#003f5c"];

const ChartContextProvider = ({ children }: Props): JSX.Element => {
  const [tidyData, setTidyData] = useState<any>([]);
  const [chartData, setChartData] = useState<ChartData>();
  const [chartDefinition, setChartDefinition] = useState({});
  const [chartProperties, setChartProperties] = useState(initialChartState);

  useEffect(() => {
    if (tidyData.length > 0) transformTidyData();
  }, [tidyData]);

  useEffect(() => {
    if (!chartData) {
      setChartDefinition({});
      return;
    }
    updateChartDefinition();
  }, [chartData, chartProperties]);

  const flattenChartProperties = (): any => {
    let flatProps: any = {};
    chartProperties.forEach((section: any) => {
      section.properties.forEach((property: any) => {
        flatProps = { ...flatProps, [property.name]: property.value };
      });
    });
    return flatProps;
  };

  //Step1: Find column names from the data.
  //Step2: Present user with all column names to select single x-axis dimension such as week_starting
  //Step3: Present user with remaining column names to select single measure  such as infection_rate
  //Step4: Present user with remaining column names to select y-axis dimensions such as country_name
  //Step5: Present the user distinct values for that column such as england, scotland, wales and norther_ireland


  const transformTidyData = () => {
    //step1
    let columnNames = Object.keys(tidyData[0]);

    //step2
    const userSelectedXAxis = "week_starting";
    const xSeries = getDistinctValues(userSelectedXAxis);
    const newXSeries : Series = {name: userSelectedXAxis, values: xSeries}

    //step3
    columnNames = columnNames.filter((item) => item !== userSelectedXAxis);
    const userSelectedMeasure = "infection_rate";

    //step4
    columnNames = columnNames.filter((item) => item !== userSelectedMeasure);
    const userSelectedYAxis = "country_name";

    //step5
    const ySeries_all = getDistinctValues(userSelectedYAxis);
    const userSelectedYSeries = [
      ySeries_all[0],
      ySeries_all[1],
      ySeries_all[3],
    ];

    const result = userSelectedYSeries.map((series, index) => {
      const filteredDataBySeries = tidyData.filter(
        (item: any) => item[userSelectedYAxis] === series,
      );
      const currentSeries = arrayColumn(filteredDataBySeries, userSelectedMeasure);
      return {name: series, values: currentSeries} as Series;
    });

    let newChartData : ChartData = {
      xSeries : newXSeries, 
      ySeries : result
    };

 
    setChartData(newChartData);
    // //based on example get distinct values from the country column //4 countries
    // //Map through these 4 distinct values for country column
    // // filter the all rows by on the current country column
    // // [countryname: England
    //     Weekr_Starting:{12/01},{17/01},{}
    //     infeactionrate: {1}, {2}, {3}]
  };

  const getDistinctValues = (columnName: string) => {
    const allSeries = arrayColumn(tidyData, columnName);
    return Array.from(new Set(allSeries));
  };

  const updateChartDefinition = () => {
    const traces:any = [];
    chartData?.ySeries.map((series, index) => {
      traces.push({
        x: chartData!.xSeries.values,
        y: series.values,
        name: series.name,
        type: "scatter",
        mode: "lines",
        line: {
          color: colors[index - 1],
        },
      });
    }) 


    const chartProps: any = flattenChartProperties();
    const layout = {
      title: chartProps.showTitle ? chartProps.chartTitle : "",
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
    setChartDefinition({ data: traces, layout });
  };

  return (
    <ChartContext.Provider
      value={{
        setTidyData,
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
