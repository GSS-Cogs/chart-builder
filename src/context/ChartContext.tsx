import React, {Dispatch, SetStateAction} from "react";
import {DataSelection, EeaData, SelectedDimension} from "./ChartContextProvider";
import {ChartPropertySection} from "./initialChartProperties";

export type TidyData = object[];

// should be whatever shape of props react-plotly receives.
export type PlotlyChartDefinition = object;

export type ChartContextState = {
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
  selectedDimensions: SelectedDimension[],
  setSelectedDimensions: Dispatch<SetStateAction<SelectedDimension[]>>,

  // UI state to ensure unique columns are selected in selectedDimensions
  selectedColumns: string[],
  setSelectedColumns: Dispatch<SetStateAction<string[]>>,
}

export interface ChartContextProps extends ChartContextState {
  // generated from the data
  columnNames: string[];
  // when dataSelection. (xSeries, measure, dimension) are selected, gets populated
  // with the available dimensions
  availableDimensions: string[];

  importCsvData: (data: File | string, filename: string) => void;
  importEeaData: (data: EeaData) => void;
}

const ChartContext = React.createContext<ChartContextProps>(
  {} as ChartContextProps,
);

export default ChartContext;
