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
  Series,
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
      !dataSelection ||
      !dataSelection.xSeries ||
      !dataSelection.measure ||
      !dataSelection.dimension
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
      !dataSelection ||
      !dataSelection.xSeries ||
      !dataSelection.measure ||
      !dataSelection.dimension ||
      !eeaData
    ) {
      return undefined;
    }

    const rawXSeries = eeaData?.data?.[dataSelection.xSeries];
    // can't quite make (string|number)[] become (number[]|string[]) here.
    const xSeries = Array.from(new Set(rawXSeries as any));
    const newXSeries: Series = {
      name: dataSelection.xSeries,
      values: xSeries as any,
    };

    if (dataSelection.ySeries && dataSelection.ySeries.length > 0) {
      const result = dataSelection.ySeries.map((series: SelectedDimension) => {
        const toFilter: number[] | string[] = Array.isArray(
          eeaData.data?.[dataSelection.measure],
        )
          ? eeaData.data[dataSelection.measure]
          : [];

        const currentSeries = (toFilter as any[]).filter<string | number>(
          (_, index): _ is any =>
            eeaData.data[dataSelection.dimension][index] === series.Name,
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
      ySeries: selectedDimensions,
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
