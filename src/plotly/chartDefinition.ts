import { getMapLayout, getChartLayout } from "./layout";
import config from "./config";
import { sequentialColorScale, divergingColorScale } from "./colorScales";
import { GeoJSON } from "geojson";

import {
  colors,
  flattenChartProperties,
} from "../helper-functions/chart-helpers";

// A plain 'Bar' chart can also act as grouped bar chart if it
// has more than one series so we set barmode as 'group'
// Otherwise if its a 'Stacked Bar' barmode is 'stack'.
const inferBarMode = (chartType: string) => {
  return chartType === "bar" ? "group" : "stack";
};

const updateChartDefinition = (
  chartProperties: any,
  chartData: any,
  mapData: any,
  geoJson: GeoJSON,
) => {
  const chartProps = flattenChartProperties(chartProperties);
  const chartType = chartProps.chartType.toLowerCase();
  chartProps.barmode = inferBarMode(chartType);

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

  // truncate the xSeries values to user specified length
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

const getMapData = (chartProps: any, mapData: any, geoJson: GeoJSON) => {
  let data: any = [
    {
      type: "choropleth",
      locationmode: "geojson-id",
      locations: mapData.geography_uri,
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

  // if interactivity is enabled show hover text over map regions
  // we use a custom hover template so that the geography_uri doesn't show up in the hover text
  if (chartProps.interactivity === "x+y") {
    const hovertemplate = {
      hovertemplate: ` %{text} <br> %{z}${chartProps.hoverInfoUnit} <extra></extra> `,
    };
    data = [{ ...data[0], ...hovertemplate }];
  }
  return data;
};

export default updateChartDefinition;
