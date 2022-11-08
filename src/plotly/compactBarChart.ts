import { ChartPropertyValues } from "../context/ChartContext";

const commonTraceProps = {
  type: "bar",
  orientation: "h",
};

const commonFontProps = {
  size: "16",
  family: "Arial",
};

const categoryAnnotationFont = {
  font: {
    color: "#505a5f",
    ...commonFontProps,
  },
};

const valueAnnotationFont = {
  font: {
    align: "right",
    color: "#ffffff",
    ...commonFontProps,
  },
};

const categoryAnnotationProps = {
  xref: "x",
  x: 0,
  y: 0.65,
  showarrow: false,
  xanchor: "left",
  ...categoryAnnotationFont,
};

const valueAnnotationProps = {
  xref: "x",
  y: 0,
  showarrow: false,
  xanchor: "right",
  xshift: -5,
  ...valueAnnotationFont,
};

// calculate the length of plotly annotation text
const getTextLength = (text: string) => {
  const textLength = text.length;
  return textLength * 8;
};

const getCategoryAnnotation = (data: any, index: number) => {
  console.log(data.yValues[0].values[index]);
  return {
    yref: index === 0 ? "y" : "y" + (index + 1),
    text: data.xValues[0].values[index],
    ...categoryAnnotationProps,
  };
};

const getValueAnnotation = (data: any, index: number) => {
  return {
    x: data.yValues[0].values[index],
    yref: index === 0 ? "y" : "y" + (index + 1),
    text: data.yValues[0].values[index] + "%",
    ...valueAnnotationProps,
  };
};

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

const getCompactBarLayout = (data: any, chartProps: ChartPropertyValues) => {
  let annotations;
  let categoryAnnotations = [];
  let valueAnnotations = [];

  for (let i = 0; i < data.xValues[0].values.length; i++) {
    categoryAnnotations.push(getCategoryAnnotation(data, i));
    valueAnnotations.push(getValueAnnotation(data, i));
  }

  annotations = { annotations: [...categoryAnnotations, ...valueAnnotations] };

  const {
    height: rawHeight,
    marginLeft,
    marginRight,
    marginBottom,
    marginTop,
  } = chartProps.chartDimensionProperties;

  const height: number = parseInt(rawHeight as any);

  const yAxesLayout = getYAxesLayout(data.xValues[0].values.length);
  const layout = {
    height: height,
    margin: {
      l: marginLeft,
      r: marginRight,
      b: marginBottom,
      t: marginTop,
      pad: 4,
    },
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
      ygap: 0.1,
    },
    ...annotations,
  };

  return layout;
};

const getCompactBarTraces = (data: any) => {
  let traces: any = [];
  const seriesColor = data.yValues[0].color;
  for (let i = 0; i < data.xValues[0].values.length; i++) {
    let trace: any = {
      y: [data.xValues[0].values[i]],
      x: [data.yValues[0].values[i]],
      yaxis: i === 0 ? "y" : "y" + (i + 1),
      marker: { color: seriesColor },
      hoverinfo: "none",
      ...commonTraceProps,
    };

    traces.push(trace);
  }
  return traces;
};

export { getCompactBarTraces, getCompactBarLayout };
