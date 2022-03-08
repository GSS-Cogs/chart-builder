import ChartContext from "./ChartContext";
import { ReactNode, useEffect, useState } from "react";
import initialChartState from "./initialChartState";
import useChartCsvData from "./useChartCsvData";
import { Series, ChartData, SelectedDimension, DataSelection } from "./types";

import {
  arrayColumn,
  getDistinctValues,
} from "../helper-functions/array-helpers";

import { NO_FILE_SELECTED_TEXT } from "../components/constants/Common-constants";
import updateChartDefinition from "../plotly/chartDefinition";

interface Props {
  children: ReactNode;
}

export function useChartContextState() {
  const [tidyData, setTidyData] = useState<any>([]);
  const [chartDefinition, setChartDefinition] = useState({});
  const [chartProperties, setChartProperties] = useState(initialChartState);
  const [selectedFilename, setSelectedFilename] = useState(
    NO_FILE_SELECTED_TEXT,
  );
  const [columnNames, setColumnNames] = useState<string[]>([]);
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
    columnNames,
    setColumnNames,
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
    columnNames,
    setColumnNames,
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
    if (tidyData.length > 0) transformTidyData();
  }, [tidyData]);

  const f = async () => {
    const chartDefinition = await updateChartDefinition(
      chartProperties,
      chartData,
    );
    setChartDefinition(chartDefinition);
  };

  useEffect(() => {
    if (!chartData) {
      setChartDefinition({});
      return;
    }
    f();
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

  const transformTidyData = () => {
    let columnNames = Object.keys(tidyData[0]);
    setColumnNames(columnNames);
  };

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

  const { validateData } = useChartCsvData(setTidyData, setSelectedFilename);

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
