import { ChartContext } from "./ChartContext";
import { useState, useEffect, ReactNode } from "react";
import { arrayColumn } from "../helper-functions/array-helpers";
import initialChartState from "./initialChartState";
import { NO_FILE_SELECTED_TEXT } from "../components/constants/Common-constants";
import { extent } from "d3-array";

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
  const [selectedFilename, setSelectedFilename] = useState(
    NO_FILE_SELECTED_TEXT,
  );
  const [previewMode, setPreviewMode] = useState<boolean>(false);

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

  const transformTidyData = () => {
    //step1
    let columnNames = Object.keys(tidyData[0]);

    //step2
    const userSelectedXAxis = "week_starting";
    const xSeries = getDistinctValues(userSelectedXAxis);
    const newXSeries: Series = { name: userSelectedXAxis, values: xSeries };

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
      ySeries_all[2],
      ySeries_all[3],
    ];

    const result = userSelectedYSeries.map((series, index) => {
      const filteredDataBySeries = tidyData.filter(
        (item: any) => item[userSelectedYAxis] === series,
      );
      const currentSeries = arrayColumn(
        filteredDataBySeries,
        userSelectedMeasure,
      );
      return { name: series, values: currentSeries } as Series;
    });

    let newChartData: ChartData = {
      xSeries: newXSeries,
      ySeries: result,
    };
    setChartData(newChartData);
  };

  const getDistinctValues = (columnName: string) => {
    const allSeries = arrayColumn(tidyData, columnName);
    return Array.from(new Set(allSeries));
  };

  const calculateYRange = (ySeries: Series[]): any => {
    let globalYMin = Number.MAX_SAFE_INTEGER;
    let globalYMax = Number.MIN_SAFE_INTEGER;
    const yRange = ySeries.forEach((series: Series) => {
      // convert string values to numbers
      const yValues = series.values.map(Number);
      const yExtent = extent(yValues);

      globalYMin = Math.min(globalYMin, yExtent[0]!);
      globalYMax = Math.max(globalYMax, yExtent[1]!);
    });
    return [globalYMin, globalYMax];
  };

  const updateChartDefinition = () => {
    const traces: any = [];

    if (chartData) calculateYRange(chartData.ySeries);
    chartData?.ySeries.map((series, index) => {
      traces.push({
        x: chartData!.xSeries.values,
        y: series.values,
        name: series.name,
        type: "scatter",
        mode: "lines",
        line: {
          color: colors[index],
        },
      });
    });

    const chartProps: any = flattenChartProperties();
    const layout = {
      autosize: false,
      width: 950,
      height: 600,
      title: {
        text: chartProps.showTitle ? chartProps.chartTitle : "",
        font: {
          size: "21",
        },
      },
      xaxis: {
        range: [0, chartData!.xSeries.values.length],
        showgrid: chartProps.showGridLines,
        title: chartProps.xAxisTitle,
        tickangle: chartProps.xAxisTickAngle,
      },
      yaxis: {
        range: calculateYRange(chartData!.ySeries),
        showgrid: chartProps.showGridLines,
        title: chartProps.yAxisTitle,
        type: "linear",
      },
      paper_bgcolor: "rgb(255,255,255)",
      plot_bgcolor: "rgb(255,255,255)",
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
        selectedFilename,
        setSelectedFilename,
        previewMode,
        setPreviewMode,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};

export default ChartContextProvider;
