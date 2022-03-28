import ChartContext from "./ChartContext";
import { ReactNode, useCallback, useEffect, useState } from "react";
import initialChartProperties from "./initialChartProperties";
import useChartCsvData from "./useChartCsvData";
import { Series, ChartData, SelectedDimension, DataSelection } from "./types";
import { getMapData } from "../services/map-data/mapDataLoader";
import { getGeoJson } from "../services/map-data/geoJsonLoader";
import LOCAL_AUTHORITY_BOUNDARY_QUERY from "../services/map-data/geoJsonQueries";

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
  const [chartProperties, setChartProperties] = useState(
    initialChartProperties,
  );
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
  const [mapData, setMapData] = useState<any>([]);
  const [geoJson, setGeoJson] = useState<any>([]);
  const [sparqlQuery, setSparqlQuery] = useState<string>("");

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
    mapData,
    setMapData,
    geoJson,
    setGeoJson,
    sparqlQuery,
    setSparqlQuery,
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
    mapData,
    setMapData,
    geoJson,
    setGeoJson,
    sparqlQuery,
    setSparqlQuery,
  } = state;

  useEffect(() => {
    if (tidyData.length > 0) transformTidyData();
  }, [tidyData]);

  useEffect(() => {
    if (sparqlQuery === "") return;
    const loadMapData = async () => {
      try {
        const mapData = await getMapData(sparqlQuery);
        const geoJson = await getGeoJson(LOCAL_AUTHORITY_BOUNDARY_QUERY);
        setGeoJson(geoJson);
        setMapData(mapData);
        setChartData(undefined);
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
      setMapData([]);
      setSparqlQuery("");
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
