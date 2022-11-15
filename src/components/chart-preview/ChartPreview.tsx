import { lazy, Suspense, useContext } from "react";
import ChartContext from "../../context/ChartContext";
import ChartPlaceholderIcon from "../../assets/icons/chart-preview/ChartPlaceholderIcon";
import "./chart-preview.css";

// @ts-ignore
const PlotlyBasic = lazy(() => import("./PlotlyBasic"));
// @ts-ignore
const PlotlyGeo = lazy(() => import("./PlotlyGeo"));

const ChartPreview = (): JSX.Element => {
  const { chartDefinition }: any = useContext(ChartContext);
  return <ActualChart chartDefinition={chartDefinition} />;
};

const isClientSideRender = typeof window !== "undefined";

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

  const { chartType, layout } = chartDefinition;
  // Incrementing the datarevision forces plotly to update the chart.
  // This is a workaround for an issue where plotly loses its
  // autorange calculations on component re-render.
  layout.datarevision++;

  return (
    <div id="chart">
      <Suspense fallback={<div />}>
        {isClientSideRender ? (
          chartType === "map" ? (
            <PlotlyGeo chartDefinition={chartDefinition} />
          ) : (
            <PlotlyBasic chartDefinition={chartDefinition} />
          )
        ) : null}
      </Suspense>
    </div>
  );
};
export default ChartPreview;
