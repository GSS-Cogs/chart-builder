const basicSection = {
  name: "BasicChartProperties",
  displayName: "Title and summary",
  properties: [
    {
      name: "chartTitle",
      displayName: "Chart title",
      type: "text-multi",
      value:
        "Greenhouse gas emissions on a territorial, residence and carbon footprint basis: UK, 1990 to 2019 and provisional 2020 (million tonnes of carbon dioxide equivalent)",
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
      type: "text-multi",
      value:
        "There are three key official measures of UK greenhouse gas (GHG) emissions. In 2018, the latest year that all three measures are available, territorial emissions were 468 million tonnes of carbon dioxide equivalent (Mt CO2e), residence emissions 569 Mt CO2e and footprint emissions 703 Mt CO2e.",
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
      displayName: "Height",
      type: "text",
      value: "450",
      output: "svg",
    },
    {
      name: "width",
      displayName: "Width",
      type: "text",
      value: "700",
      output: "svg",
    },
  ],
};

const footnotesSection = {
  name: "footnoteProperties",
  displayName: "Footnotes",
  properties: [
    {
      name: "footnotes",
      displayName: "Footnotes",
      type: "text-multi",
      value: `Territorial estimates are published by the Department for Business, Energy and Industrial Strategy (BEIS), are used to monitor net zero and other UK-wide targets. These estimates include emissions produced within the UK’s geographical borders.

In accordance with international reporting protocols, each of these gases are weighted by their global warming potential (GWP), so that total greenhouse gas emissions can be reported on a consistent basis (in CO2 equivalent units).`,

      output: "html",
    },
  ],
};

const initialChartState = [
  basicSection,
  chartTypesSection,
  chartDimensionsSection,
  xAxisSection,
  yAxisSection,
  interactivitySection,
  GridlinesSection,
  legendSection,
  footnotesSection,
];

export default initialChartState;
