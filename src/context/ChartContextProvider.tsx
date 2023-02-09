import ChartContext, {
  ChartContextProps,
  ChartContextState,
  ChartPropertyValues,
  ChartPropertySectionValues,
} from "./ChartContext";

import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import chartPropertiesSchema from "./ChartPropertiesSchema";
import useChartCsvData from "./useChartCsvData";
import { GeoJSON } from "geojson";

import {
  ChartData,
  DataSelection,
  EeaData,
  PlotlyChartDefinition,
  SelectedDimension,
  DataColumn,
  TidyData,
  ChartDataProvider,
  ChartPropertySchemaSection,
  ChartPropertySchema,
} from "./types";

import {
  arrayColumn,
  getDistinctValues,
} from "../helper-functions/array-helpers";

import { NO_FILE_SELECTED_TEXT } from "../components/constants/Common-constants";
import updateChartDefinition from "../plotly/chartDefinition";

interface Props {
  children: ReactNode;
}

export function getInitialChartProperties(): ChartPropertyValues {
  return chartPropertiesSchema.reduce(
    (acc: ChartPropertyValues, section: ChartPropertySchemaSection) => {
      acc[section.name] = section.properties.reduce(
        (acc: ChartPropertySectionValues, prop: ChartPropertySchema) => {
          acc[prop.name] = prop.defaultValue;
          return acc;
        },
        {},
      );
      return acc;
    },
    {},
  );
}

export function useChartContextState(): ChartContextState {
  const [chartDefinition, setChartDefinition] = useState<PlotlyChartDefinition>(
    {},
  );
  const [chartProperties, setChartPropertiesMap] = useState(
    getInitialChartProperties,
  );

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
  const [mapData, setMapData] = useState<any>([]);
  const [geoJson, setGeoJson] = useState<GeoJSON>({} as GeoJSON);

  const setChartProperties = useCallback(
    (section: string, name: string, value: boolean | number | string): void => {
      setChartPropertiesMap((existing) => {
        return {
          ...existing,
          [section]: {
            ...existing[section],
            [name]: value,
          },
        };
      });
    },
    [setChartPropertiesMap],
  );

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
    mapData,
    setMapData,
    geoJson,
    setGeoJson,
  };
}

function useTidyDataToChartContext(
  tidyData: TidyData,
  dataSelection: DataSelection | undefined,
  dimensionValue: string,
): ChartDataProvider {
  const columnNames = useMemo(() => {
    if (tidyData.length) return Object.keys(tidyData[0]);
    return [];
  }, [tidyData]);

  const chartData = useMemo(() => {
    if (
      !dataSelection?.xValues ||
      !dataSelection.measure ||
      !dataSelection.dimension ||
      !dataSelection.yValues ||
      dataSelection.yValues.length === 0
    ) {
      return undefined;
    }

    const { xValues: category, measure, dimension } = dataSelection;
    const allSeries = dataSelection.yValues;
    let newChartData: ChartData = { xValues: [], yValues: [] };

    // Iterate the array of series selected by the user for inclusion in the chart
    // and extract from the source tidy data the sparse X and Y values for each series
    for (let i = 0; i < allSeries.length; i++) {
      const series = allSeries[i];
      // Filter the tidyData to get the current series
      const currentSeries = tidyData.filter(
        (row: any) => row[dimension] === series.name,
      );
      // Extract the X and Y values from columns into arrays
      const xArray = arrayColumn(currentSeries, category);
      const yArray = arrayColumn(currentSeries, measure);

      // Create X and Y values objects for the current series
      const xValues = {
        name: category,
        values: xArray,
      };

      // The Y values object also passes through the user specified series properies from dataSelection
      let yValues = {
        name: series.displayName,
        color: series.color,
        dashStyle: series.dashStyle,
        intervalType: "---",
        values: yArray,
      };

      if (
        series.intervalType !== "---" &&
        series.lowerBoundSeries !== "" &&
        series.upperBoundSeries !== ""
      ) {
        // Extract the X and Y values from columns into arrays
        const xLowerArray = arrayColumn(currentSeries, category);
        const yLowerArray = arrayColumn(currentSeries, series.lowerBoundSeries);

        const xUpperArray = arrayColumn(currentSeries, category).reverse();
        const yUpperArray = arrayColumn(
          currentSeries,
          series.upperBoundSeries,
        ).reverse();

        // Create X and Y values objects for the current series
        const xConfidenceValues = {
          name: category,
          values: xLowerArray.concat(xUpperArray),
        };

        // The Y values object also passes through the user specified series properies from dataSelection
        const newColor = series.intervalColor
          .replace(")", ", 0.2)")
          .replace("rgb", "rgba");
        const yConfidenceValues = {
          name: "Confidence Intervals",
          color: newColor,
          dashStyle: series.dashStyle,
          intervalType:
            series.intervalType === "error bars"
              ? "error-skip"
              : series.intervalType,
          values: yLowerArray.concat(yUpperArray),
        };

        yValues.intervalType =
          series.intervalType === "error bars" ? "error bars" : "---";
        // Push the X and Y values objects to the chart data
        newChartData.xValues.push(xValues);
        newChartData.yValues.push(yValues);

        // Push the confidence X and Y values objects to the chart data
        newChartData.xValues.push(xConfidenceValues);
        newChartData.yValues.push(yConfidenceValues);
      } else {
        // Push the X and Y values objects to the chart data
        newChartData.xValues.push(xValues);
        newChartData.yValues.push(yValues);
      }
    }

    return newChartData;
  }, [tidyData, dataSelection]);

  const availableDimensions = useMemo(() => {
    if (dimensionValue != "")
      return getDistinctValues(dimensionValue, tidyData);
    else return [];
  }, [dimensionValue, tidyData]);

  return {
    columnNames,
    chartData,
    availableDimensions,
  };
}

