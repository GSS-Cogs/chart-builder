import ChartContext, {ChartContextProps, ChartContextState} from "./ChartContext";
import {ReactNode, useCallback, useEffect, useMemo, useState,} from "react";
import initialChartProperties from "./initialChartProperties";
import useChartCsvData from "./useChartCsvData";
import {
  ChartData,
  DataSelection,
  EeaData,
  PlotlyChartDefinition,
  SelectedDimension,
  Series,
  TidyData,
  ChartDataProvider
} from "./types";
import { getMapData } from "../services/map-data/mapDataLoader";
import { getGeoJson } from "../services/map-data/geoJsonLoader";
import LOCAL_AUTHORITY_BOUNDARY_QUERY from "../services/map-data/geoJsonQueries";
import { GeoJSON } from "geojson";

import {
  arrayColumn,
  getDistinctValues,
} from "../helper-functions/array-helpers";

import { NO_FILE_SELECTED_TEXT } from "../components/constants/Common-constants";
import updateChartDefinition from "../plotly/chartDefinition";

interface Props {
  children: ReactNode;
}

export function useChartContextState(): ChartContextState {
  const [chartDefinition, setChartDefinition] = useState<PlotlyChartDefinition>(
      {}
  );
  const [chartProperties, setChartProperties] = useState(
      initialChartProperties,
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
  const [sparqlQuery, setSparqlQuery] = useState<string>("");

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
    sparqlQuery,
    setSparqlQuery,
  };
}

function useTidyDataToChartContext(tidyData: TidyData, dataSelection: DataSelection | undefined, dimensionValue: string): ChartDataProvider {
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
  }, [tidyData, dataSelection]);

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

function useEeaConnectorData(eeaData: EeaData | null, dataSelection: DataSelection | undefined, dimensionValue: string): ChartDataProvider {
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

    const xSeries = Array.from(new Set(eeaData?.data?.[dataSelection.xSeries]));
    const newXSeries: Series = {
      name: dataSelection.xSeries,
      values: xSeries,
    };

    if (dataSelection.ySeries && dataSelection.ySeries.length > 0) {
      const result = dataSelection.ySeries.map((series: SelectedDimension) => {
        const toFilter: number[]|string[] = Array.isArray(eeaData.data?.[dataSelection.measure])
          ? eeaData.data[dataSelection.measure]
          : [];

        const currentSeries = (toFilter as any[]).filter<string|number>((_, index): _ is any => eeaData.data[dataSelection.dimension][index] === series.Name);

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
    if (dimensionValue != '' && Array.isArray(vals)) {
      return Array.from(new Set(vals as string[]));
    }
    else return []
  }, [dimensionValue, eeaData]);

  return {
    columnNames,
    chartData,
    availableDimensions,
  }
}

export function useChartContext(state: ChartContextState): ChartContextProps {
  const [dataSource, setDataSource] = useState<'' | 'tidy' | 'eea'>('');
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
    sparqlQuery,
    setSparqlQuery,
  } = state;

  const dimensionValue = dataSelection?.dimension || '';

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

  let chartData: ChartData | undefined = undefined, columnNames: string[] = [], availableDimensions: string[] = [];

  if (dataSource === 'tidy') {
    chartData = tidyDataChartData;
    availableDimensions = tidyDataAvailableDimensions;
    columnNames = tidyDataColumnNames;
  } else if (dataSource === 'eea') {
    chartData = eeaDataChartData;
    columnNames = eeaDataColumnNames;
    availableDimensions = eeaDataAvailableDimensions;
  }

  useEffect(() => {
    if (sparqlQuery === "") return;
    const loadMapData = async () => {
      try {
        const mapData = await getMapData(sparqlQuery);
        const geoJson = await getGeoJson(LOCAL_AUTHORITY_BOUNDARY_QUERY);
        setGeoJson(geoJson);
        setMapData(mapData);
        // todo: if dataSource != 'tidy' in the useTidyData.. hook, clear any temp state
        // todo: same in useEeaConnectorData
        // todo: same in any choropleth loading areas
      } catch (e) {
        console.error(e);
      }
    };
    loadMapData();
  }, [sparqlQuery]);

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

  const { importCsvData: importCsvHook } = useChartCsvData(setTidyData, setSelectedFilename);

  const importCsvData = useCallback(
    (data: File | string, filename: string) => {
      setDataSource('tidy');
      importCsvHook(data, filename);
    },
    [setDataSource, importCsvHook]
  );

  const importEeaData = useCallback(
    (data: EeaData) => {
      setDataSource('eea');
      importEeaDataHook(data);
    },
    [setDataSource, importEeaDataHook]
  );

  return {
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
    mapData,
    setMapData,
    geoJson,
    setGeoJson,
    sparqlQuery,
    setSparqlQuery,
  };
}

const ChartContextProvider = ({ children }: Props): JSX.Element => {
  const state = useChartContextState();
  const hook = useChartContext(state);

  return <ChartContext.Provider value={hook}>{children}</ChartContext.Provider>;
};

export default ChartContextProvider;
