import { ChartPropertySchemaSection } from "./types";

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
      defaultValue: -0.11,
    },
    {
      name: "mode",
      displayName: "Lines and markers",
      type: "radio",
      options: ["lines", "lines+markers", "markers"],
      defaultValue: "lines",
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

const exploreDataSection: ChartPropertySchemaSection = {
  name: "exploreDataProperties",
  displayName: "Explore data",
  sectionFor: "charts",
  properties: [
    {
      name: "exploreDataLink",
      displayName: "Link",
      type: "text",
      defaultValue: "",
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
      options: [
        "Line",
        "Bar",
        "Stacked Bar",
        "Compact Bar",
        "Map",
        "Filled Area",
        "Stacked Filled Area",
        "Table",
      ],
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
      name: "xAxisGridLines",
      displayName: "Show gridlines",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "xAxisType",
      displayName: "Type",
      type: "radio",
      options: ["auto", "linear", "log", "date", "category", "multicategory"],
      defaultValue: "auto",
    },
    {
      name: "xAxisRangeMode",
      displayName: "Range mode",
      type: "radio",
      options: ["normal", "tozero", "nonnegative"],
      defaultValue: "normal",
    },
    {
      name: "xAxisTickAngle",
      displayName: "Label rotation",
      type: "radio",
      options: ["0", "45", "-45", "-90"],
      defaultValue: "0",
    },
    {
      name: "xAxisTickMode",
      displayName: "Tick label mode",
      type: "radio",
      options: ["auto", "manual"],
      defaultValue: "auto",
    },
    {
      name: "xAxisTickLabelLength",
      displayName: "Tick label max. length",
      type: "text",
      defaultValue: 40,
    },
    {
      name: "xAxisTickInterval",
      displayName: "Tick interval",
      type: "text",
      defaultValue: 1,
    },
    {
      name: "xAxisFirstTickLabel",
      displayName: "First tick label",
      type: "text",
      defaultValue: "",
    },
    {
      name: "xAxisLastTickLabel",
      displayName: "Last tick label",
      type: "text",
      defaultValue: "",
    },
    {
      name: "xAxisNTicks",
      displayName: "Show N ticks",
      type: "text",
      defaultValue: "",
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
    {
      name: "yAxisGridLines",
      displayName: "Show gridlines",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "yAxisType",
      displayName: "Type",
      type: "radio",
      options: ["auto", "linear", "log", "date", "category", "multicategory"],
      defaultValue: "auto",
    },
    {
      name: "yAxisRangeMode",
      displayName: "Range mode",
      type: "radio",
      options: ["normal", "tozero", "nonnegative"],
      defaultValue: "normal",
    },
    {
      name: "yAxisTickAngle",
      displayName: "Label rotation",
      type: "radio",
      options: ["0", "45", "-45", "-90"],
      defaultValue: "0",
    },
    {
      name: "yAxisTickMode",
      displayName: "Tick label mode",
      type: "radio",
      options: ["auto", "manual"],
      defaultValue: "auto",
    },
    {
      name: "yAxisTickLabelLength",
      displayName: "Tick label max. length",
      type: "text",
      defaultValue: 40,
    },
    {
      name: "yAxisTickInterval",
      displayName: "Tick interval",
      type: "text",
      defaultValue: 1,
    },
    {
      name: "yAxisFirstTickLabel",
      displayName: "First tick label",
      type: "text",
      defaultValue: "",
    },
    {
      name: "yAxisLastTickLabel",
      displayName: "Last tick label",
      type: "text",
      defaultValue: "",
    },
    {
      name: "yHoverInfoPrecision",
      displayName: "Hoverinfo decimal precision",
      type: "text",
      defaultValue: "2",
    },
    {
      name: "yAxisNTicks",
      displayName: "Show N ticks",
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
      defaultValue: "400",
    },
    {
      name: "marginLeft",
      displayName: "Left margin(px)",
      type: "text",
      defaultValue: "50",
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
      defaultValue: "0",
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

const compactBarChartSection: ChartPropertySchemaSection = {
  name: "compactBarChartProperties",
  displayName: "Compact bar chart",
  sectionFor: "compactBarCharts",
  properties: [
    {
      name: "valuePrefix",
      displayName: "Prefix",
      type: "text",
      defaultValue: "",
    },
    {
      name: "unitOfMeasurement",
      displayName: "Unit",
      type: "text",
      defaultValue: "",
    },
    {
      name: "decimalPrecision",
      displayName: "Decimal precision",
      type: "text",
      defaultValue: "",
    },
  ],
};

const chartPropertiesSchema: ChartPropertySchemaSection[] = [
  exploreDataSection,
  chartTypesSection,
  orientationSection,
  chartDimensionsSection,
  xAxisSection,
  yAxisSection,
  legendSection,
  colorBarSection,
  interactivitySection,
  compactBarChartSection,
];

export default chartPropertiesSchema;
