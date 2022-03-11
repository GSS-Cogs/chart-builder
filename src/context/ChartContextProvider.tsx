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
  const [chartDefinition, setChartDefinition] = useState<PlotlyChartDefinition>({});
  const [chartProperties, setChartProperties] = useState(initialChartProperties);
  const [selectedFilename, setSelectedFilename] = useState(
    NO_FILE_SELECTED_TEXT,
  );
  const [dataSelection, setDataSelection] = useState<
    DataSelection | undefined
  >();

  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  const [selectedDimensions, setSelectedDimensions] = useState<
    SelectedDimension[]
  >([]);

  return {
    chartDefinition,
    setChartDefinition,
    chartProperties,
    setChartProperties,
    selectedFilename,
    setSelectedFilename,
    dataSelection,
    setDataSelection,
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

  const importCsvData = useCallback(
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
    importCsvData,
  };
}

interface TidyDataChartProps {
  columnNames: string[];
  chartData: ChartData | undefined;
  availableDimensions: string[];
}

function useTidyDataToChartContext(tidyData: TidyData, dataSelection: DataSelection | undefined, dimensionValue: string): TidyDataChartProps {
  const columnNames = useMemo(() => {
    if (tidyData.length) return Object.keys(tidyData[0]);
    return [];
  }, [tidyData]);

  const chartData = useMemo(() => {
    if (
      !dataSelection ||
      !dataSelection.xSeries ||
      !dataSelection.measure ||
      ! dataSelection.dimension
    ) {
      return undefined;
    }

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
      return newChartData;
    }

    return undefined;
  }, [dataSelection]);

  const availableDimensions = useMemo(() => {
    if (dimensionValue != '') return getDistinctValues(dimensionValue, tidyData);
    else return []
  }, [dimensionValue, tidyData]);

  return {
    columnNames,
    chartData,
    availableDimensions,
  }
}

interface EeaData {
  "@id": string;
  "data": {
    pk: number[];
    [col: string]: number[] | string[];
  }
}

function useEeaConnectoData(eeaData: EeaData | null, dataSelection: DataSelection | undefined, dimensionValue: string): TidyDataChartProps {
  const columnNames = useMemo(() => {
    if (typeof eeaData?.['data'] === 'object') {
      // primary key is included in the "data"; it's not a usable column.
      const { pk, ...fields } = eeaData.data;
      return Object.keys(fields);
    }
    return [];
  }, [eeaData]);

  const chartData = useMemo(() => {
    if (
      !dataSelection ||
      !dataSelection.xSeries ||
      !dataSelection.measure ||
      !dataSelection.dimension ||
      !eeaData
    ) {
      return undefined;
    }

    const xSeries = eeaData?.data?.[dataSelection.xSeries];// getDistinctValues(dataSelection.xSeries, tidyData);
    const newXSeries: Series = {
      name: dataSelection.xSeries,
      values: xSeries,
    };

    if (dataSelection.ySeries && dataSelection.ySeries.length > 0) {
      const result = dataSelection.ySeries.map((series: SelectedDimension) => {
        const currentSeries = eeaData.data[dataSelection.measure].filter(
          (_, index) => eeaData.data[dataSelection.dimension][index] === series.Name
        );
        return { name: series.DisplayName, values: currentSeries } as Series;
      });

      let newChartData: ChartData = {
        xSeries: newXSeries,
        ySeries: result,
      };
      return newChartData;
    }

    return undefined;
  }, [dataSelection]);

  const availableDimensions = useMemo(() => {
    const vals = eeaData?.data?.[dimensionValue];
    if (dimensionValue != '' && Array.isArray(vals)) {
      return Array.from(new Set(vals));
    }
    else return []
  }, [dimensionValue, eeaData]);

  return {
    columnNames,
    chartData,
    availableDimensions,
  }
}

export function useChartContext(state: any) {
  const [eeaData, importEeaData] = useState<EeaData | null>(null);
  const [tidyData, setTidyData] = useState<object[]>([]);

  const {
    chartDefinition,
    setChartDefinition,
    chartProperties,
    setChartProperties,
    selectedFilename,
    setSelectedFilename,
    dataSelection,
    setDataSelection,
    selectedColumns,
    setSelectedColumns,
    selectedDimensions,
    setSelectedDimensions,
  } = state;

  const { dimension: dimensionValue } = dataSelection;

  // const {
  //   chartData: tidyDataChartData,
  //   columnNames: tidyDataColumnNames,
  //   availableDimensions: tidyDataAvailableDimensions,
  // } = useTidyDataToChartContext(tidyData, dataSelection, dimensionValue);
  //
  // const chartData = tidyDataChartData;
  // const columnNames = tidyDataColumnNames;
  // const availableDimensions = tidyDataAvailableDimensions;

  const {
    chartData: eeaDataChartData,
    columnNames: eeaDataColumnNames,
    availableDimensions: eeaDataAvailableDimensions,
  } = useEeaConnectoData(eeaData, dataSelection, dimensionValue);

  const chartData = eeaDataChartData;
  const columnNames = eeaDataColumnNames;
  const availableDimensions = eeaDataAvailableDimensions;

  useEffect(function updateChartDefinition() {
    if (!chartData) {
      setChartDefinition({});
      return;
    }

    const chartProps = flattenChartProperties(chartProperties);
    const chartType = chartProps.chartType.toLowerCase();

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

    setChartDefinition({data: traces, layout, config});
  }, [chartData, chartProperties]);

  const { importCsvData } = useChartCsvData(setTidyData, setSelectedFilename);

  return {
    tidyData,
    chartDefinition,
    chartProperties,
    setChartProperties,
    selectedFilename,
    setSelectedFilename,
    columnNames,
    dataSelection,
    setDataSelection,
    availableDimensions,
    selectedColumns,
    setSelectedColumns,
    selectedDimensions,
    setSelectedDimensions,
    importCsvData,
    importEeaData,
  };
}

const ChartContextProvider = ({ children }: Props): JSX.Element => {
  const state = useChartContextState();
  const hook = useChartContext(state);

  return <ChartContext.Provider value={hook}>{children}</ChartContext.Provider>;
};

export default ChartContextProvider;
