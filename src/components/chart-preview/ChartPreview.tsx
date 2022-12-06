import { lazy, Suspense, useContext } from "react";
import ChartContext from "../../context/ChartContext";
import ChartPlaceholderIcon from "../../assets/icons/chart-preview/ChartPlaceholderIcon";
import "./chart-preview.css";
import TabularData from "./TabularData";
import Tabs from "../tabs/Tabs";
import Tab from "../tabs/Tab";
import useCsvExport from "../../hooks/useCsvExport";

// @ts-ignore
const PlotlyBasic = lazy(() => import("./PlotlyBasic"));
// @ts-ignore
const PlotlyGeo = lazy(() => import("./PlotlyGeo"));
//const TabularData = lazy(() => import("./TabularData"));

const ChartPreview = (): JSX.Element => {
  const { chartDefinition, selectedColumns }: any = useContext(ChartContext);
  return (
    <ActualChart
      chartDefinition={chartDefinition}
      selectedColumns={selectedColumns}
    />
  );
};

const isClientSideRender = typeof window !== "undefined";

export const ActualChart = ({
  chartDefinition,
  selectedColumns,
}: any): JSX.Element => {
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

  const onDownloadClick = (chartDefinition: any, selectedColumns: any) => {
    const category = selectedColumns[0];
    useCsvExport(chartDefinition.data, category, chartType);
  };

  return (
    <div id="chart">
      {chartType !== "table" ? (
        <Tabs>
          <Tab title="Visualisation">
            <Suspense fallback={<div />}>
              {isClientSideRender ? (
                chartType === "map" ? (
                  <PlotlyGeo chartDefinition={chartDefinition} />
                ) : (
                  <PlotlyBasic chartDefinition={chartDefinition} />
                )
              ) : null}
              <button
                className="govuk-button govuk-button--secondary non-content cb-download-button"
                data-module="govuk-button"
                style={{ marginTop: "32px", marginBottom: "32px" }}
                onClick={() => onDownloadClick(chartDefinition, selectedColumns)}
              >
                Download Data
              </button>
            </Suspense>
          </Tab>
          <Tab title="Chart Data">
            <TabularData
              chartDefinition={chartDefinition}
              selectedColumns={selectedColumns}
            />
          </Tab>
        </Tabs>
      ) : (
        <TabularData
          chartDefinition={chartDefinition}
          selectedColumns={selectedColumns}
        />
      )}
    </div>
  );
};
export default ChartPreview;

{
  /*       
      <Suspense fallback={<div />}>
          {isClientSideRender ? (
            chartType === "map" ? (
              <PlotlyGeo chartDefinition={chartDefinition} />
            ) : (
              <PlotlyBasic chartDefinition={chartDefinition} />
            )
          ) : null}
      </Suspense> */
}
