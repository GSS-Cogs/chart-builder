const legendSection = {
  name: "LegendSection",
  displayName: "Legend",
  sectionFor: "charts",
  properties: [
    {
      name: "showLegend",
      displayName: "Show legend",
      type: "checkbox",
      value: true,
      output: "svg",
    },
    {
      name: "xAxisOffset",
      displayName: "X axis offset",
      type: "text",
      value: -0.25,
      output: "svg",
    },
  ],
};

const GridlinesSection = {
  name: "Gridlines",
  displayName: "Gridlines",
  sectionFor: "charts",
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
  name: "chartTypes",
  displayName: "Chart type",
  sectionFor: "all",
  properties: [
    {
      name: "chartType",
      displayName: "",
      showPropertyLabel: false,
      type: "radio",
      options: ["Line", "Bar", "Stacked Bar", "Map"],
      value: "Line",
      output: "svg",
    },
  ],
};

const interactivitySection = {
  name: "Interactivity",
  displayName: "Interactivity",
  sectionFor: "all",
  properties: [
    {
      name: "interactivity",
      displayName: "Series tooltip",
      type: "radio",
      options: ["x+y", "none"],
      value: "x+y",
      output: "svg",
    },
    {
      name: "hoverInfoUnit",
      displayName: "Hoverinfo unit",
      type: "text",
      value: "%",
      output: "svg",
    },
  ],
};

const xAxisSection = {
  name: "xAxisProperties",
  displayName: "X axis",
  sectionFor: "charts",
  properties: [
    {
      name: "xAxisTitle",
      displayName: "Title",
      type: "text",
      value: "Week starting",
      output: "svg",
    },
    {
      name: "xTickLabelMaxLength",
      displayName: "X axis tick label max. length",
      type: "text",
      value: 40,
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
  sectionFor: "charts",
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
  sectionFor: "all",
  properties: [
    {
      name: "height",
      displayName: "Height(px)",
      type: "text",
      value: "700",
      output: "svg",
    },
    {
      name: "marginLeft",
      displayName: "Left margin(px)",
      type: "text",
      value: "0",
      output: "svg",
    },
    {
      name: "marginRight",
      displayName: "Right margin(px)",
      type: "text",
      value: "0",
      output: "svg",
    },
    {
      name: "marginTop",
      displayName: "Top margin(px)",
      type: "text",
      value: "0",
      output: "svg",
    },
    {
      name: "marginBottom",
      displayName: "Bottom margin(px)",
      type: "text",
      value: "0",
      output: "svg",
    },
  ],
};

const orientationSection = {
  name: "orientationProperties",
  displayName: "Chart orientation",
  sectionFor: "charts",
  properties: [
    {
      name: "orientation",
      displayName: "Bar chart orientation",
      type: "radio",
      options: ["vertical", "horizontal"],
      value: "vertical",
      output: "svg",
    },
  ],
};

const colorBarSection = {
  name: "colorBarProperties",
  displayName: "Colorbar",
  sectionFor: "maps",
  properties: [
    {
      name: "colorBarTitle",
      displayName: "Title",
      type: "text",
      value: "Percentage <br>of area",
      output: "svg",
    },
    {
      name: "colorBarWidth",
      displayName: "Width(px)",
      type: "text",
      value: "25",
      output: "svg",
    },
    {
      name: "colorscale",
      displayName: "Color scale",
      type: "radio",
      options: ["Sequential", "Diverging"],
      value: "Sequential",
      output: "svg",
    },
    {
      name: "autocolorscale",
      displayName: "Auto color scale",
      type: "checkbox",
      value: false,
      output: "svg",
    },
  ],
};

const initialChartState = [
  chartTypesSection,
  orientationSection,
  chartDimensionsSection,
  xAxisSection,
  yAxisSection,
  GridlinesSection,
  legendSection,
  colorBarSection,
  interactivitySection,
];

export default initialChartState;
