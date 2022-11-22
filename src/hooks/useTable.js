// @/src/hooks/useTable.js
import { useState, useEffect } from "react";

// function combineArrays(arr1, arr2) {
//   return arr1.map((item, i) => [item, arr2[i]]);
// }

function combineArrays(arr1, arr2) {
  let tempArr = [];
  for (let i = 0; i < arr1.length; i++) {
    tempArr[i] = [...arr1[i], arr2[i]];
  }
  return tempArr;
}

function sortFunction(a, b) {
  if (a[0] === b[0]) {
    return 0;
  } else {
    return a[0] < b[0] ? -1 : 1;
  }
}

const configureData = (data, selectedColumns) => {
  const altChartType = data[0].type; // temp fix for missing chartType
  let jarray = [];
  let headers = [];

  if (altChartType === "choropleth") {
    const prepArray = data[0].text.map((item) => [item]);
    jarray = combineArrays(prepArray, data[0].z);

    let secondColumnHeader = "";
    const colorbar = data[0]?.colorbar;
    if (colorbar?.title?.text) {
      secondColumnHeader = colorbar?.title?.text;
    } else if (colorbar?.title.length > 0) {
      secondColumnHeader = colorbar?.title;
    }
    const cleansedSecondColumnHeader =
      secondColumnHeader !== null
        ? secondColumnHeader.replace(/ *\<[^)]*\> */g, " ")
        : secondColumnHeader;

    headers = ["Location", cleansedSecondColumnHeader];
  } else {
    const firstColumn = data[0].orientation === "v" ? "x" : "y";
    const seriesColumns = data[0].orientation === "v" ? "y" : "x";

    const prepArray = data[0][firstColumn].map((item) => [item]);
    jarray = combineArrays(prepArray, data[0][seriesColumns]);

    if (data.length > 1) {
      for (let i = 1; i < data.length; i++) {
        jarray = combineArrays(jarray, data[i][seriesColumns]);
      }
    }

    headers = [selectedColumns?.[0]].concat(
      data.map((dataset) => dataset.name),
    );
  }

  jarray.sort(sortFunction);

  return [jarray, headers];
};

const calculateRange = (data, rowsPerPage) => {
  const range = [];
  const num = Math.ceil(data.length / rowsPerPage);

  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
};

const sliceData = (data, page, rowsPerPage) => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

const useTable = (data, selectedColumns, page, rowsPerPage) => {
  const [tableRange, setTableRange] = useState([]);
  const [slice, setSlice] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const updatedDataAll = configureData(data, selectedColumns);
    const updatedData = updatedDataAll[0];
    const updatedHeaders = updatedDataAll[1];
    setHeaders(updatedHeaders);

    const range = calculateRange(updatedData, rowsPerPage);
    setTableRange([...range]);

    const slice = sliceData(updatedData, page, rowsPerPage);
    setSlice([...slice]);

    setTotalResults(updatedData.length);
  }, [data, setTableRange, page, setSlice, selectedColumns]);

  return { slice, range: tableRange, totalResults, headers };
};

export default useTable;
