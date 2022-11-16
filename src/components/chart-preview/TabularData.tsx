// @ts-ignore
// import Plotly from "plotly.js-basic-dist-min";
// import createPlotlyComponent from "react-plotly.js/factory";
import Table from "../table/Table";

const TabularData = ({ chartDefinition, selectedColumns }: any) => {
  let { data, layout, config, chartType } = chartDefinition;

  let headers = [];
  let jarray = [];

  function combineArrays(arr1: any, arr2: any) {
    return arr1.map((item: any, i: number) => [item, arr2[i]]);
  }
  function combineArrays2(arr1: any, arr2: any) {
    let tempArr = [];
    for (let i = 0; i < arr1.length; i++) {
      tempArr[i] = [...arr1[i], arr2[i]];
    }
    return tempArr;
  }

  const altChartType = data[0].type; // temp fix for missing chartType

  if (chartType === "map" || altChartType === "choropleth") {
    jarray = combineArrays(data[0].text, data[0].z);

    let secondColumnHeader = "";
    if (data[0]?.colorbar?.title?.text) {
      secondColumnHeader = data[0]?.colorbar?.title?.text;
    } else if (data[0]?.colorbar?.title.length > 0) {
      secondColumnHeader = data[0]?.colorbar?.title;
    }
    const cleansedSecondColumHeader =
      secondColumnHeader !== null
        ? secondColumnHeader.replace(/ *\<[^)]*\> */g, " ")
        : secondColumnHeader;
    headers = ["Location", cleansedSecondColumHeader];
  } else {
    jarray = combineArrays(data[0].x, data[0].y);

    if (data.length > 1) {
      for (let i = 1; i < data.length; i++) {
        jarray = combineArrays2(jarray, data[i].y);
      }
    }

    headers = [selectedColumns?.[0]].concat(
      data.map((dataset: { name: string }) => dataset.name),
    );
  }

  return (
    <>
      <Table headers={headers} data={jarray} rowsPerPage={10} />
    </>
  );
};

export default TabularData;
