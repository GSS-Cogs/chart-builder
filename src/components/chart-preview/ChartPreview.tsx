import { Suspense, useContext } from "react";
import ChartContext from "../../context/ChartContext";
import "./chart-preview.css";
import NoDataIcon from "../../assets/icons/chart-preview/NoDataIcon.svg";
import React from "react";

const ChartPreview = (): JSX.Element => {
  const { chartDefinition }: any = useContext(ChartContext);
  return <ActualChart chartDefinition={chartDefinition} />;
};

const isClientSideRender = typeof window !== "undefined";

const Plot = isClientSideRender
    ? React.lazy(() => import("react-plotly.js"))
    : null;

export const ActualChart = ({ chartDefinition }: any): JSX.Element => {
  if (Object.keys(chartDefinition).length === 0)
    return (
      <div id="no-data-container">
        <div id="no-data">
          <NoDataIcon />
        </div>
      </div>
    );

  let { data, layout, config } = chartDefinition;

  // Incrementing the datarevision forces plotly to update the chart.
  // This is a workaround for an issue where plotly loses its
  // autorange calculations on component re-render.
  layout.datarevision++;

  return (
    <div id="chart-preview">
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