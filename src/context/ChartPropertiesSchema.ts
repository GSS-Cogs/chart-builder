import {ChartPropertySchemaSection} from "./types";

const legendSection: ChartPropertySchemaSection = {
  name: "LegendSection",
  displayName: "Legend",
  sectionFor: "charts",
  properties: [
    {
      name: "showLegend",
      displayName: "Show legend",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "xAxisOffset",
      displayName: "X axis offset",
      type: "text",
      defaultValue: -0.18,
    },
  ],
};

const GridlinesSection: ChartPropertySchemaSection = {
  name: "Gridlines",
  displayName: "Gridlines",
  sectionFor: "charts",
  properties: [
    {
      name: "showGridLines",
      displayName: "Show gridlines",
      type: "checkbox",
      defaultValue: true,
    },
  ],
};

const chartTypesSection: ChartPropertySchemaSection = {
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
      defaultValue: "Line",
    },
  ],
};

const interactivitySection: ChartPropertySchemaSection = {
  name: "Interactivity",
  displayName: "Interactivity",
  sectionFor: "all",
  properties: [
    {
      name: "interactivity",
      displayName: "Series tooltip",
      type: "radio",
      options: ["x+y", "none"],
      defaultValue: "x+y",
    },
    {
      name: "hoverInfoUnit",
      displayName: "Hoverinfo unit",
      type: "text",
      defaultValue: "",
    },
  ],
};

const xAxisSection: ChartPropertySchemaSection = {
  name: "xAxisProperties",
  displayName: "X axis",
  sectionFor: "charts",
  properties: [
    {
      name: "xAxisTitle",
      displayName: "Title",
      type: "text",
      defaultValue: "",
    },
    {
      name: "xTickLabelMaxLength",
      displayName: "X axis tick label max. length",
      type: "text",
      defaultValue: 40,
    },
    {
      name: "xAxisTickAngle",
      displayName: "X axis label rotation",
      type: "radio",
      options: ["0", "45", "-45", "-90"],
      defaultValue: "-45",
    },
  ],
};

const yAxisSection: ChartPropertySchemaSection = {
  name: "yAxisProperties",
  displayName: "Y axis",
  sectionFor: "charts",
  properties: [
    {
      name: "yAxisTitle",
      displayName: "Title",
      type: "text",
      defaultValue: "",
    },
  ],
};

const chartDimensionsSection: ChartPropertySchemaSection = {
  name: "chartDimensionProperties",
  displayName: "Chart dimensions",
  sectionFor: "all",
  properties: [
    {
      name: "height",
      displayName: "Height(px)",
      type: "text",
      defaultValue: "550",
    },
    {
      name: "marginLeft",
      displayName: "Left margin(px)",
      type: "text",
      defaultValue: "70",
    },
    {
      name: "marginRight",
      displayName: "Right margin(px)",
      type: "text",
      defaultValue: "0",
    },
    {
      name: "marginTop",
      displayName: "Top margin(px)",
      type: "text",
      defaultValue: "0",
    },
    {
      name: "marginBottom",
      displayName: "Bottom margin(px)",
      type: "text",
      defaultValue: "70",
    },
  ],
};

const orientationSection: ChartPropertySchemaSection = {
  name: "orientationProperties",
  displayName: "Chart orientation",
  sectionFor: "charts",
  properties: [
    {
      name: "orientation",
      displayName: "Bar chart orientation",
      type: "radio",
      options: ["vertical", "horizontal"],
      defaultValue: "vertical",
    },
  ],
};

const colorBarSection: ChartPropertySchemaSection = {
  name: "colorBarProperties",
  displayName: "Colorbar",
  sectionFor: "maps",
  properties: [
    {
      name: "colorBarTitle",
      displayName: "Title",
      type: "text",
      defaultValue: "",
    },
    {
      name: "colorBarWidth",
      displayName: "Width(px)",
      type: "text",
      defaultValue: "25",
    },
    {
      name: "colorscale",
      displayName: "Color scale",
      type: "radio",
      options: ["Sequential", "Diverging"],
      defaultValue: "Sequential",
    },
    {
      name: "autocolorscale",
      displayName: "Auto color scale",
      type: "checkbox",
      defaultValue: false,
    },
  ],
};

const chartPropertiesSchema: ChartPropertySchemaSection[] = [
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

export default chartPropertiesSchema;
