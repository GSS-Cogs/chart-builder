import { ChartContext } from "./ChartContext";
import { useState, useEffect, ReactNode } from "react";
import {
  arrayColumn,
  getDistinctValues,
} from "../helper-functions/array-helpers";
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

export interface SelectedDimension {
  Name: string;
  DisplayName: string;
}

interface DataSelection {
  xSeries: string;
  measure: string;
  dimension: string;
  ySeries: SelectedDimension[];
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
  const [columnNames, setColumnNames] = useState<string[]>([]);
  const [dataSelection, setDataSelection] = useState<DataSelection>();

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

  //setChartData
  useEffect(() => {
    if (
      dataSelection &&
      dataSelection.xSeries &&
      dataSelection.measure &&
      dataSelection.dimension
    ) {
      sanitizeChartData();
    }
  }, [dataSelection]);

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
    setColumnNames(columnNames);
  };

  const sanitizeChartData = () => {
    // //step2
    // const userSelectedXAxis = "week_starting";
    if (!dataSelection) return;
    const xSeries = getDistinctValues(dataSelection.xSeries, tidyData);
    const newXSeries: Series = {
      name: dataSelection.xSeries,
      values: xSeries,
    };

    //step3
    // if (userPreferences.xSeriesColumnName) {
    //   columnNames = columnNames.filter(
    //     (item) => item !== userPreferences.xSeriesColumnName,
    //   );
    // }
    // const userSelectedMeasure = "infection_rate";

    //step4
    // columnNames = columnNames.filter((item) => item !== userPreferences.measure);
    // const userSelectedYAxis = "country_name";

    //step5
    // const ySeries_all = getDistinctValues(dataSelection.dimension, tidyData);
    // setAvailableDimensions(ySeries_all);
    // const userSelectedYSeries = [
    //   ySeries_all[0],
    //   ySeries_all[1],
    //   ySeries_all[2],
    //   ySeries_all[3],
    // ];

    if (dataSelection.ySeries && dataSelection.ySeries.length > 0) {
      const result = dataSelection.ySeries.map((series, index) => {
        const filteredDataBySeries = tidyData.filter(
          (item: any) => item[dataSelection.dimension] === series.Name,
        );
        const currentSeries = arrayColumn(
          filteredDataBySeries,
          dataSelection.measure,
        );
        return { name: series.DisplayName, values: currentSeries } as Series;
      });

      let newChartData: ChartData = {
        xSeries: newXSeries,
        ySeries: result,
      };
      setChartData(newChartData);
    }
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
        fixedrange: true, // prevents the user from zooming in/out
        showgrid: chartProps.showGridLines,
        title: chartProps.xAxisTitle,
        tickangle: chartProps.xAxisTickAngle,
      },
      yaxis: {
        range: calculateYRange(chartData!.ySeries),
        fixedrange: true, // prevents the user from zooming in/out
        showgrid: chartProps.showGridLines,
        title: chartProps.yAxisTitle,
        type: "linear",
      },
      paper_bgcolor: "rgb(255,255,255)",
      plot_bgcolor: "rgb(255,255,255)",
      showlegend: chartProps.showLegend,
    };

    const config = { displayModeBar: false };

    setChartDefinition({ data: traces, layout, config });
  };

  return (
    <ChartContext.Provider
      value={{
        tidyData,
        setTidyData,
        chartDefinition,
        chartProperties,
        setChartProperties,
        selectedFilename,
        setSelectedFilename,
        previewMode,
        setPreviewMode,
        columnNames,
        dataSelection,
        setDataSelection,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};

export default ChartContextProvider;
