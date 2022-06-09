import { lazy, Suspense, useContext } from "react";
import ChartContext from "../../context/ChartContext";
import ChartPlaceholderIcon from "../../assets/icons/chart-preview/ChartPlaceholderIcon";
import "./chart-preview.css";

const ChartPreview = (): JSX.Element => {
  const { chartDefinition }: any = useContext(ChartContext);
  return <ActualChart chartDefinition={chartDefinition} />;
};

const isClientSideRender = typeof window !== "undefined";

// @ts-ignore - issue related to the way react-plotly Plot is exported
const Plot = isClientSideRender ? lazy(() => import("react-plotly.js")) : null;

export const ActualChart = ({ chartDefinition }: any): JSX.Element => {
  const emptyDataState = Object.keys(chartDefinition).length === 0;

  if (emptyDataState)
    return (
      <div id="chart-empty-state-container">
        <div id="chart-empty-state">
          <ChartPlaceholderIcon />
        </div>
      </div>
    );

  let { data, layout, config } = chartDefinition;

  // Incrementing the datarevision forces plotly to update the chart.
  // This is a workaround for an issue where plotly loses its
  // autorange calculations on component re-render.
  layout.datarevision++;

  return (
    <div id="chart">
      {Plot ? (
        <Suspense fallback={<div />}>
          <Plot
            data={data}
            layout={layout}
            config={config}
            useResizeHandler={true}
            style={{ width: "100%" }}
          />
        </Suspense>
      ) : null}
    </div>
  );
};
export default ChartPreview;
