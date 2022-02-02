import {
  calculateYRange,
  calculateXRange,
} from "../helper-functions/chart-helpers";

const getLayout = (chartProps: any, chartData: any) => {
  return {
    autosize: false,
    width: 900,
    height: 550,
    margin: {
      l: 70,
      r: 20,
      b: 100,
      t: 50,
      pad: 4,
    },
    xaxis: {
      range: calculateXRange(chartData),
      fixedrange: true, // prevents the user from zooming in/out
      showgrid: chartProps.showGridLines,
      title: {
        text: chartProps.xAxisTitle,
        standoff: 20,
        font: { size: 15 },
      },
      tickangle: chartProps.xAxisTickAngle,
    },
    yaxis: {
      range: calculateYRange(chartData!.ySeries),
      fixedrange: true, // prevents the user from zooming in/out
      showgrid: chartProps.showGridLines,
      title: { text: chartProps.yAxisTitle, standoff: 15, font: { size: 15 } },
      type: "linear",
    },
    paper_bgcolor: "rgb(255,255,255)",
    plot_bgcolor: "rgb(255,255,255)",
    legend: { orientation: "h", y: -0.28 },
    showlegend: chartProps.showLegend,
  };
};

export default getLayout;
