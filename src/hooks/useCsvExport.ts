import Papa from "papaparse";

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

const useCsvExport = (series: any, category: any) => {
  const seriesNames = series.map((s: any) => s.name);
  const headers = [category, ...seriesNames];
  const verticalChart = series[0].orientation === "v";
  const uniqueXValues = getUniqueXValues(series, verticalChart);
  const dataRows = getDataRows(series, uniqueXValues, verticalChart);

  const csv = Papa.unparse({
    fields: headers,
    data: dataRows,
  });
  saveToCsv(csv, "chart-data");
};

export default useCsvExport;
