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

    globalYMin = Math.min(globalYMin, ...yValues);
    globalYMax = Math.max(globalYMax, ...yValues);
  });
  return [globalYMin, globalYMax];
};

const flattenChartProperties = (chartProperties: any): any => {
  let chartProps: any = {};

  chartProperties.forEach((section: any) => {
    section.properties.forEach((property: any) => {
      chartProps = { ...chartProps, [property.name]: property.value };
    });
  });
  return chartProps;
};

const calculateXRange = (chartData: any): any => {
  return [0, chartData!.xSeries.values.length];
};

export { colors, calculateYRange, calculateXRange, flattenChartProperties };
