// @ts-ignore
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import LegendPrompt from "../misc/LegendPrompt";

const Plot: any = createPlotlyComponent(Plotly);

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
