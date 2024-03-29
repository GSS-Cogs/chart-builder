import React, { useContext } from "react";
import ChartContext, { ChartContextProps } from "../../../context/ChartContext";
import DimensionSelection from "./dimension-selection/DimensionSelection";
import "./data-selection.css";
import SeriesSelector from "../property-inputs/SeriesSelector";
import ConfidenceIntervalSelector from "../property-inputs/ConfidenceIntervalSelector";

const options = [
  {
    name: "xValues",
    labelName: "Category axis:",
  },
  {
    name: "measure",
    labelName: "Measure:",
  },
  {
    name: "dimension",
    labelName: "Dimension:",
  },
];

const DataSelection = (): JSX.Element => {
  const {
    dataSelection,
    setDataSelection,
    columnNames,
    availableDimensions,
    selectedColumns,
    setSelectedColumns,
  }: ChartContextProps = useContext(ChartContext);

  const getPropertyValue = (name: string) => {
    switch (name) {
      case "xValues":
        return dataSelection?.xValues;
      case "measure":
        return dataSelection?.measure;
      case "dimension":
        return dataSelection?.dimension;
    }
    return "";
  };

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (value !== "" && selectedColumns.some((item) => item === value)) {
      alert(
        `${value} has already been selected. Please choose a different column`,
      );
      setDataSelection((prevState: any) => ({
        ...prevState,
      }));
      return;
    }

    let newSelectedColumnNames = [...selectedColumns];
    switch (name) {
      case "xValues":
        newSelectedColumnNames[0] = value;
        break;
      case "measure":
        newSelectedColumnNames[1] = value;
        break;
      case "dimension":
        newSelectedColumnNames[2] = value;
        break;
    }
    setSelectedColumns(newSelectedColumnNames);
    setDataSelection((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="property-section">
        <div className="section-heading"> Data columns</div>
        {options.map((item) => (
          <div key={item.name} className="chart-property">
            <label className="column-label">{item.labelName}</label>
            <select
              className="chart-dimension-select"
              name={item.name}
              value={dataSelection ? getPropertyValue(item.name) : ""}
              onChange={onChange}
            >
              <option key="default" value="">
                --
              </option>
              {columnNames.map((columnName: string) => (
                <option key={columnName} value={columnName}>
                  {columnName}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <DimensionSelection availableDimensions={availableDimensions} />
      <SeriesSelector />
      <ConfidenceIntervalSelector />
    </>
  );
};

export default DataSelection;
