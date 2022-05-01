import {getChartLayout, getMapLayout} from "./layout";
import config from "./config";
import {divergingColorScale, sequentialColorScale} from "./colorScales";
import {GeoJSON} from "geojson";

import {colors,} from "../helper-functions/chart-helpers";
import {ChartPropertyValues,} from "../context/ChartContext";

const updateChartDefinition = (
  chartProps: ChartPropertyValues,
  chartData: any,
  mapData: any,
  geoJson: GeoJSON,
) => {
  const chartType = typeof chartProps?.chartTypes?.chartType === 'string'
    ? chartProps.chartTypes.chartType.toLowerCase()
    : 'line';

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

const getChartData = (chartType: any, chartProps: ChartPropertyValues, chartData: any) => {
  const traces: any = [];

  const xTickLabelMaxLength = typeof chartProps?.xAxisProperties?.xTickLabelMaxLength === 'string'
    ? parseInt(chartProps.xAxisProperties.xTickLabelMaxLength)
    : 9999;

  // truncate the xValues to user specified length
  const xValues = chartData?.xValues.values.map((value: string) => {
    return String(value).substring(0, xTickLabelMaxLength);
  });

  chartData?.yValues.map((series: any, index: number) => {
    let trace: {};
    if (chartProps.orientationProperties.orientation === "horizontal") {
      trace = {
        x: series.values,
        y: xValues,
        orientation: "h",
      };
    } else {
      trace = {
        x: xValues,
        y: series.values,
        orientation: "v",
      };
    }

    traces.push({
      ...trace,
      name: series.name,
      type: chartType === "stacked bar" ? "bar" : chartType,
      mode: "lines",
      hoverinfo: chartProps.Interactivity.interactivity,
      line: {
        color: colors[index],
      },
    });
  });
  return traces;
};

const getMapData = (chartProps: ChartPropertyValues, mapData: any, geoJson: GeoJSON) => {
  let data: any = [
    {
      type: "choropleth",
      locationmode: "geojson-id",
      locations: mapData.geography_uri,
      z: mapData.values,
      text: mapData.label,
      colorscale:
        chartProps.colorBarProperties.colorscale === "Diverging"
          ? divergingColorScale
          : sequentialColorScale,
      autocolorscale: chartProps.colorBarProperties.autocolorscale,
      featureidkey: "properties.geography_uri",
      geojson: geoJson,
      hoverinfo: chartProps.Interactivity.interactivity,
      marker: {
        line: {
          color: "rgb(123,123,123)",
          width: 0.25,
        },
      },
      colorbar: {
        title: chartProps.colorBarProperties.colorBarTitle,
        thickness: chartProps.colorBarProperties.colorBarWidth,
      },
    },
  ];

  // if interactivity is enabled show hover text over map regions
  // we use a custom hover template so that the geography_uri doesn't show up in the hover text
  if (chartProps.Interactivity.interactivity === "x+y") {
    const hovertemplate = {
      hovertemplate: ` %{text} <br> %{z}${chartProps.Interactivity.hoverInfoUnit} <extra></extra> `,
    };
    data = [{ ...data[0], ...hovertemplate }];
  }
  return data;
};

export default updateChartDefinition;
