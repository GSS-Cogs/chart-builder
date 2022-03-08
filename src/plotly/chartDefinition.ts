import { getMapLayout, getChartLayout } from "./layout";
import config from "./config";
import { get } from "../services/map-data/map-woodland-la";
import { getUkLaBoundaries } from "../services/map-data/uk-la-boundaries";

import {
  colors,
  flattenChartProperties,
} from "../helper-functions/chart-helpers";

const updateChartDefinition = async (chartProperties: any, chartData: any) => {
  const chartProps = flattenChartProperties(chartProperties);
  const chartType = chartProps.chartType.toLowerCase();

  let data;

  console.log(chartType);
  chartType === "map"
    ? (data = await getMapData())
    : (data = getChartData(chartType, chartProps, chartData));

  let layout;

  chartType === "map"
    ? (layout = getMapLayout())
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

const getMapData = async () => {
  const mapData = await get();
  const boundaries = await getUkLaBoundaries();

  console.log(mapData);

  const data = [
    {
      type: "choropleth",
      locationmode: "geojson-id",
      locations: mapData.la_uri,
      z: mapData.emissions,
      text: mapData.label,
      colorscale: [
        [0, "rgb(242, 108, 49)"],
        [0.35, "rgb(242, 160, 49)"],
        [0.5, "rgb(233, 212, 30)"],
        [0.6, "rgb(202, 233, 30)"],
        [0.7, "rgb(44, 182, 169)"],
        [1, "rgb(36, 151, 140)"],
      ],
      featureidkey: "properties.geography_uri",
      geojson: boundaries,
      marker: {
        line: {
          color: "rgb(123,123,123)",
          width: 0.25,
        },
      },
      colorbar: {
        title: "Percentage<br>of area",
      },
    },
  ];
  return data;
};

export default updateChartDefinition;