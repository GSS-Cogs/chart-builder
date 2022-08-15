import React, { Dispatch, SetStateAction } from "react";
import {
  DataSelection,
  EeaData,
  PlotlyChartDefinition,
  SelectedSeries,
} from "./types";

export interface ChartPropertySectionValues {
  [propertyName: string]: number | string | boolean;
}

export interface ChartPropertyValues {
  [section: string]: ChartPropertySectionValues;
}

import { GeoJSON } from "geojson";

export interface ChartContextState {
  // what actually gets passed to plotly; generated by chart-builder from
  // the raw data and the chart properties.
  chartDefinition: PlotlyChartDefinition;
  setChartDefinition: Dispatch<SetStateAction<PlotlyChartDefinition>>;

  // chart property values.
  // The fields are all statically defined in ChartPropertiesSchema.
  chartProperties: ChartPropertyValues;
  setChartProperties: (
    section: string,
    field: string,
    value: boolean | number | string,
  ) => void;

  // just a simple display var
  selectedFilename: string;
  setSelectedFilename: Dispatch<SetStateAction<string>>;

  dataSelection: DataSelection | undefined;
  setDataSelection: Dispatch<SetStateAction<DataSelection | undefined>>;

  // contains the selected series
  selectedSeries: SelectedSeries[];
  setSelectedSeries: Dispatch<SetStateAction<SelectedSeries[]>>;

  // UI state to ensure unique columns are selected in selectedDimensions
  selectedColumns: string[];
  setSelectedColumns: Dispatch<SetStateAction<string[]>>;

  mapData: any;
  setMapData: any;
  geoJson: GeoJSON;
  setGeoJson: Dispatch<SetStateAction<GeoJSON>>;
}

export interface ChartContextProps {
  chartDefinition: PlotlyChartDefinition;
  setChartDefinition: Dispatch<SetStateAction<PlotlyChartDefinition>>;

  chartProperties: ChartPropertyValues;
  setChartProperties: (
    section: string,
    field: string,
    value: boolean | number | string,
  ) => void;

  selectedFilename: string;
  setSelectedFilename: Dispatch<SetStateAction<string>>;

  selectedSeries: SelectedSeries[];
  setSelectedSeries: Dispatch<SetStateAction<SelectedSeries[]>>;

  dataSelection: DataSelection | undefined;
  setDataSelection: Dispatch<SetStateAction<DataSelection | undefined>>;

  selectedColumns: string[];
  setSelectedColumns: Dispatch<SetStateAction<string[]>>;

  // generated from the data
  columnNames: string[];

  // when dataSelection. (category, measure, dimension) are selected, gets populated
  // with the available series
  availableSeries: string[];

  mapData: any;
  setMapData: any;
  geoJson: GeoJSON;
  setGeoJson: Dispatch<SetStateAction<GeoJSON>>;

  importCsvData: (data: File | string, filename: string) => void;
  importEeaData: (data: EeaData) => void;
}

const ChartContext = React.createContext<ChartContextProps>(
  {} as ChartContextProps,
);

export default ChartContext;
