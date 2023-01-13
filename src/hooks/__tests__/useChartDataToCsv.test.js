import { chartData, expectedChartCsv } from "../testData/chartData";
import { mapData, expectedMapCsv } from "../testData/mapData";
import { sparseData, expectedSparseCsv } from "../testData/sparseData";
import {
  compactBarData,
  expectedCompactBarCsv,
} from "../testData/compactBarData";
import useChartDataToCsv from "../useChartDataToCsv";

const fixLineEndings = (csv) => csv.replace(/(\r\n)/gm, "\n");

describe("useChartDataToCsv", () => {
  it("converts multi series plotly traces to csv", () => {
    const result = useChartDataToCsv(chartData, "week_starting", "line chart");
    const csv = fixLineEndings(result);
    expect(csv).toEqual(expectedChartCsv);
  });
  it("converts plotly map data to csv", () => {
    const result = useChartDataToCsv(mapData, "week_starting", "map");
    const csv = fixLineEndings(result);
    expect(csv).toEqual(expectedMapCsv);
  });
  it("converts sparse plotly chart data to csv", () => {
    const result = useChartDataToCsv(sparseData, "Category", "bar chart");
    const csv = fixLineEndings(result);
    expect(csv).toEqual(expectedSparseCsv);
  });
  it("converts plotly compact bar chart data to csv", () => {
    const result = useChartDataToCsv(
      compactBarData,
      "Commodity",
      "compact bar",
    );
    const csv = fixLineEndings(result);
    expect(csv).toEqual(expectedCompactBarCsv);
  });
});
