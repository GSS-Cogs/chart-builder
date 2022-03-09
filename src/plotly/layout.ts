const getCommonLayout = (chartProps: any) => {
  return {
    autosize: true,
    height: parseInt(chartProps.height),
    margin: {
      l: chartProps.marginLeft,
      r: chartProps.marginRight,
      b: chartProps.marginBottom,
      t: chartProps.marginTop,
      pad: 4,
    },
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
  };
};

const getChartLayout = (chartProps: any) => {
  const commonLayout = getCommonLayout(chartProps);

  const chartLayout = {
    barmode: chartProps.barmode,
    xaxis: {
      autorange: true,
      fixedrange: true, // prevents the user from zooming in/out
      showgrid: chartProps.showGridLines,
      title: {
        text: chartProps.xAxisTitle,
        standoff: 20,
        font: { size: 14 },
      },
      tickangle: chartProps.xAxisTickAngle,
    },
    yaxis: {
      autorange: true,
      fixedrange: true, // prevents the user from zooming in/out
      showgrid: chartProps.showGridLines,
      title: { text: chartProps.yAxisTitle, standoff: 15, font: { size: 14 } },
    },
    legend: { orientation: "h", y: chartProps.xAxisOffset },
    showlegend: chartProps.showLegend,
  };
  return { ...commonLayout, ...chartLayout };
};

const getMapLayout = (chartProps: any) => {
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
