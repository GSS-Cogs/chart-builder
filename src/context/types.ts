import {ChartProperty} from "./initialChartProperties";

interface Series {
  name: string;
  values: string[] | number[];
}

interface ChartData {
  xSeries: Series;
  ySeries: Series[];
}

interface SelectedDimension {
  Name: string;
  DisplayName: string;
}

interface DataSelection {
  xSeries: string;
  measure: string;
  dimension: string;
  ySeries: SelectedDimension[];
}

type TidyData = object[];

interface EeaData {
  "@id": string;
  "data": {
    pk: number[];
    [col: string]: number[] | string[];
  }
}

// should be whatever shape of props react-plotly receives.
type PlotlyChartDefinition = object;

interface ChartPropertySection {
  name: string,
  displayName: string,
  sectionFor: string,
  properties: ChartProperty[]
}

export type {
  Series,
  ChartData,
  SelectedDimension,
  DataSelection,
  TidyData,
  EeaData,
  PlotlyChartDefinition,
  ChartPropertySection
};

