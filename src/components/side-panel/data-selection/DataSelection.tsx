import React, { useContext } from "react";
import ChartContext, { ChartContextProps } from "../../../context/ChartContext";
import SeriesSelection from "./series-selection/SeriesSelection";
import "./data-selection.css";
import SeriesPropertiesSelector from "../property-inputs/SeriesPropertiesSelector";

const options = [
  {
    name: "category",
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
    availableSeries,
    selectedColumns,
    setSelectedColumns,
  }: ChartContextProps = useContext(ChartContext);

  const getPropertyValue = (name: string) => {
    switch (name) {
      case "category":
        return dataSelection?.category;
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

    let previousValue = "";
    switch (name) {
      case "category":
        previousValue = dataSelection!.category;
        break;
      case "measure":
        previousValue = dataSelection!.measure;
        break;
      case "dimension":
        previousValue = dataSelection!.dimension;
        break;
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
      <SeriesSelection availableSeries={availableSeries} />
      <SeriesPropertiesSelector />
    </>
  );
};

export default DataSelection;
