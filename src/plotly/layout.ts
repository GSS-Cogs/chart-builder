const getChartLayout = (chartProps: any) => {
  return {
    barmode: chartProps.barmode,
    autosize: true,
    height: parseInt(chartProps.height),
    margin: {
      l: chartProps.marginLeft,
      r: 20,
      b: chartProps.marginBottom,
      t: 50,
      pad: 4,
    },
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
    paper_bgcolor: "rgb(245,245,245)",
    plot_bgcolor: "rgb(245,245,245)",
    legend: { orientation: "h", y: chartProps.xAxisOffset },
    showlegend: chartProps.showLegend,
  };
};

const getMapLayout = () => {
  return {
    font: {
      family: "GDS Transport Light, sans-serif",
      size: 12,
      color: "#6B7276",
    },
    autosize: true,
    responsive: true,
    width: 1000,
    height: 800,
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
    margin: {
      l: 50,
      r: 50,
      b: 0,
      t: 0,
      pad: 0,
      autoexpand: true,
    },
    geo: {
      width: 600,
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
};

export { getMapLayout, getChartLayout };
