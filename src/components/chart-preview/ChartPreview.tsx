import { lazy, Suspense, useContext } from "react";
import ChartContext from "../../context/ChartContext";
import ChartPlaceholderIcon from "../../assets/icons/chart-preview/ChartPlaceholderIcon";
import "./chart-preview.css";
import TabularData from "./TabularData";
import Tabs from "../tabs/Tabs";
import Tab from "../tabs/Tab";
import useChartDataToCsv from "../../hooks/useChartDataToCsv";
import useSaveCsvData from "../../hooks/useSaveCsvData";

import tap from "../../assets/icons/click-tap.svg";

import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

// @ts-ignore
const PlotlyBasic = lazy(() => import("./PlotlyBasic"));
// @ts-ignore
const PlotlyGeo = lazy(() => import("./PlotlyGeo"));

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

  const { data, chartType, layout } = chartDefinition;
  const altChartType = data?.[0]?.type;

  // Incrementing the datarevision forces plotly to update the chart.
  // This is a workaround for an issue where plotly loses its
  // autorange calculations on component re-render.
  layout.datarevision++;

  const onDownloadClick = (chartDefinition: any, selectedColumns: any) => {
    const category = selectedColumns[0];
    const csv = useChartDataToCsv(chartDefinition.data, category, chartType);
    useSaveCsvData(csv, "chart-data");
  };

  const getFullFigureNode = (baseNode: any) => {
    let fullFigureNode = baseNode;
    for (let i = 0; i < 6; i++) {
      const tempParentNode = fullFigureNode.parentNode;
      if (tempParentNode.id === "chart") {
        fullFigureNode = tempParentNode.parentNode.parentNode;
        break;
      }
      fullFigureNode = tempParentNode;
    }

    return fullFigureNode;
  };

  const onFigureDownloadClick = (e: any) => {
    const fullFigureNode = getFullFigureNode(e.target);

    let figureCloneNode = fullFigureNode.cloneNode(true);
    let emptyNode = document.createElement("div");
    emptyNode.setAttribute(
      "style",
      "position: absolute; opacity: 0; pointerEvents: none; width: 1280px;",
    );
    figureCloneNode.setAttribute("style", "background-color: white;");
    emptyNode.append(figureCloneNode);
    fullFigureNode.append(emptyNode);

    downloadFigure(figureCloneNode);
  };

  const downloadFigure = (node: any) => {
    // temporarily add 32px padding either side of the figure to give the downloaded image space around it
    node.classList.add("pad-for-download");
    // hide any elements that should not be included in the image (e.g. the Download button)
    toggleDisplay("non-content", "none", node);
    domtoimage.toBlob(node).then(function (blob) {
      saveAs(blob, `${"chart-figure"}.png`);
      toggleDisplay("non-content", "initial", node);
      node.remove();
    });
  };

  function toggleDisplay(className: string, displayState: string, node: any) {
    let elements = node.querySelectorAll("." + className);
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = displayState;
    }
  }

  return (
    <div id="chart">
      {chartType !== "table" ? (
        <Tabs>
          <Tab title="Visualisation">
            <Suspense fallback={<div />}>
              {isClientSideRender ? (
                chartType === "map" || altChartType === "choropleth" ? (
                  <PlotlyGeo chartDefinition={chartDefinition} />
                ) : (
                  <PlotlyBasic chartDefinition={chartDefinition} />
                )
              ) : null}
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
      <div className="non-content">
        <div className="prompt-wrapper">
          <img src={tap} />
          <div className="prompt-text">
            Click or tap on legend items to toggle visibility
          </div>
        </div>
        <h3 className="govuk-heading-s govuk-!-margin-bottom-2 non-content cb-download">
          Download
        </h3>
        <div id="chart-download" className="">
          <button
            className="govuk-button govuk-button--secondary non-content govuk-!-margin-right-3 cb-download-button"
            data-module="govuk-button"
            onClick={(e) => onFigureDownloadClick(e)}
          >
            Visualisation
          </button>
          <button
            className="govuk-button govuk-button--secondary non-content cb-download-button"
            data-module="govuk-button"
            onClick={() => onDownloadClick(chartDefinition, selectedColumns)}
          >
            Data
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChartPreview;
