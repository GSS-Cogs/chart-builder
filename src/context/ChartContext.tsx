import React, { Dispatch, SetStateAction } from "react";
import {
  ChartPropertySection,
  DataSelection,
  EeaData,
  PlotlyChartDefinition,
  SelectedDimension
} from "./types";

export interface ChartContextState {
  // what actually gets passed to plotly; generated by chart-builder from
  // the raw data and the chart properties.
  chartDefinition: PlotlyChartDefinition;
  setChartDefinition: Dispatch<SetStateAction<PlotlyChartDefinition>>;

  // a mix of chart property schema and values; defines what fields are presented
  // in the props editor, and has the values stored inline in the definition too.
  chartProperties: ChartPropertySection[];
  setChartProperties: Dispatch<SetStateAction<ChartPropertySection[]>>;

  // just a simple display var
  selectedFilename: string;
  setSelectedFilename: Dispatch<SetStateAction<string>>;

  dataSelection: DataSelection | undefined;
  setDataSelection: Dispatch<SetStateAction<DataSelection | undefined>>;

  // contains the selected dimensions
  selectedDimensions: SelectedDimension[];
  setSelectedDimensions: Dispatch<SetStateAction<SelectedDimension[]>>;

  // UI state to ensure unique columns are selected in selectedDimensions
  selectedColumns: string[];
  setSelectedColumns: Dispatch<SetStateAction<string[]>>;

  mapData: any,
  setMapData: any,
  geoJson: any,
  setGeoJson: any,

  sparqlQuery: string;
  setSparqlQuery: Dispatch<SetStateAction<string>>;
}

export interface ChartContextProps {
  chartDefinition: PlotlyChartDefinition;

  chartProperties: ChartPropertySection[];
  setChartProperties: Dispatch<SetStateAction<ChartPropertySection[]>>;

  selectedFilename: string;
  setSelectedFilename: Dispatch<SetStateAction<string>>;

  selectedDimensions: SelectedDimension[];
  setSelectedDimensions: Dispatch<SetStateAction<SelectedDimension[]>>;

  dataSelection: DataSelection | undefined;
  setDataSelection: Dispatch<SetStateAction<DataSelection | undefined>>;

  selectedColumns: string[];
  setSelectedColumns: Dispatch<SetStateAction<string[]>>;

  // generated from the data
  columnNames: string[];
  // when dataSelection. (xSeries, measure, dimension) are selected, gets populated
  // with the available dimensions
  availableDimensions: string[];

  mapData: any,
  setMapData: any,
  geoJson: any,
  setGeoJson: any,

  importCsvData: (data: File | string, filename: string) => void;
  importEeaData: (data: EeaData) => void;

  sparqlQuery: string;
  setSparqlQuery: Dispatch<SetStateAction<string>>;
}

const ChartContext = React.createContext<ChartContextProps>(
  {} as ChartContextProps,
);

export default ChartContext;
