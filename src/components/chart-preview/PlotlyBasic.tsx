// @ts-ignore
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import React, { useEffect, useState } from "react";

const Plot: any = createPlotlyComponent(Plotly);

const useFilters = (data: any) => {
  const [filtersIndex, setFiltersIndex] = useState<number[]>([]);

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  return { filtersIndex };
};

const PlotlyBasic = ({
  chartDefinition,
  onLegendClick,
  onLegendDoubleClick,
}: any) => {
  let { data, layout, config } = chartDefinition;

  return (
    <>
      <Plot
        data={data}
        layout={layout}
        config={config}
        useResizeHandler={true}
        style={{ width: "100%" }}
        onLegendClick={(e: any) => onLegendClick(e)}
        onLegendDoubleClick={(e: any) => onLegendDoubleClick(e)}
      />
    </>
  );
};

export default PlotlyBasic;