function useEeaConnectorData(
  eeaData: EeaData | null,
  dataSelection: DataSelection | undefined,
  dimensionValue: string,
): ChartDataProvider {
  const columnNames = useMemo(() => {
    if (typeof eeaData?.["data"] === "object") {
      // primary key is included in the "data"; it's not a usable column.
      const { pk, ...fields } = eeaData.data;
      return Object.keys(fields);
    }
    return [];
  }, [eeaData]);

  const chartData = useMemo(() => {
    if (
      !dataSelection?.xValues ||
      !dataSelection.measure ||
      !dataSelection.dimension ||
      !dataSelection.yValues ||
      dataSelection.yValues.length === 0 ||
      !eeaData
    ) {
      return undefined;
    }

    const data = eeaData.data;
    const allSeries = dataSelection.yValues;
    const { xValues: category, measure, dimension } = dataSelection;

    let newChartData: ChartData = { xValues: [], yValues: [] };

    // Iterate the array of series selected by the user for inclusion in the chart
    // and extract from the source tidy data the sparse X and Y values for each series
    for (let i = 0; i < allSeries.length; i++) {
      const series = allSeries[i];

      let toFilter: number[] | string[];
      // Select the category column
      toFilter = Array.isArray(data?.[category]) ? data[category] : [];

      // Filter the category column to get the (X) values for the current series
      const xArray = (toFilter as any[]).filter<string | number>(
        (_, index): _ is any => data[dimension][index] === series.name,
      );

      // Select the measure column
      toFilter = Array.isArray(data?.[measure]) ? data[measure] : [];

      // Filter the measure column to get the (Y) values for the current series
      const yArray = (toFilter as any[]).filter<string | number>(
        (_, index): _ is any => data[dimension][index] === series.name,
      );

      // Build the X and Y values objects for the current series
      const xValues = {
        name: category,
        values: xArray,
      } as DataColumn;

      // The Y values object also passes through the user specified series properies from dataSelection
      const yValues = {
        name: series.displayName,
        values: yArray,
        color: series.color,
        dashStyle: series.dashStyle,
      } as DataColumn;

      // Push the X and Y values objects to the chart data
      newChartData.xValues.push(xValues);
      newChartData.yValues.push(yValues);
    }

    return newChartData;
  }, [eeaData, dataSelection]);

  const availableDimensions = useMemo((): string[] => {
    const vals = eeaData?.data?.[dimensionValue];
    if (dimensionValue != "" && Array.isArray(vals)) {
      return Array.from(new Set(vals as string[]));
    } else return [];
  }, [dimensionValue, eeaData]);

  return {
    columnNames,
    chartData,
    availableDimensions,
  };
}

export function useChartContext(state: ChartContextState): ChartContextProps {
  const [dataSource, setDataSource] = useState<"" | "tidy" | "eea">("");
  const [eeaData, importEeaDataHook] = useState<EeaData | null>(null);
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
    mapData,
    setMapData,
    geoJson,
    setGeoJson,
  } = state;

  const dimensionValue = dataSelection?.dimension || "";

  const {
    chartData: tidyDataChartData,
    availableDimensions: tidyDataAvailableDimensions,
    columnNames: tidyDataColumnNames,
  } = useTidyDataToChartContext(tidyData, dataSelection, dimensionValue);

  const {
    chartData: eeaDataChartData,
    availableDimensions: eeaDataAvailableDimensions,
    columnNames: eeaDataColumnNames,
  } = useEeaConnectorData(eeaData, dataSelection, dimensionValue);

  let chartData: ChartData | undefined = undefined,
    columnNames: string[] = [],
    availableDimensions: string[] = [];

  if (dataSource === "tidy") {
    chartData = tidyDataChartData;
    availableDimensions = tidyDataAvailableDimensions;
    columnNames = tidyDataColumnNames;
  } else if (dataSource === "eea") {
    chartData = eeaDataChartData;
    columnNames = eeaDataColumnNames;
    availableDimensions = eeaDataAvailableDimensions;
  }

  useEffect(() => {
    if (!chartData && mapData.length === 0) {
      setChartDefinition({});
      return;
    }
    const isAMap = chartProperties?.chartTypes?.chartType === "Map";

    if (isAMap && !geoJson) {
      setChartDefinition({});
      return;
    }
    const chartDefinition = updateChartDefinition(
      chartProperties,
      chartData,
      mapData,
      geoJson,
    );

    setChartDefinition(chartDefinition);
  }, [chartData, mapData, geoJson, chartProperties]);

  useEffect(() => {
    setDataSelection((prevState: any) => ({
      ...prevState,
      yValues: selectedDimensions,
    }));
  }, [selectedDimensions]);

  const { importCsvData: importCsvHook } = useChartCsvData(
    setTidyData,
    setSelectedFilename,
  );

  const importCsvData = useCallback(
    (data: File | string, filename: string) => {
      setDataSource("tidy");
      importCsvHook(data, filename);
    },
    [setDataSource, importCsvHook],
  );

  const importEeaData = useCallback(
    (data: EeaData) => {
      setDataSource("eea");
      importEeaDataHook(data);
    },
    [setDataSource, importEeaDataHook],
  );

  return {
    chartDefinition,
    setChartDefinition,
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
    mapData,
    setMapData,
    geoJson,
    setGeoJson,
  };
}

const ChartContextProvider = ({ children }: Props): JSX.Element => {
  const state = useChartContextState();
  const hook = useChartContext(state);

  return <ChartContext.Provider value={hook}>{children}</ChartContext.Provider>;
};

export default ChartContextProvider;
