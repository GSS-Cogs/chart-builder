// @/src/hooks/useTable.js
import { useState, useEffect } from "react";
import { getMapColorBarTitle } from "./utils";

function combineArrays(arr1, arr2) {
  let tempArr = [];
  for (let i = 0; i < arr1.length; i++) {
    tempArr[i] = [...arr1[i], arr2[i]];
  }
  return tempArr;
}

function combineSparseDataArrays(arr1, arr2, arr3) {
  let tempArr = arr1;
  let xArr = arr2;
  let yArr = arr3;
  for (let i = 0; i < arr1.length; i++) {
    const index = xArr.indexOf(arr1[i][0]);
    if (index !== -1) {
      tempArr[i].push(yArr[index]);
      xArr.slice(index, 1);
      yArr.slice(index, 1);
    } else {
      tempArr[i].push("");
    }
  }
  return tempArr;
}

const combineCompactDataArrays = (series, uniqueXValues) => {
  let dataRows = [];
  for (let i = 0; i < series.length; i++) {
    const category = uniqueXValues[i];
    const value = series[i].x[0];
    dataRows.push([category, value]);
  }
  return dataRows;
};

function getAllXValues(arr, axis) {
  // gets all unique values within a 2d array
  let tempArr = [];
  for (let i = 0; i < arr.length; i++) {
    tempArr.push(arr[i][axis]);
  }
  const uniqueArr = [...new Set(tempArr.flat())];
  return uniqueArr;
}

function sortFunction(a, b) {
  if (a[0] === b[0]) {
    return 0;
  } else {
    return a[0] < b[0] ? -1 : 1;
  }
}

const configureData = (data, selectedColumns, chartType) => {
  const altChartType = data[0].type; // temp fix for missing chartType
  let jarray = [];
  let headers = [];
  if (altChartType === "choropleth") {
    if (data[0].z.length > 0) {
      const prepArray = data[0].text.map((item) => [item]);
      jarray = combineArrays(prepArray, data[0].z);
    }

    const mapValuesColumnHeader = getMapColorBarTitle(data);
    headers = ["Location", mapValuesColumnHeader];
  } else {
    const firstColumn = data[0].orientation === "v" ? "x" : "y";
    const seriesColumns = data[0].orientation === "v" ? "y" : "x";

    const allXValues = getAllXValues(data, firstColumn);

    if (chartType === "compact bar") {
      jarray = combineCompactDataArrays(data, allXValues);
      headers = [selectedColumns?.[0], data[0]?.name];
    } else {
      const prepXValuesArray = allXValues.map((item) => [item]);
      jarray = prepXValuesArray;
      for (let i = 0; i < data.length; i++) {
        if (data[i]?.confidence === true) {
          const half = Math.ceil(data[i][seriesColumns].length / 2);

          const firstHalfY = data[i][seriesColumns].slice(0, half);
          const secondHalfY = data[i][seriesColumns].slice(half);

          const firstHalfX = data[i][firstColumn].slice(0, half);
          const secondHalfX = data[i][firstColumn].slice(half);

          jarray = combineSparseDataArrays(jarray, firstHalfX, firstHalfY);
          jarray = combineSparseDataArrays(jarray, secondHalfX, secondHalfY);
        } else {
          jarray = combineSparseDataArrays(
            jarray,
            data[i][firstColumn],
            data[i][seriesColumns],
          );
        }
      }

      headers = [selectedColumns?.[0]].concat(
        data.map((dataset) => dataset.name),
      );
    }
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

const useTable = (data, selectedColumns, page, rowsPerPage, chartType) => {
  const [tableRange, setTableRange] = useState([]);
  const [slice, setSlice] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const updatedDataAll = configureData(data, selectedColumns, chartType);
    const updatedData = updatedDataAll[0];
    const updatedHeaders = updatedDataAll[1];
    setHeaders(updatedHeaders);

    const range = calculateRange(updatedData, rowsPerPage);
    setTableRange([...range]);

    const slice = sliceData(updatedData, page, rowsPerPage);
    setSlice([...slice]);

    setTotalResults(updatedData.length);
  }, [data, setTableRange, page, setSlice, selectedColumns, chartType]);

  return { slice, range: tableRange, totalResults, headers };
};

export default useTable;
