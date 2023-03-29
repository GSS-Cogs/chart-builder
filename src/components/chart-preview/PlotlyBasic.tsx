// @ts-ignore
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import React, { useEffect, useState } from "react";
import LegendPrompt from "../misc/LegendPrompt";

const Plot: any = createPlotlyComponent(Plotly);

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
      <LegendPrompt />
    </>
  );
};

export default PlotlyBasic;
