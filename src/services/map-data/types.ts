export type Dataset = {
  id: string;
  uri?: string;
  onPmd?: boolean;
  datasetInfo?: DatasetInfo;
};

export enum RangeMode {
  NORMAL = "normal",
  TO_ZERO = "tozero",
  NON_NEGATIVE = "nonnegative",
}

export type HTML = string;

export type Chart = {
  id: string;
  title: string;
  description?: HTML;
  type: string;
  yAxisTitle?: string;
  yAxisFormat?: string; // format string for hover text
  xAxisTitle?: string;
  xAxisFormat?: string; // ditto
  rangeMode?: RangeMode;
  footnotes?: Array<HTML>;
  source: Array<Dataset>;
  height?: number;
  leftMargin?: number;
  marginPad?: number;
  legendPosition?: string;
  showLegend?: boolean;
  labelTop?: number;
  yShowticklabels?: boolean;
};

export type URI = string;

export type Publisher = {
  uri: URI;
  label: string;
  alt?: string;
};

export type DatasetInfo = {
  title: string;
  landingPage?: URI;
  publisher?: Publisher;
  pmd?: URI;
  issued?: string;
};
