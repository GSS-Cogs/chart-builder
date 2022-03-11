import ChartContext, {PlotlyChartDefinition, TidyData} from "./ChartContext";
import {Dispatch, ReactNode, SetStateAction, useCallback, useEffect, useMemo, useState,} from "react";
import initialChartProperties from "./initialChartProperties";

import {arrayColumn, getDistinctValues,} from "../helper-functions/array-helpers";

import {colors, flattenChartProperties,} from "../helper-functions/chart-helpers";

import {NO_FILE_SELECTED_TEXT} from "../components/constants/Common-constants";
import config from "../plotly/config";
import getLayout from "../plotly/layout";
import Papa from "papaparse";

interface Props {
  children: ReactNode;
}

export interface Series {
  name: string;
  values: string[];
}

export interface ChartData {
  xSeries: Series;
  ySeries: Series[];
}

export interface SelectedDimension {
  Name: string;
  DisplayName: string;
}

export interface DataSelection {
  xSeries: string;
  measure: string;
  dimension: string;
  ySeries: SelectedDimension[];
}

export function useChartContextState() {
  const [tidyData, setTidyData] = useState<TidyData>([]);
  const [chartDefinition, setChartDefinition] = useState<PlotlyChartDefinition>({});
  const [chartProperties, setChartProperties] = useState(initialChartProperties);
  const [selectedFilename, setSelectedFilename] = useState(
    NO_FILE_SELECTED_TEXT,
  );
  const [dataSelection, setDataSelection] = useState<
    DataSelection | undefined
  >();

  const [availableDimensions, setAvailableDimensions] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  const [selectedDimensions, setSelectedDimensions] = useState<
    SelectedDimension[]
  >([]);

  return {
    tidyData,
    setTidyData,
    chartDefinition,
    setChartDefinition,
    chartProperties,
    setChartProperties,
    selectedFilename,
    setSelectedFilename,
    dataSelection,
    setDataSelection,
    availableDimensions,
    setAvailableDimensions,
    selectedColumns,
    setSelectedColumns,
    selectedDimensions,
    setSelectedDimensions,
  };
}

export function useChartCsvData(
  setTidyData: Dispatch<SetStateAction<TidyData>>,
  setSelectedFilename: Dispatch<SetStateAction<string>>,
) {
  const onFailure = (error: string) => {
    console.log(error);
  };

  const validateData = useCallback(
    (data: File | string, filename: string) => {
      Papa.parse(data, {
        worker: true,
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: function (results) {
          if (results.errors && results.errors.length > 0) {
            onFailure(results.errors[0].message);
          } else {
            setSelectedFilename(filename);
            setTidyData(results.data);
          }
        },
      });
    },
    [setSelectedFilename, setTidyData],
  );

  return {
    validateData,
  };
}

function useTidyDataToChartContext(tidyData: TidyData) {
  const columnNames = useMemo(() => {
    if (tidyData.length) return Object.keys(tidyData[0]);
    return [];
  }, [tidyData]);

  return {
    columnNames,
  }
}

export function useChartContext(state: any) {
  const [chartData, setChartData] = useState<ChartData>();

  const {
    tidyData,
    setTidyData,
    chartDefinition,
    setChartDefinition,
    chartProperties,
    setChartProperties,
    selectedFilename,
    setSelectedFilename,
    dataSelection,
    setDataSelection,
    availableDimensions,
    setAvailableDimensions,
    selectedColumns,
    setSelectedColumns,
    selectedDimensions,
    setSelectedDimensions,
  } = state;

  useEffect(() => {
    if (!chartData) {
      setChartDefinition({});
      return;
    }
    updateChartDefinition();
  }, [chartData, chartProperties]);

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

  const sanitizeChartData = () => {
    if (!dataSelection) return;
    const xSeries = getDistinctValues(dataSelection.xSeries, tidyData);
    const newXSeries: Series = {
      name: dataSelection.xSeries,
      values: xSeries,
    };

    if (dataSelection.ySeries && dataSelection.ySeries.length > 0) {
      const result = dataSelection.ySeries.map((series: SelectedDimension) => {
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
    } else {
      setChartData(undefined);
    }
  };

  const chartProps = flattenChartProperties(chartProperties);
  const chartType = chartProps.chartType.toLowerCase();

  const updateChartDefinition = () => {
    const traces: any = [];

    //truncate the xSeries values to user specified length
    const xSeries = chartData?.xSeries.values.map((value: string) => {
      return String(value).substring(0, chartProps.xTickLabelMaxLength);
    });

    chartData?.ySeries.map((series, index) => {
      let trace: {};
      if (chartProps.orientation === "horizontal") {
        trace = {
          x: series.values,
          y: xSeries,
          orientation: "h",
        };
      } else {
        trace = {
          x: xSeries,
          y: series.values,
          orientation: "v",
        };
      }

      traces.push({
        ...trace,
        name: series.name,
        type: chartType === "stacked bar" ? "bar" : chartType,
        mode: "lines",
        hoverinfo: chartProps.interactivity,
        line: {
          color: colors[index],
        },
      });
    });

    const layout: any = getLayout(chartProps, chartData);

    setChartDefinition({ data: traces, layout, config });
  };

  const { validateData } = useChartCsvData(setTidyData, setSelectedFilename);
  const { columnNames } = useTidyDataToChartContext(tidyData);

  return {
    tidyData,
    setTidyData,
    chartDefinition,
    chartProperties,
    setChartProperties,
    selectedFilename,
    setSelectedFilename,
    columnNames,
    dataSelection,
    setDataSelection,
    availableDimensions,
    setAvailableDimensions,
    selectedColumns,
    setSelectedColumns,
    selectedDimensions,
    setSelectedDimensions,
    validateData,
  };
}

const ChartContextProvider = ({ children }: Props): JSX.Element => {
  const state = useChartContextState();
  const hook = useChartContext(state);

  return <ChartContext.Provider value={hook}>{children}</ChartContext.Provider>;
};

export default ChartContextProvider;
