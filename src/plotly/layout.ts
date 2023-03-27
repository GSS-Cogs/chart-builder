import { ChartPropertyValues } from "../context/ChartContext";
import getXandYAxisLabelsConfig from "./axisTickLabels";

// A plain 'Bar' chart can also act as grouped bar chart if it
// has more than one series so we set barmode as 'group'
// Otherwise if its a 'Stacked Bar' barmode is 'stack'.
const inferBarMode = (chartType: string | null) => {
  return (chartType || "bar").toLowerCase() === "bar" ? "group" : "stack";
};

const getCommonLayout = (chartProps: ChartPropertyValues) => {
  const {
    height: rawHeight,
    marginLeft,
    marginRight,
    marginBottom,
    marginTop,
  } = chartProps.chartDimensionProperties;

  const height: number = parseInt(rawHeight as any);

  return {
    autosize: true,
    height: height,
    margin: {
      l: marginLeft,
      r: marginRight,
      b: marginBottom,
      t: marginTop,
      pad: 4,
    },
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
  };
};
// If the axis type is "auto" then set it to (non human readable) "-" that Plotly understands
const getAxisType = (axisType: string) =>
  axisType === "auto" ? "-" : axisType;

const getChartLayout = (chartProps: ChartPropertyValues, data: any) => {
  const commonLayout = getCommonLayout(chartProps);
  const barmode = inferBarMode(chartProps.chartTypes.chartType as any);

  const xAxisType = getAxisType(chartProps.xAxisProperties.xAxisType as string);
  const yAxisType = getAxisType(chartProps.yAxisProperties.yAxisType as string);

  const [xAxisTickConfig, yAxisTickConfig] = getXandYAxisLabelsConfig(
    chartProps,
    data,
  );
  let chartLayout = {
    barmode,
    xaxis: {
      autorange: true,
      range: [0, 10],
      type: xAxisType,
      rangemode: chartProps.xAxisProperties.xAxisRangeMode,
      fixedrange: true, // prevents the user from zooming in/out
      showgrid: chartProps.xAxisProperties.xAxisGridLines,
      title: {
        text: chartProps.xAxisProperties.xAxisTitle,
        standoff: 20,
        font: { size: 14 },
      },
      ...xAxisTickConfig,
    },
    yaxis: {
      autorange: true,
      type: yAxisType,
      rangemode: chartProps.yAxisProperties.yAxisRangeMode,
      fixedrange: true, // prevents the user from zooming in/out
      showgrid: chartProps.yAxisProperties.yAxisGridLines,
      title: {
        text: chartProps.yAxisProperties.yAxisTitle,
        standoff: 15,
        font: { size: 14 },
      },
      ...yAxisTickConfig,
    },
    legend: {
      orientation: "h",
      xanchor: "center",
      x: 0.48,
      y: chartProps.LegendSection.xAxisOffset,
      font: {
        family: "GDSTransportWebsite",
        size: 16,
      },
    },
    showlegend: chartProps.LegendSection.showLegend,
  };

  if (chartProps.chartTypes.chartType === "Line") {
    // this is to stop the autorange adding white space to the left and right of line charts
    // when confidence intervals and/or error bars are on
    chartLayout.xaxis.autorange = false;
    chartLayout.xaxis.range = [-0.1, data[0].x.length - 0.9];
  }

  return { ...commonLayout, ...chartLayout };
};

const getMapLayout = (chartProps: ChartPropertyValues) => {
  const commonLayout = getCommonLayout(chartProps);

  const mapLayout = {
    geo: {
      showframe: false,
      showcoastlines: false,
      projection: {
        type: "mercator",
      },
      fitbounds: "geojson",
      bgcolor: "transparent",
    },
    dragmode: true,
  };
  return { ...commonLayout, ...mapLayout };
};

export { getMapLayout, getChartLayout, getCommonLayout };
