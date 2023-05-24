// @ts-ignore
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import LegendPrompt from "../misc/LegendPrompt";

const Plot: any = createPlotlyComponent(Plotly);

const createNewLayout = (layout: { legend: { font: any } }) => {
  // this function is a work around for having to force updated legend fonts
  // rather than having to resave each chart manually

  const newFont = {
    ...layout.legend.font,
    size: 16,
    family: "GDS Transport",
  };

  const newLayout = {
    ...layout,
    legend: {
      ...layout.legend,
      font: newFont,
      xanchor: "center",
      x: 0.48,
    },
  };

  return newLayout;
};

const PlotlyBasic = ({
  chartDefinition,
  onLegendClick,
  onLegendDoubleClick,
}: any) => {
  let { data, layout, config } = chartDefinition;
  const newLayout = createNewLayout(layout);

  return (
    <>
      <Plot
        data={data}
        layout={newLayout}
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
