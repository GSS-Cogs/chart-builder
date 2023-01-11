import { render, fireEvent } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import useTable from "../useTable";
import {
  singleSeriesData,
  doubleSeriesData,
  sparseData,
} from "../chartDefinitionData";

import { mapChartDefinitionData } from "../mapChartDefinitionData";

describe("useTable", () => {
  it("should correctly process given chartDefintion data that contains a single series", () => {
    const data = singleSeriesData;
    const selectedColumns = ["week_starting", "infection_rate", "country_name"];
    const page = 1;
    const rowsPerPage = 10;
    const chartType = "line";

    const { result } = renderHook(() =>
      useTable(data, selectedColumns, page, rowsPerPage, chartType),
    );

    expect(result.current.slice).toEqual([
      [0.1, "13/09/2021"],
      [0.7, "20/09/2021"],
      [3, "27/09/2021"],
      [6.1, "04/10/2021"],
      [9.7, "11/10/2021"],
      [13.6, "18/10/2021"],
      [17.8, "25/10/2021"],
      [22.4, "01/11/2021"],
      [27.8, "08/11/2021"],
      [33.4, "15/11/2021"],
    ]);
  });

  it("should correctly process given chartDefintion data that contains two series", () => {
    const data = doubleSeriesData;
    const selectedColumns = ["week_starting", "infection_rate", "country_name"];
    const page = 1;
    const rowsPerPage = 10;
    const chartType = "line";

    const { result } = renderHook(() =>
      useTable(data, selectedColumns, page, rowsPerPage, chartType),
    );

    expect(result.current.slice).toEqual([
      [0.1, "13/09/2021", "13/09/2021"],
      [0.6, "", "20/09/2021"],
      [0.7, "20/09/2021", ""],
      [2.5, "", "27/09/2021"],
      [3, "27/09/2021", ""],
      [5.6, "", "04/10/2021"],
      [6.1, "04/10/2021", ""],
      [9.2, "", "11/10/2021"],
      [9.7, "11/10/2021", ""],
      [13.3, "", "18/10/2021"],
    ]);
  });

  it("should return the correct slice when the given page is above 1", () => {
    const data = singleSeriesData;
    const selectedColumns = ["week_starting", "infection_rate", "country_name"];
    const page = 2;
    const rowsPerPage = 10;
    const chartType = "line";

    const { result } = renderHook(() =>
      useTable(data, selectedColumns, page, rowsPerPage, chartType),
    );

    expect(result.current.slice).toEqual([
      [38.8, "22/11/2021"],
      [45.2, "29/11/2021"],
      [50.1, "06/12/2021"],
      [61.3, "13/12/2021"],
    ]);
  });

  it("should correctly return the correct headers for the given dataset", () => {
    const data = doubleSeriesData;
    const selectedColumns = ["infection_rate"];
    const page = 1;
    const rowsPerPage = 10;
    const chartType = "line";

    const { result } = renderHook(() =>
      useTable(data, selectedColumns, page, rowsPerPage, chartType),
    );

    expect(result.current.headers).toEqual([
      "infection_rate",
      "England",
      "Scotland",
    ]);
  });

  it("should correctly return the correct range for the given dataset", () => {
    const data = doubleSeriesData;
    const selectedColumns = ["infection_rate"];
    const page = 2;
    const rowsPerPage = 10;
    const chartType = "line";

    const { result } = renderHook(() =>
      useTable(data, selectedColumns, page, rowsPerPage, chartType),
    );

    expect(result.current.range).toEqual([1, 2, 3]);
  });

  it("should correctly process given chartDefintion data that contains sparse data", () => {
    const data = sparseData;
    const selectedColumns = ["Commodity", "Price, billion", "Flow"];
    const page = 1;
    const rowsPerPage = 10;
    const chartType = "line";

    const { result } = renderHook(() =>
      useTable(data, selectedColumns, page, rowsPerPage, chartType),
    );

    expect(result.current.slice).toEqual([
      ["Animal & vegetable oils & fats", 5.21, 1.48],
      ["Beverages & tobacco", 6.673, ""],
      ["Chemicals", "", 54.324],
      ["Crude materials", 6.637, 11.482],
      ["Food & live animals", 15.171, 40.157],
      ["Fuels", 25.522, ""],
      ["Machinery & transport equipment", 112.201, 150.532],
      ["Material manufactures", 33.642, 52.914],
      ["Miscellaneous manufactures", 40.405, 70.337],
      ["Unspecified goods", 12.397, 7.359],
    ]);
  });

  it("should correctly calculate totalResults based on given data", () => {
    const totalResultsData = doubleSeriesData;
    const selectedColumns = ["week_starting", "infection_rate", "country_name"];
    const page = 1;
    const rowsPerPage = 10;
    const chartType = "line";

    const { result } = renderHook(() =>
      useTable(totalResultsData, selectedColumns, page, rowsPerPage, chartType),
    );

    expect(result.current.totalResults).toEqual(27);
  });

  it("should correctly process given chartDefintion data that contains map data", () => {
    const data = mapChartDefinitionData;
    const selectedColumns = [""];
    const page = 1;
    const rowsPerPage = 10;
    const chartType = "map";

    const { result } = renderHook(() =>
      useTable(data, selectedColumns, page, rowsPerPage, chartType),
    );

    expect(result.current.slice).toEqual([
      ["Aberdeen City", 1155],
      ["Aberdeenshire", 1707],
      ["Adur", 209],
      ["Allerdale", 637],
      ["Amber Valley", 663],
      ["Angus", 679],
      ["Antrim and Newtownabbey", 947],
      ["Ards and North Down", 662],
      ["Argyll and Bute", 267],
      ["Armagh City, Banbridge and Craigavon", 1583],
    ]);
  });

  it("should return the correct slice when the given page is above 1 and map data is used", () => {
    const data = mapChartDefinitionData;
    const selectedColumns = [""];
    const page = 10;
    const rowsPerPage = 10;
    const chartType = "map";

    const { result } = renderHook(() =>
      useTable(data, selectedColumns, page, rowsPerPage, chartType),
    );

    expect(result.current.slice).toEqual([
      ["Daventry", 814],
      ["Denbighshire", 465],
      ["Derby", 1067],
      ["Derbyshire Dales", 501],
      ["Derry City and Strabane", 1241],
      ["Doncaster", 2005],
      ["Dorset", 1662],
      ["Dover", 436],
      ["Dudley", 1127],
      ["Dumfries and Galloway", 936],
    ]);
  });

  it("should correctly return the correct headers for the given map data", () => {
    const data = mapChartDefinitionData;
    const selectedColumns = [""];
    const page = 10;
    const rowsPerPage = 10;
    const chartType = "map";

    const { result } = renderHook(() =>
      useTable(data, selectedColumns, page, rowsPerPage, chartType),
    );

    expect(result.current.headers).toEqual(["Location", "Rating"]);
  });

  it("should correctly return the correct range for the given map data", () => {
    const data = mapChartDefinitionData;
    const selectedColumns = [""];
    const page = 10;
    const rowsPerPage = 10;
    const chartType = "map";

    const { result } = renderHook(() =>
      useTable(data, selectedColumns, page, rowsPerPage, chartType),
    );

    expect(result.current.range).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
    ]);
  });
});
