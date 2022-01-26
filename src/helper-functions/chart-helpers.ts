import { extent } from "d3-array";

interface Series {
  name: string;
  values: string[];
}

const colors = ["#a05195", "#f95d6a", "#ffa600", "#003f5c"];

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

export { colors, calculateYRange, flattenChartProperties };
