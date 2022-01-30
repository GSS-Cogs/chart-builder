import { useContext, useState } from "react";
import ChartContext, { ChartContextProps } from "../../../context/ChartContext";
import { getDistinctValues } from "../../../helper-functions/array-helpers";
import DimensionSelection from "./dimension-selection/DimensionSelection";
import "./data-selection.css";

const DataSelection = (): JSX.Element => {
  const {
    dataSelection,
    setDataSelection,
    tidyData,
    columnNames,
  }: ChartContextProps = useContext(ChartContext);
  const [availableDimensions, setAvailableDimensions] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  const onHandleChange = (e: any) => {
    console.log(columnNames);
    if (
      e.target.value === "" ||
      selectedColumns.some((item) => item === e.target.value)
    ) {
      alert(
        `${e.target.value} has already been selected. Please choose a different column`,
      );
      setDataSelection((prevState: any) => ({
        ...prevState,
      }));
    } else {
      let previousValue = "";
      if (e.target.name === "xSeries") {
        previousValue = dataSelection!.xSeries;
      } else if (e.target.name === "measure") {
        previousValue = dataSelection!.measure;
      } else if (e.target.name === "dimension") {
        previousValue = dataSelection!.dimension;
      }
      if (previousValue) {
        let newSelectedColumnNames = [];
        const alreadySelectedColumnNames = selectedColumns.filter(
          (item) => item !== previousValue,
        );
        newSelectedColumnNames.push(...alreadySelectedColumnNames);
        newSelectedColumnNames.push(e.target.value);
        setSelectedColumns(newSelectedColumnNames);
      } else {
        setSelectedColumns([...selectedColumns, e.target.value]);
      }
      setDataSelection((prevState: any) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }

    if (e.target.name === "dimension" && e.target.value !== "") {
      setAvailableDimensions(getDistinctValues(e.target.value, tidyData));
    }
  };
  return (
    <>
      <div className="chart-property">
        <label>Category Axis:&nbsp;</label>
        <select
          className="chart-dimension-select"
          name="xSeries"
          value={dataSelection ? dataSelection.xSeries : ""}
          onChange={onHandleChange}
        >
          <option key="defaultXSeries" value="">
            --
          </option>
          {columnNames.map((columnName: string, index: number) => (
            <option key={columnName} value={columnName}>
              {columnName}
            </option>
          ))}
        </select>
      </div>

      <div className="chart-property">
        <label>Measure:&nbsp;</label>
        <select
          className="chart-dimension-select"
          name="measure"
          value={dataSelection ? dataSelection.measure : ""}
          onChange={onHandleChange}
        >
          <option key="defaultMeasure" value="">
            --
          </option>
          {columnNames.map((columnName: string, index: number) => (
            <option key={columnName} value={columnName}>
              {columnName}
            </option>
          ))}
        </select>
      </div>

      <div className="chart-property">
        <label>Dimension:&nbsp;</label>
        <select
          className="chart-dimension-select"
          name="dimension"
          value={dataSelection ? dataSelection.dimension : ""}
          onChange={onHandleChange}
        >
          <option key="defaultDimension" value="">
            --
          </option>
          {columnNames.map((columnName: string, index: number) => (
            <option key={columnName} value={columnName}>
              {columnName}
            </option>
          ))}
        </select>
      </div>

      <DimensionSelection availableDimensions={availableDimensions} />
    </>
  );
};

export default DataSelection;