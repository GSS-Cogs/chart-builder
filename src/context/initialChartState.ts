const basicSection = {
  name: "BasicChartProperties",
  displayName: "Title",
  properties: [
    {
      name: "chartTitle",
      displayName: "Chart title",
      type: "text",
      value: "Covid-19 Triple Vaccination by UK Nation",
    },
    {
      name: "showTitle",
      displayName: "Show title",
      type: "checkbox",
      value: true,
    },
  ],
};

const legendSection = {
  name: "LegendSection",
  displayName: "Legend",
  properties: [
    {
      name: "showLegend",
      displayName: "Show legend",
      type: "checkbox",
      value: true,
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
    },
  ],
};

const chartTypesSection = {
  name: "ChartTypes",
  displayName: "Chart type",
  properties: [
    {
      name: "chartType",
      displayName: "Chart type",
      type: "radio",
      options: ["Line", "Bar", "Stacked Bar"],
      value: "Line",
    },
  ],
};

const interactivitySection = {
  name: "Interactivity",
  displayName: "Interactivity",
  properties: [
    {
      name: "interactivity",
      displayName: "Interactivity",
      type: "radio",
      options: ["x+y", "none"],
      value: "none",
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
      value: "Week beginning",
    },
    {
      name: "xAxisTickAngle",
      displayName: "Tick angle (degrees)",
      type: "radio",
      options: ["0", "45", "-45", "-90"],
      value: "-45",
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
      value: "Percentage of people vaccinated",
    },
  ],
};

const initialChartState = [
  basicSection,
  chartTypesSection,
  xAxisSection,
  yAxisSection,
  interactivitySection,
  GridlinesSection,
  legendSection,
];

export default initialChartState;
