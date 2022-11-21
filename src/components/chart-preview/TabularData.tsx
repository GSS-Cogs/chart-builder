// @ts-ignore
import React, { useCallback, useEffect, useState } from "react";
// import Plotly from "plotly.js-basic-dist-min";
// import createPlotlyComponent from "react-plotly.js/factory";
import Table from "../table/Table";

const TabularData = ({ chartDefinition, selectedColumns }: any) => {
  let { data, layout, config, chartType } = chartDefinition;

  useEffect(() => {}, []);

  return (
    <Table selectedColumns={selectedColumns} data={data} rowsPerPage={10} />
  );
};

export default TabularData;
