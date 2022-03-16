import { getMapLayout, getChartLayout } from "./layout";
import config from "./config";

const divergingColorScale = [
  [0, "rgb(242, 108, 49)"],
  [0.35, "rgb(242, 160, 49)"],
  [0.5, "rgb(233, 212, 30)"],
  [0.6, "rgb(202, 233, 30)"],
  [0.7, "rgb(44, 182, 169)"],
  [1, "rgb(36, 151, 140)"],
];

const sequentialColorScale = [
  [0, "rgb(233, 212, 30)"],
  [1, "rgb(36, 151, 140)"],
];

import {
  colors,
  flattenChartProperties,
} from "../helper-functions/chart-helpers";

const updateChartDefinition = (
  chartProperties: any,
  chartData: any,
  mapData: any,
  geoJson: any,
) => {
  const chartProps = flattenChartProperties(chartProperties);
  const chartType = chartProps.chartType.toLowerCase();

  let data;

  chartType === "map"
    ? (data = getMapData(chartProps, mapData, geoJson))
    : (data = getChartData(chartType, chartProps, chartData));

  let layout;

  chartType === "map"
    ? (layout = getMapLayout(chartProps))
    : (layout = getChartLayout(chartProps));

  return { data, layout, config };
};

const getChartData = (chartType: any, chartProps: any, chartData: any) => {
  const traces: any = [];

  //truncate the xSeries values to user specified length
  const xSeries = chartData?.xSeries.values.map((value: string) => {
    return String(value).substring(0, chartProps.xTickLabelMaxLength);
  });

  chartData?.ySeries.map((series: any, index: number) => {
    let trace: {};
    if (chartProps.orientation === "horizontal") {
      trace = {
        x: series.values,
        y: xSeries,
        orientation: "h",
      };
    } else {
      trace = {
        x: xSeries,
        y: series.values,
        orientation: "v",
      };
    }

    traces.push({
      ...trace,
      name: series.name,
      type: chartType === "stacked bar" ? "bar" : chartType,
      mode: "lines",
      hoverinfo: chartProps.interactivity,
      line: {
        color: colors[index],
      },
    });
  });
  return traces;
};

const getMapData = (chartProps: any, mapData: any, geoJson: any) => {
  let data: any = [
    {
      type: "choropleth",
      locationmode: "geojson-id",
      locations: mapData.la_uri,
      z: mapData.values,
      text: mapData.label,
      colorscale:
        chartProps.colorscale === "Diverging"
          ? divergingColorScale
          : sequentialColorScale,
      autocolorscale: chartProps.autocolorscale,
      featureidkey: "properties.geography_uri",
      geojson: geoJson,
      hoverinfo: chartProps.interactivity,
      marker: {
        line: {
          color: "rgb(123,123,123)",
          width: 0.25,
        },
      },
      colorbar: {
        title: chartProps.colorBarTitle,
        thickness: chartProps.colorBarWidth,
      },
    },
  ];

  if (chartProps.interactivity === "x+y") {
    const hovertemplate = {
      hovertemplate: ` %{text} <br> %{z}${chartProps.hoverInfoUnit} <extra></extra> `,
    };
    data = [{ ...data[0], ...hovertemplate }];
  }
  return data;
};

export default updateChartDefinition;
