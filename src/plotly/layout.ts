import {ChartPropertyValues} from "../context/ChartContext";

// A plain 'Bar' chart can also act as grouped bar chart if it
// has more than one series so we set barmode as 'group'
// Otherwise if its a 'Stacked Bar' barmode is 'stack'.
const inferBarMode = (chartType: string) => {
  return chartType === "bar" ? "group" : "stack";
};

const getCommonLayout = (chartProps: ChartPropertyValues) => {
  const {
    height,
    marginLeft,
    marginRight,
    marginBottom,
    marginTop,
  } = chartProps.chartDimensionProperties;

  return {
    autosize: true,
    height: parseInt(height),
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

const getChartLayout = (chartProps: ChartPropertyValues) => {
  const commonLayout = getCommonLayout(chartProps);
  const barmode = inferBarMode(chartProps.chartTypes.chartType.toLowerCase());

  const chartLayout = {
    barmode,
    xaxis: {
      autorange: true,
      fixedrange: true, // prevents the user from zooming in/out
      showgrid: chartProps.Gridlines.showGridLines,
      title: {
        text: chartProps.xAxisProperties.xAxisTitle,
        standoff: 20,
        font: { size: 14 },
      },
      tickangle: chartProps.xAxisProperties.xAxisTickAngle,
    },
    yaxis: {
      autorange: true,
      fixedrange: true, // prevents the user from zooming in/out
      showgrid: chartProps.Gridlines.showGridLines,
      title: { text: chartProps.yAxisProperties.yAxisTitle, standoff: 15, font: { size: 14 } },
    },
    legend: { orientation: "h", y: chartProps.xAxisProperties.xAxisOffset },
    showlegend: chartProps.LegendSection.showLegend,
  };
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

export { getMapLayout, getChartLayout };
