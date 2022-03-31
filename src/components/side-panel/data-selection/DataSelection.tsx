import React, { useContext } from "react";
import ChartContext, {ChartContextProps} from "../../../context/ChartContext";
import DimensionSelection from "./dimension-selection/DimensionSelection";
import "./data-selection.css";

const options = [
  {
    name: "xSeries",
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
      case "xSeries":
        return dataSelection?.xSeries;
      case "measure":
        return dataSelection?.measure;
      case "dimension":
        return dataSelection?.dimension;
    }
    return "";
  };

  const onHandleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (value === "" || selectedColumns.some((item) => item === value)) {
      alert(
        `${value} has already been selected. Please choose a different column`,
      );
      setDataSelection((prevState: any) => ({
        ...prevState,
      }));
    } else {
      let previousValue = "";
      if (name === "xSeries") {
        previousValue = dataSelection!.xSeries;
      } else if (name === "measure") {
        previousValue = dataSelection!.measure;
      } else if (name === "dimension") {
        previousValue = dataSelection!.dimension;
      }
      if (previousValue) {
        let newSelectedColumnNames = [];
        const alreadySelectedColumnNames = selectedColumns.filter(
          (item) => item !== previousValue,
        );
        newSelectedColumnNames.push(...alreadySelectedColumnNames);
        newSelectedColumnNames.push(value);
        setSelectedColumns(newSelectedColumnNames);
      } else {
        setSelectedColumns([...selectedColumns, value]);
      }
      setDataSelection((prevState: any) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <div className="property-section">
        <div className="section-heading"> Data columns</div>
        {options.map((item, index) => (
          <div key={item.name} className="chart-property">
            <label className="column-label">{item.labelName}</label>
            <select
              className="chart-dimension-select"
              name={item.name}
              value={dataSelection ? getPropertyValue(item.name) : ""}
              onChange={onHandleChange}
            >
              <option key="default" value="">
                --
              </option>
              {columnNames.map((columnName: string, index: number) => (
                <option key={columnName} value={columnName}>
                  {columnName}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <DimensionSelection availableDimensions={availableDimensions} />
    </>
  );
};

export default DataSelection;
