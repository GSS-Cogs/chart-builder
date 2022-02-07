const legendSection = {
  name: "LegendSection",
  displayName: "Legend",
  properties: [
    {
      name: "showLegend",
      displayName: "Show legend",
      type: "checkbox",
      value: true,
      output: "svg",
    },
  ],
};

const GridlinesSection = {
  name: "Gridlines",
  displayName: "Gridlines",
  properties: [
    {
      name: "showGridLines",
      displayName: "Show gridlines",
      type: "checkbox",
      value: true,
      output: "svg",
    },
  ],
};

const chartTypesSection = {
  name: "ChartTypes",
  displayName: "Chart type",
  properties: [
    {
      name: "chartType",
      displayName: "",
      showPropertyLabel: false,
      type: "radio",
      options: ["Line", "Bar", "Stacked Bar"],
      value: "Line",
      output: "svg",
    },
  ],
};

const interactivitySection = {
  name: "Interactivity",
  displayName: "Interactivity",
  properties: [
    {
      name: "interactivity",
      displayName: "Series tooltip",
      type: "radio",
      options: ["x+y", "none"],
      value: "none",
      output: "svg",
    },
  ],
};

const xAxisSection = {
  name: "xAxisProperties",
  displayName: "X axis",
  properties: [
    {
      name: "xAxisTitle",
      displayName: "Title",
      type: "text",
      value: "Week starting",
      output: "svg",
    },
    {
      name: "xAxisTickAngle",
      displayName: "X axis label rotation",
      type: "radio",
      options: ["0", "45", "-45", "-90"],
      value: "-45",
      output: "svg",
    },
  ],
};

const yAxisSection = {
  name: "yAxisProperties",
  displayName: "Y axis",
  properties: [
    {
      name: "yAxisTitle",
      displayName: "Title",
      type: "text",
      value: "Mt CO2e",
      output: "svg",
    },
  ],
};

const chartDimensionsSection = {
  name: "chartDimensionProperties",
  displayName: "Chart dimensions",
  properties: [
    {
      name: "height",
      displayName: "Height(px)",
      type: "text",
      value: "450",
      output: "svg",
    },
    {
      name: "width",
      displayName: "Width(px)",
      type: "text",
      value: "900",
      output: "svg",
    },
  ],
};

const initialChartState = [
  chartTypesSection,
  chartDimensionsSection,
  xAxisSection,
  yAxisSection,
  interactivitySection,
  GridlinesSection,
  legendSection,
];

export default initialChartState;
