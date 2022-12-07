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

const saveToCsv = (csv: any, fileName: string) => {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${fileName}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const getMapCsv = (series: any) => {
  const mapValuesHeader = getMapColorBarTitle(series);
  const headers = ["Location", mapValuesHeader];
  console.log(series);
  const dataRows = series[0].locations.map((location: any, index: number) => [
    series[0].text[index],
    series[0].z[index],
  ]);
  console.log(series);
  return [headers, dataRows];
};

const getChartCsv = (series: any, category: string, chartType: any) => {
  const isCompactBarData = chartType === "compact bar";
  const seriesNames = series.map((s: any) => s.name);

  const headers = isCompactBarData
    ? [category, seriesNames[0]]
    : [category, ...seriesNames];

  const verticalChart = series[0].orientation === "v";
  const uniqueXValues = getUniqueXValues(series, verticalChart);

  let dataRows: any;
  isCompactBarData
    ? (dataRows = getCompactBarChartDataRows(series, uniqueXValues))
    : (dataRows = getDataRows(series, uniqueXValues, verticalChart));

  return [headers, dataRows];
};

const useCsvExport = (series: any, category: string, chartType: any) => {
  const [headers, dataRows] =
    chartType === "map"
      ? getMapCsv(series)
      : getChartCsv(series, category, chartType);

  const csv = Papa.unparse({
    fields: headers,
    data: dataRows,
  });
  saveToCsv(csv, "chart-data");
};

export default useCsvExport;
