// This module provides the logic to generate the Plotly layout and traces
// for a semi custom chart type we've named "Compact Bar". The key feature of this
// chart is that it shows the category labels above each bar on the chart.

// The implementation leverages Plotly subplots and annotations.
// In a nutshell, we create a grid of subplots, one for each category, and then
// use annotations to place the category labels above each subplot. The implementation
// is intended to work with a single series of data and picks up the first available series
// from the data object.

// There is one xaxis shared between all subplots and multiple yaxes (generated dynamically), one for each subplot.

// Implementation notes:

// 1. As this is a horizontal bar chart, we swap the x and y axes. Therefore y is the category axis.
// 2. We are pivotting what would ordinarily be a single series of data into multiple series, one for each
//    category. We need to do this to create the subplots.

import { ChartPropertyValues } from "../context/ChartContext";

// Category annotation properties.
// x specifies the x value to anchor the annotation to (0 is the start).
// y sets the vertical position of the annotation (to slightly above the bar).
const categoryAnnotationProps = {
  xref: "x",
  x: 0,
  y: 0.67,
  showarrow: false,
  xanchor: "left",
  font: {
    color: "#505a5f",
    size: "14",
    family: "Arial",
  },
};

// Function to dynamically generate the category annotation for a given category
// The function does three things:
// 1. Sets the yref to associate the annotation with the correct subplot yaxis
// 2. Sets the text to be the category label (current y value)
// 3. Applies the standard category annotation properties
const getCategoryAnnotation = (data: any, index: number) => {
  return {
    yref: index === 0 ? "y" : "y" + (index + 1),
    text: data.xValues[0].values[index],
    ...categoryAnnotationProps,
  };
};

// Dynamically generate the yaxis layout for each subplot
// These are spread into the main layout object in getCompactBarLayout.
const getYAxesLayout = (seriesCount: number) => {
  let yAxesLayout = {};

  for (let i = 0; i < seriesCount; i++) {
    const newYAxis = i === 0 ? "yaxis" : "yaxis" + (i + 1);
    yAxesLayout = {
      [newYAxis]: { showticklabels: false, fixedrange: true },
      ...yAxesLayout,
    };
  }
  return yAxesLayout;
};

// This function is exported and is the entry point for building the layout for the compact bar chart.
const getCompactBarLayout = (data: any) => {
  let categoryAnnotations = [];

  // Build the category annotations
  for (let i = 0; i < data.xValues[0].values.length; i++) {
    categoryAnnotations.push(getCategoryAnnotation(data, i));
  }

  // Create the annotations object
  const annotations = { annotations: [...categoryAnnotations] };

  // Get the yaxes layout (one for each subplot)
  const yAxesLayout = getYAxesLayout(data.xValues[0].values.length);

  // Set the main layout properties for the compact bar chart and spread in the annotations and yaxes layout
  // Note that the chart dimensions (height and margins) are merged upstream in chartDefinitions.ts
  const layout = {
    showlegend: false,
    autosize: true,
    xaxis: {
      showticklabels: false,
      showgrid: false,
      zeroline: false,
      fixedrange: true, // prevents the user from zooming in/out
    },
    ...yAxesLayout,
    grid: {
      rows: data.xValues[0].values.length,
      columns: 1,
      ygap: 0.08,
    },
    ...annotations,
  };

  return layout;
};

// This function is exported and is the entry point for building the traces for the compact bar chart.
const getCompactBarTraces = (data: any, chartProps: any) => {
  let traces: any = [];

  // Get the user specified properties for the compact bar chart
  const barChartProps = chartProps.compactBarChartProperties;
  const { valuePrefix, unitOfMeasurement, decimalPrecision } = barChartProps;
  const seriesColor = data.yValues[0].color;

  // Iterate through the values in the series and create a trace for each category
  for (let i = 0; i < data.xValues[0].values.length; i++) {
    const value = [data.yValues[0].values[i]].toString();
    const formattedValue = parseFloat(value).toFixed(decimalPrecision);

    let trace: any = {
      y: [data.xValues[0].values[i]],
      x: [data.yValues[0].values[i]],
      text: valuePrefix + formattedValue + unitOfMeasurement + " ",
      textposition: "auto",
      textfont: {
        size: "14",
        family: "Arial",
      },
      yaxis: i === 0 ? "y" : "y" + (i + 1), // Associate the trace with the correct subplot yaxis
      marker: { color: seriesColor },
      hoverinfo: "none",
      type: "bar",
      orientation: "h",
    };

    traces.push(trace);
  }
  return traces;
};

export { getCompactBarTraces, getCompactBarLayout };
