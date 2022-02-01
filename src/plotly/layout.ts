import {
  calculateYRange,
  calculateXRange,
} from "../helper-functions/chart-helpers";

const getLayout = (chartProps: any, chartData: any) => {
  return {
    autosize: false,
    width: 950,
    height: 600,
    margin: {
      l: 70,
      r: 70,
      b: 100,
      t: 50,
      pad: 4,
    },
    xaxis: {
      range: calculateXRange(chartData),
      fixedrange: true, // prevents the user from zooming in/out
      showgrid: chartProps.showGridLines,
      title: chartProps.xAxisTitle,
      tickangle: chartProps.xAxisTickAngle,
    },
    yaxis: {
      range: calculateYRange(chartData!.ySeries),
      fixedrange: true, // prevents the user from zooming in/out
      showgrid: chartProps.showGridLines,
      title: chartProps.yAxisTitle,
      type: "linear",
    },
    paper_bgcolor: "rgb(255,255,255)",
    plot_bgcolor: "rgb(255,255,255)",
    showlegend: chartProps.showLegend,
  };
};

export default getLayout;
