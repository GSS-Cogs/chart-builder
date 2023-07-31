import { lazy, Suspense, useContext, useState, useEffect } from "react";
import ChartContext from "../../context/ChartContext";
import ChartPlaceholderIcon from "../../assets/icons/chart-preview/ChartPlaceholderIcon";
import "./chart-preview.css";
import TabularData from "./TabularData";
import Tabs from "../tabs/Tabs";
import Tab from "../tabs/Tab";
import useChartDataToCsv from "../../hooks/useChartDataToCsv";
import useSaveCsvData from "../../hooks/useSaveCsvData";

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
  const [tableChartDefinition, setTableChartDefinititon] = useState({});
  const [hiddenIndexesState, setHiddenIndexesState] = useState<number[]>([]);
  let hiddenColumnIndexes: number[] = hiddenIndexesState;
  // hiddenColumnIndexes allows us to change the data without a rerender
  // but also a by product of clicking the plotly legend doesn't set state
  // hiddenIndexesState is used to keep state when switching tabs
  // hiddenIndexesState is also set when switching to tabular view
  // and will be set with the latest hiddenColumnIndexes

  useEffect(() => {
    setTableChartDefinititon(chartDefinition);
  }, [chartDefinition]);

  const emptyDataState = Object.keys(chartDefinition).length === 0;

  if (emptyDataState)
    return (
      <div id="chart-empty-state-container">
        <div id="chart-empty-state">
          <ChartPlaceholderIcon />
        </div>
      </div>
    );

  const { data, chartType, layout, exploreDataLink } = chartDefinition;
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

  const onLegendClick = (e: any) => {
    // check if 'e.curveNumber' is in hiddenColumnIndexes
    // if it is, that means its currently hidden and needs to be removed and made visible
    // if it isn't, that means its currently visible and needs to be added and hidden

    // e.data shows what series are visible BUT it is showing the state at the time before
    // the clicking so can't be used for current hidden/visible series
    // this causes more problems with onLegendDoubleClick where multiple series can be
    // made hidden/visible in one trigger

    if (hiddenColumnIndexes.includes(e.curveNumber)) {
      const index = hiddenColumnIndexes.indexOf(e.curveNumber);
      if (index > -1) {
        hiddenColumnIndexes.splice(index, 1);
      }
    } else {
      hiddenColumnIndexes.push(e.curveNumber);
    }
    filterData(e.data, hiddenColumnIndexes);
  };

  const onLegendDoubleClick = (e: any) => {
    // a note on how plotly legend double click works
    // when all series are visible, it will hide all series except the one clicked on
    // when only one series is visible, and any are clicked, it will make all series visible
    // when two or fewer series are hidden, and the one clicked is visible, it will hide all series except the one clicked on
    // when two or fewer series are hidden, and the one clicked is hidden, it will make all series visible

    // to keep track of what series are hidden we have an array hiddenColumnIndexes
    // this has the 'curveNumber' of each data series

    let numberedArray = e.data.map((_elem: any, index: any) => index);
    if (hiddenColumnIndexes.includes(e.curveNumber)) {
      filterData(e.data, []);
    } else if (hiddenColumnIndexes.length < e.data.length - 1) {
      const temp = numberedArray.filter((x: any) => x !== e.curveNumber);
      filterData(e.data, temp);
    } else {
      filterData(e.data, []);
    }
  };

  const filterData = (data: any[], indexes: number[]) => {
    const filteredData = data.filter(
      (_element: any, index: number) => !indexes.includes(index),
    );
    // this setting of hiddenColumnIndexes is here because onLegendClick fires twice when
    // onLegendDoubleClick is trigged, it is to make sure the correct indexes are assigned
    hiddenColumnIndexes = [...indexes];
    setHiddenIndexesState(hiddenColumnIndexes);
    setTableChartDefinititon({ ...chartDefinition, data: filteredData });
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
        <Tabs link={exploreDataLink}>
          <Tab title="Visualisation">
            {isClientSideRender ? (
              <Suspense fallback={<div />}>
                {chartType === "map" || altChartType === "choropleth" ? (
                  <PlotlyGeo chartDefinition={chartDefinition} />
                ) : (
                  <PlotlyBasic
                    chartDefinition={chartDefinition}
                    onLegendClick={onLegendClick}
                    onLegendDoubleClick={onLegendDoubleClick}
                  />
                )}
              </Suspense>
            ) : null}
          </Tab>
          <Tab title="Chart Data">
            <TabularData
              chartDefinition={tableChartDefinition}
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
            onClick={() =>
              onDownloadClick(tableChartDefinition, selectedColumns)
            }
          >
            Data
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChartPreview;
