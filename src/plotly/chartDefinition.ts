import { getChartLayout, getMapLayout } from "./layout";
import config from "./config";
import { divergingColorScale, sequentialColorScale } from "./colorScales";
import { GeoJSON } from "geojson";
import { ChartPropertyValues } from "../context/ChartContext";

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

  return { data, layout, config };
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

  // Iterate the available series and create a trace for each
  allYSeries.map((series: any, seriesIndex: number) => {
    // If it's a stacked bar chart then calculate the cross-series totals
    if (isAStackedBar) {
      // Iterate through each of the unique X values (non sparse X values)
      for (let i = 0; i < uniqueXValues.length; i++) {
        const xValue = uniqueXValues[i];
        const yValue = series.values[i];

        // Update the total for this point on the category axis with the Y value if there's a sparse X match
        if (xValues[seriesIndex].values.includes(xValue)) {
          totals[i] += parseFloat(yValue);
        }
      }
    }
    let trace: {};

    const yHoverInfoPrecision = parseInt(
      chartProps.yAxisProperties.yHoverInfoPrecision as string,
    );

    if (chartProps.orientationProperties.orientation === "horizontal") {
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

    const newSeries = {
      ...trace,
      name: series.name,
      type: chartType === "stacked bar" ? "bar" : chartType,
      mode: "lines",
      hoverinfo: chartProps.Interactivity.interactivity,
      marker: { color: series.color },
      line: {
        color: series.color,
        dash: series.dashStyle,
      },
    };
    isAStackedBar ? traces.unshift(newSeries) : traces.push(newSeries);
  });
  return traces;
};

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
