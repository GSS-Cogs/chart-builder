import { INTERVAL_STYLES } from "../constants/Chart-constants";

interface DataColumn {
  name: string;
  values: string[] | number[];
}

interface ChartData {
  xValues: DataColumn[];
  yValues: DataColumn[];
}

interface SelectedDimension {
  name: string;
  displayName: string;
  color: string;
  intervalColor: string;
  dashStyle: "none" | "dash" | "dot";
  intervalStyle: typeof INTERVAL_STYLES[number];
  lowerBoundSeries: string;
  upperBoundSeries: string;
}

interface DataSelection {
  xValues: string;
  measure: string;
  dimension: string;
  yValues: SelectedDimension[];
}

type TidyData = object[];

interface EeaData {
  "@id": string;
  data: {
    pk: number[];
    [col: string]: number[] | string[];
  };
}

// should be whatever shape of props react-plotly receives.
type PlotlyChartDefinition = object;

export interface ChartProperty<Value> {
  name: string;
  displayName: string;
  defaultValue: Value;
  showPropertyLabel?: boolean;
}

export interface ChartPropertyRadio<Value> extends ChartProperty<Value> {
  type: "radio";
  options: string[];
}

export interface ChartPropertyRange<Value> extends ChartProperty<Value> {
  type: "range";
  min: number;
  max: number;
  step: number;
}

export interface ChartPropertyCheckbox extends ChartProperty<boolean> {
  type: "checkbox";
}

export interface ChartPropertyText<Value> extends ChartProperty<Value> {
  type: "text" | "text-multi";
}

export type ChartPropertySchema =
  | ChartPropertyRadio<number | string>
  | ChartPropertyCheckbox
  | ChartPropertyText<number | string>
  | ChartPropertyRange<string>;

interface ChartPropertySchemaSection {
  name: string;
  displayName: string;
  sectionFor: string;
  properties: ChartPropertySchema[];
}

interface ChartDataProvider {
  columnNames: string[];
  availableDimensions: string[];
  chartData: ChartData | undefined;
}

export type {
  DataColumn,
  ChartData,
  SelectedDimension,
  DataSelection,
  TidyData,
  EeaData,
  PlotlyChartDefinition,
  ChartPropertySchemaSection,
  ChartDataProvider,
};
