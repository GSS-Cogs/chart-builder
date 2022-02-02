const basicSection = {
  name: "BasicChartProperties",
  displayName: "Title and summary",
  properties: [
    {
      name: "chartTitle",
      displayName: "Chart title",
      type: "text",
      value: "Figure 1: Covid-19 Triple Vaccination by UK Nation",
      output: "html",
    },
    {
      name: "showTitle",
      displayName: "Show title",
      type: "checkbox",
      value: true,
      output: "html",
    },
    {
      name: "statisticalSummary",
      displayName: "Statistical summary",
      type: "text",
      value:
        "The data show that over 50% of the population in all four UK nations were triple vaccinated by December 2021.",
      output: "html",
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
      displayName: "Interactivity",
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
      value: "Percentage of people vaccinated",
      output: "svg",
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
