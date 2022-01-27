import { extent } from "d3-array";

interface Series {
  name: string;
  values: string[];
}

const colors = [
  "rgb(29, 112, 184)",
  "rgb(244, 119, 56)",
  "rgb(0, 112, 60)",
  "rgb(212, 53, 28)",
  "rgb(111, 114, 175)",
  "rgb(40, 161, 151)",
  "rgb(213, 56, 128)",
  "rgb(80, 90, 95)",
];

const calculateYRange = (ySeries: Series[]): any => {
  let globalYMin = Number.MAX_SAFE_INTEGER;
  let globalYMax = Number.MIN_SAFE_INTEGER;
  const yRange = ySeries.forEach((series: Series) => {
    // convert string values to numbers
    const yValues = series.values.map(Number);
    const yExtent = extent(yValues);

    globalYMin = Math.min(globalYMin, yExtent[0]!);
    globalYMax = Math.max(globalYMax, yExtent[1]!);
  });
  return [globalYMin, globalYMax];
};

const flattenChartProperties = (chartProperties: any): any => {
  let flatProps: any = {};
  chartProperties.forEach((section: any) => {
    section.properties.forEach((property: any) => {
      flatProps = { ...flatProps, [property.name]: property.value };
    });
  });
  return flatProps;
};

const calculateXRange = (chartData: any): any => {
  return [0, chartData!.xSeries.values.length];
};

export { colors, calculateYRange, calculateXRange, flattenChartProperties };
