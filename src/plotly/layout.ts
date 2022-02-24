const getLayout = (chartProps: any, chartData: any) => {
  return {
    barmode: chartProps.barmode,
    autosize: true,
    height: parseInt(chartProps.height),
    margin: {
      l: 70,
      r: 20,
      b: 100,
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
      type: "linear",
    },
    paper_bgcolor: "rgb(245,245,245)",
    plot_bgcolor: "rgb(245,245,245)",
    legend: { orientation: "h", y: -0.38 },
    showlegend: chartProps.showLegend,
  };
};

export default getLayout;
