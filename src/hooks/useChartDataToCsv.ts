import Papa from "papaparse";
import { getMapColorBarTitle } from "./utils";

const getUniqueXValues = (series: any, verticalChart: boolean) => {
  let xValues: any = [];
  for (let i = 0; i < series.length; i++) {
    const currentXValues = verticalChart ? series[i].x : series[i].y;
    xValues = [...xValues, ...currentXValues];
  }
  return Array.from(new Set(xValues.flat()));
};

const getDataRows = (
  series: any,
  uniqueXValues: any,
  verticalChart: boolean,
) => {
  let dataRows: any = [];
  for (let i = 0; i < uniqueXValues.length; i++) {
    let category = uniqueXValues[i];
    let dataRow = [category];

    for (let j = 0; j < series.length; j++) {
      const xValues = verticalChart ? series[j].x : series[j].y;
      const yValues = verticalChart ? series[j].y : series[j].x;

      // if the current series has a value for the current category
      if (xValues.includes(category)) {
        // get the index of the category in the current series
        let index = xValues.indexOf(category);
        // get the value for the current category
        let value = yValues[index];
        dataRow.push(value);
      } else {
        // where no value (i.e. sparse data) then output an empty string
        dataRow.push(null);
      }
    }
    dataRows.push(dataRow);
  }
  return dataRows;
};

// Special case for compact bar charts that have a single series spread across
// multiple Plotly traces in order to create the subplots for each category.
// To get the values for each category we loop through the traces and get the
// value for the first x value in each trace.
// Note the values are x rather than y because the x and y axes are flipped.
const getCompactBarChartDataRows = (series: any, uniqueXValues: any) => {
  let dataRows: any = [];
  for (let i = 0; i < series.length; i++) {
    const category = uniqueXValues[i];
    const value = series[i].x[0];
    dataRows.push([category, value]);
  }
  return dataRows;
};

// special case for line charts with interval data displayed
// plotly traces for displaying interval data needs to be split into two separate columns
// lower and upper
const getLineChartDataRows = (
  series: any,
  uniqueXValues: any,
  verticalChart: boolean,
) => {
  let dataRows: any = [];
  for (let i = 0; i < uniqueXValues.length; i++) {
    let category = uniqueXValues[i];
    let dataRow = [category];
    for (let j = 0; j < series.length; j++) {
      const xValues = verticalChart ? series[j].x : series[j].y;
      const yValues = verticalChart ? series[j].y : series[j].x;

      // if the current series has a value for the current category
      if (xValues.includes(category)) {
        // get the index of the category in the current series
        let index = xValues.indexOf(category);
        // get the value for the current category
        let value = yValues[index];
        dataRow.push(value);
        if (series[j]?.confidence) {
          // if j is even, it means its the lower/upper column, and this needs to be split out into two columns
          // reverse the order to get lower bounds first, then add as normal
          yValues.reverse();
          // get the index of the category in the current series
          let index = xValues.indexOf(category);
          // get the value for the current category
          let value = yValues[index];
          dataRow.push(value);
          // reverse column again
          yValues.reverse();
        }
      } else {
        // where no value (i.e. sparse data) then output an empty string
        dataRow.push(null);
      }
    }
    dataRows.push(dataRow);
  }
  return dataRows;
};

const getMapCsv = (series: any) => {
  const mapValuesHeader = getMapColorBarTitle(series);
  const headers = ["Location", mapValuesHeader];
  const dataRows = series[0].locations.map((location: any, index: number) => [
    series[0].text[index],
    series[0].z[index],
  ]);
  return [headers, dataRows];
};

const getIsIntervalData = (series: any) => {
  return (
    series.filter((x: { confidence: boolean }) => x?.confidence === true)
      .length > 0
  );
};

const getChartCsv = (series: any, category: string, chartType: any) => {
  const isCompactBarData = chartType === "compact bar";
  const isIntervalData = getIsIntervalData(series);

  const seriesNames = series.map((s: any) => s.name);

  const verticalChart = series[0].orientation === "v";
  const uniqueXValues = getUniqueXValues(series, verticalChart);

  let dataRows: any;
  isCompactBarData
    ? (dataRows = getCompactBarChartDataRows(series, uniqueXValues))
    : isIntervalData
    ? (dataRows = getLineChartDataRows(series, uniqueXValues, verticalChart))
    : (dataRows = getDataRows(series, uniqueXValues, verticalChart));

  let headers: any[] = [];
  if (isCompactBarData) {
    headers = [category, seriesNames[0]];
  } else if (isIntervalData) {
    // if confidence interevals are on add extra blank column header after each confidence interval
    // along with adding a sub header of blanks and lower/upper columns
    headers = [category];
    let subHeader: any[] = [""];
    seriesNames.forEach((x: any, index: number) => {
      if ((index + 1) % 2 === 0) {
        headers.push(x);
        headers.push("");
        subHeader = subHeader.concat(["Lower", "Upper"]);
      } else {
        headers.push(x);
        subHeader.push("");
      }
    });

    dataRows = [subHeader].concat(dataRows);
  } else {
    headers = [category, ...seriesNames];
  }

  return [headers, dataRows];
};

const useChartDataToCsv = (series: any, category: string, chartType: any) => {
  const [headers, dataRows] =
    chartType === "map"
      ? getMapCsv(series)
      : getChartCsv(series, category, chartType);

  const csv = Papa.unparse({
    fields: headers,
    data: dataRows,
  });
  return csv;
};

export default useChartDataToCsv;
