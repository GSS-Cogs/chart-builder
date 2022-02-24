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

const flattenChartProperties = (chartProperties: any): any => {
  let chartProps: any = {};

  chartProperties.forEach((section: any) => {
    section.properties.forEach((property: any) => {
      chartProps = { ...chartProps, [property.name]: property.value };
    });
  });

  // Infer the barmode from chartType
  // If 'Bar' then group, otherwise it's a 'Stacked Bar' so stack
  // For bar charts with only one trace barmode will have no effect
  // For non bar charts (e.g. line charts) barmode will have no effect
  // Note: barmode is set in the plotly layout (layout.ts)
  chartProps.chartType === "Bar"
    ? (chartProps.barmode = "group")
    : (chartProps.barmode = "stack");

  return chartProps;
};

export { colors, flattenChartProperties };
