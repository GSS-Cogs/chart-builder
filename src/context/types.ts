interface Series {
  name: string;
  values: string[];
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

export type { Series, ChartData, SelectedDimension, DataSelection };
