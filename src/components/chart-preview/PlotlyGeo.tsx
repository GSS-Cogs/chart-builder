// @ts-ignore
import Plotly from "plotly.js-geo-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot: any = createPlotlyComponent(Plotly);

const PlotlyGeo = ({ chartDefinition }: any) => {
  let { data, layout, config } = chartDefinition;

  return (
    <Plot
      data={data}
      layout={layout}
      config={config}
      useResizeHandler={true}
      style={{ width: "100%" }}
    />
  );
};

export default PlotlyGeo;
