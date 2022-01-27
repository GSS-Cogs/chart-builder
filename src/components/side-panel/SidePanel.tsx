import { stringify } from "querystring";
import { useContext, useEffect, useState } from "react";
import { ChartContext } from "../../context/ChartContext";
import { SelectedDimension } from "../../context/ChartContextProvider";
import { getDistinctValues } from "../../helper-functions/array-helpers";
import { NO_FILE_SELECTED_TEXT } from "../constants/Common-constants";
import "./side-panel.css";

const SidePanel = (): JSX.Element => {
  const { tidyData }: any = useContext(ChartContext);
  const { chartProperties, setChartProperties }: any = useContext(ChartContext);
  const { selectedFilename, setSelectedFilename }: any =
    useContext(ChartContext);
  const { previewMode, setPreviewMode }: any = useContext(ChartContext);
  const { columnNames }: any = useContext(ChartContext);
  const { dataSelection, setDataSelection }: any = useContext(ChartContext);

  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [availableDimensions, setAvailableDimensions] = useState<string[]>([]);
  const [selectedDimensions, setSelectedDimensions] = useState<
    SelectedDimension[]
  >([]);

  useEffect(() => {
    setDataSelection((prevState: any) => ({
      ...prevState,
      ySeries: selectedDimensions,
    }));
  }, [selectedDimensions]);

  const updateProperty = (sectionName: string, property: any, value: any) => {
    const section = chartProperties.find(
      (item: any) => item.name === sectionName,
    );

    const updatedProperties = section.properties.map((item: any) => {
      if (item.name === property) {
        item.value = value;
        return item;
      }
      return item;
    });

    const updatedSection = {
      name: section.name,
      displayName: section.displayName,
      properties: updatedProperties,
    };

    // update the chart properties with the updated section
    const updatedChartProperties = chartProperties.map((item: any) => {
      if (item.name === section.name) {
        return updatedSection;
      }
      return item;
    });

    setChartProperties(updatedChartProperties);
  };

  const onCheckboxChange = (e: any) => {
    const { value: property, checked: value } = e.target;
    const sectionName = e.target.id.split("-")[0];
    updateProperty(sectionName, property, value);
  };

  const onTextChange = (e: any) => {
    const { name: property, value } = e.target;
    const sectionName = e.target.id.split("-")[0];
    updateProperty(sectionName, property, value);
  };

  const onRadioButtonChange = (e: any) => {
    const { name: property, value } = e.target;
    const sectionName = e.target.id.split("-")[0];
    updateProperty(sectionName, property, value);
  };

  const getCheckbox = (
    property: any,
    sectionName: string,
    onCheckboxChange: any,
  ) => {
    return (
      <div className="chart-property" key={property.name}>
        <input
          type="checkbox"
          className="checkbox"
          id={sectionName + "-" + property.name}
          name={property.name}
          value={property.name}
          checked={property.value}
          onChange={onCheckboxChange}
        />
        <label className="label" htmlFor={sectionName + "-" + property.name}>
          {property.displayName}
        </label>
      </div>
    );
  };

  const getTextbox = (
    property: any,
    sectionName: string,
    onTextChange: any,
  ) => {
    return (
      <div className="chart-property" key={property.name}>
        <label className="label" htmlFor={sectionName + "-" + property.name}>
          {property.displayName}:&nbsp;
        </label>
        <div className="property-textbox" key={property.name}>
          <input
            className="textbox"
            id={sectionName + "-" + property.name}
            name={property.name}
            value={property.value}
            onChange={onTextChange}
          />
        </div>
      </div>
    );
  };

  //Waqas

  const handleAddDimensionClick = () => {
    if (selectedDimensions.length === availableDimensions.length) return;
    if (selectedDimensions.length === 0) {
      const defaultSelectedDimension = availableDimensions[0];
      setSelectedDimensions([
        ...selectedDimensions,
        {
          Name: defaultSelectedDimension,
          DisplayName: defaultSelectedDimension,
        },
      ]);
    } else {
      const nonSelectedAvailableDimensions = availableDimensions.filter(
        (possibleDimension: string) =>
          !selectedDimensions
            .map((item) => item.Name)
            .includes(possibleDimension),
      );
      setSelectedDimensions([
        ...selectedDimensions,
        {
          Name: nonSelectedAvailableDimensions[0],
          DisplayName: nonSelectedAvailableDimensions[0],
        },
      ]);
    }
  };

  const handleSelectedDimensionChange = (e: any) => {
    setSelectedDimensions([
      ...selectedDimensions,
      { Name: e.target.value, DisplayName: e.target.value },
    ]);
  };

  const handleInputChange = (e: any, index: number) => {
    const { name, value } = e.target;
    const newDimensions = [...selectedDimensions];
    const dimension: SelectedDimension = {
      Name: name,
      DisplayName: value,
    };
    const updatedDimensions = newDimensions.map((item, index) => {
      return item.Name === name ? dimension : item;
    });
    setSelectedDimensions(updatedDimensions);
  };

  const createDimensionList = () => {
    return selectedDimensions.map((dimension, index) => {
      return (
        <div key={index}>
          <select
            className="y-series-select"
            name={dimension.Name}
            value={dimension.Name}
            onChange={handleSelectedDimensionChange}
          >
            {availableDimensions.map((columnName: string, index: number) => (
              <option key={columnName} value={columnName}>
                {columnName}
              </option>
            ))}
          </select>
          <input
            type="text"
            name={dimension.Name}
            value={dimension.DisplayName}
            onChange={(e) => handleInputChange(e, index)}
          />
        </div>
      );
    });
  };

  const resetChartState = () => {
    setPreviewMode(false);
    setSelectedFilename(NO_FILE_SELECTED_TEXT);
  };

  const getRadioButtonGroup = (
    property: any,
    sectionName: string,
    onRadioButtonChange: any,
  ) => {
    return (
      <div className="radio-group" key={property.name}>
        <label>{property.displayName}:</label>
        {property.options.map((option: string, index: number) => (
          <div className="chart-property" key={`${option}${index}`}>
            <input
              type="radio"
              className="radio"
              id={sectionName + "-" + property.name + option}
              name={property.name}
              value={option}
              checked={property.value === option}
              onChange={onRadioButtonChange}
            />
            <label
              className="label"
              htmlFor={sectionName + "-" + property.name + option}
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    );
  };

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
      const previousValue = setDataSelection && setDataSelection[e.target.name];
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
    <div id="side-panel">
      <p id="data-source">Data Source</p>
      <label id="selected-filename">{selectedFilename}</label>
      {previewMode && (
        <button className="close-button" onClick={() => resetChartState()}>
          {"Reset"}
        </button>
      )}

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

      <div className="dimension-preference">
        {createDimensionList()}
        <button className="add-dimension" onClick={handleAddDimensionClick}>
          {"+"}
        </button>
      </div>

      {chartProperties.map((section: any, index: number) => (
        <div className="property-section" key={section.name}>
          <div className="section-heading"> {section.displayName}</div>
          {section.properties.map((property: any, index: number) => {
            if (property.type === "checkbox") {
              return getCheckbox(property, section.name, onCheckboxChange);
            } else if (property.type === "text") {
              return getTextbox(property, section.name, onTextChange);
            } else if (property.type === "radio") {
              return getRadioButtonGroup(
                property,
                section.name,
                onRadioButtonChange,
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};
export default SidePanel;
