import { getChartLayout, getCommonLayout, getMapLayout } from "./layout";
import config from "./config";
import { divergingColorScale, sequentialColorScale } from "./colorScales";
import { GeoJSON } from "geojson";
import { ChartPropertyValues } from "../context/ChartContext";
import { getCompactBarTraces, getCompactBarLayout } from "./compactBarChart";

const updateChartDefinition = (
  chartProps: ChartPropertyValues,
  chartData: any,
  mapData: any,
  geoJson: GeoJSON,
) => {
  const chartType =
    typeof chartProps?.chartTypes?.chartType === "string"
      ? chartProps.chartTypes.chartType.toLowerCase()
      : "line";

  if (chartType !== "map" && chartData === undefined) return {};

  let data;
  chartType === "map"
    ? (data = getMapData(chartProps, mapData, geoJson))
    : (data = getChartData(chartType, chartProps, chartData));

  let layout;
  chartType === "map"
    ? (layout = getMapLayout(chartProps))
    : (layout = getChartLayout(chartProps, data));

  if (chartType === "compact bar") {
    data = getCompactBarTraces(chartData, chartProps);
    const compactBarLayout = getCompactBarLayout(chartData);
    const commonLayout = getCommonLayout(chartProps);
    layout = { ...commonLayout, ...compactBarLayout };
  }

  return { data, layout, config, chartType };
};

const getChartData = (
  chartType: any,
  chartProps: ChartPropertyValues,
  chartData: any,
) => {
  const traces: any = [];
  if (chartData === undefined) return traces;

  const getHoverTemplate = (
    series: any,
    seriesValue: string,
    categoryValue: string,
    precision: number,
    isAStackedBar: boolean,
  ) => {
    let template = `<b>%{${categoryValue}}</b> <br>`;

    if (isAStackedBar) template += `Total: %{customdata:.${precision}f} <br>`;

    return (
      template +
      `${series.name}: %{${seriesValue}:.${precision}f}<extra></extra>`
    );
  };

  const isAStackedBar = chartType === "stacked bar";
  const xValues = chartData?.xValues;
  const allYSeries = chartData?.yValues;
  // Get the unique X values
  const allXValues = xValues.map((obj: any) => obj.values);
  const uniqueXValues = Array.from(new Set(allXValues.flat()));

  // Initialise an array to hold the cross-series totals for each point on the category axis
  let totals = new Array(uniqueXValues.length).fill(0);

  const isHorizontal =
    chartProps.orientationProperties.orientation === "horizontal";

  // Iterate the available series and create a trace for each
  allYSeries.map((series: any, seriesIndex: number) => {
    if (series.intervalType === "error-skip") {
      return;
    }

    // If it's a stacked bar chart then calculate the cross-series totals
    if (isAStackedBar) {
      const currentXValues = xValues[seriesIndex].values;
      // Iterate through each of the X values in the current (potentially sparse) series
      for (let i = 0; i < currentXValues.length; i++) {
        // Get the current X and Y values in the (potentially sparse) series
        const xValue = currentXValues[i];
        const yValue = series.values[i];

        // Find which index to update in the (non sparse) totals array.
        const indexToUpdate = uniqueXValues.indexOf(xValue);
        totals[indexToUpdate] += parseFloat(yValue);
      }
    }
    let trace: {};

    const yHoverInfoPrecision = parseInt(
      chartProps.yAxisProperties.yHoverInfoPrecision as string,
    );

    if (isHorizontal) {
      trace = {
        x: series.values,
        y: xValues[seriesIndex].values,
        orientation: "h",
        customdata: totals,
        hovertemplate: getHoverTemplate(
          series,
          "x",
          "y",
          yHoverInfoPrecision,
          isAStackedBar,
        ),
      };
    } else {
      trace = {
        x: xValues[seriesIndex].values,
        y: series.values,
        orientation: "v",
        customdata: totals,
        hovertemplate: getHoverTemplate(
          series,
          "y",
          "x",
          yHoverInfoPrecision,
          isAStackedBar,
        ),
      };
    }
    let newSeries = {};
    if (series.intervalType === "intervals") {
      newSeries = {
        ...trace,
        stackgroup: chartType === "stacked filled area" ? "one" : undefined,
        name: series.name,
        mode: chartProps?.LegendSection?.mode ?? "lines",
        legendgroup: "group" + (seriesIndex - 1),
        showlegend: false,
        hoverinfo: chartProps.Interactivity.interactivity,
        marker: { color: series.color },
        line: { color: "transparent" },
        fill: "tozerox",
        fillcolor: series.color,
        confidence: true,
      };
      isAStackedBar ? traces.unshift(newSeries) : traces.push(newSeries);
    } else {
      newSeries = {
        ...trace,
        stackgroup: chartType === "stacked filled area" ? "one" : undefined,
        name: series.name,
        type: chartType === "stacked bar" ? "bar" : chartType,
        mode: chartProps?.LegendSection?.mode ?? "lines",
        legendgroup: "group" + seriesIndex,
        hoverinfo: chartProps.Interactivity.interactivity,
        marker: { color: series.color },
        line: {
          color: series.color,
          dash: series.dashStyle,
        },
        fill:
          chartType === "filled area" || chartType === "stacked filled area"
            ? "tonexty"
            : "none",
      };
      if (series.intervalType === "error bars" && allYSeries.length > 1) {
        newSeries = {
          ...newSeries,
          ...calculateErrorBars(
            allYSeries[seriesIndex + 1].values,
            series.values,
          ),
        };
      }
      isAStackedBar ? traces.unshift(newSeries) : traces.push(newSeries);
    }
  });
  return traces;
};
function calculateErrorBars(yArr: number[], currArr: number[]) {
  let arr: any[] = [];
  for (let i = 0; i < yArr.length / 2; i++) {
    const diff = currArr[i] - yArr[i];
    arr.push(diff);
  }

  const err = {
    error_y: {
      type: "data",
      array: arr,
      visible: true,
    },
  };
  return err;
}

const getMapData = (
  chartProps: ChartPropertyValues,
  mapData: any,
  geoJson: GeoJSON,
) => {
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
