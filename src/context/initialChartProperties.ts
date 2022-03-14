import {ChartPropertySection} from "./types";

export interface ChartProperty {
  name: string;
  displayName: string;
  type: "checkbox" | "radio" | "text";
  value: boolean | string | number;
  output: string;
  options?: string[];
  showPropertyLabel?: boolean;
}

const legendSection: ChartPropertySection = {
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

const GridlinesSection: ChartPropertySection = {
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

const chartTypesSection: ChartPropertySection = {
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

const interactivitySection: ChartPropertySection = {
  name: "Interactivity",
  displayName: "Interactivity",
  sectionFor: "all",
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

const xAxisSection: ChartPropertySection = {
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

const yAxisSection: ChartPropertySection = {
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

const chartDimensionsSection: ChartPropertySection = {
  name: "chartDimensionProperties",
  displayName: "Chart dimensions",
  sectionFor: "all",
  properties: [
    {
      name: "height",
      displayName: "Height(px)",
      type: "text",
      value: "550",
      output: "svg",
    },
    {
      name: "marginLeft",
      displayName: "Left margin(px)",
      type: "text",
      value: "70",
      output: "svg",
    },
    {
      name: "marginRight",
      displayName: "Right margin(px)",
      type: "text",
      value: "70",
      output: "svg",
    },
    {
      name: "marginTop",
      displayName: "Bottom margin(px)",
      type: "text",
      value: "70",
      output: "svg",
    },
    {
      name: "marginBottom",
      displayName: "Bottom margin(px)",
      type: "text",
      value: "70",
      output: "svg",
    },
  ],
};

const orientationSection: ChartPropertySection = {
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

const colorBarSection: ChartPropertySection = {
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
  ],
};

const initialChartProperties: ChartPropertySection[] = [
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

export default initialChartProperties;
