import { useContext } from "react";
import ChartContext, { ChartContextProps } from "../../context/ChartContext";
import { NO_FILE_SELECTED_TEXT } from "../constants/Common-constants";
import DataSelection from "./data-selection/DataSelection";
import "./side-panel.css";

const SidePanel = (): JSX.Element => {
  const {
    chartProperties,
    setChartProperties,
    selectedFilename,
    setSelectedFilename,
    previewMode,
    setPreviewMode,
  }: ChartContextProps = useContext(ChartContext);

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
      <div className="inline-chart-property" key={property.name}>
        <input
          type="checkbox"
          className="checkbox"
          id={sectionName + "-" + property.name}
          name={property.name}
          value={property.name}
          checked={property.value}
          onChange={onCheckboxChange}
        />
        <label
          className="inline-chart-property-label"
          htmlFor={sectionName + "-" + property.name}
        >
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
        <label
          className="chart-property-label"
          htmlFor={sectionName + "-" + property.name}
        >
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
        <label className="chart-property-label">{property.displayName}:</label>
        {property.options.map((option: string, index: number) => (
          <div className="property-option" key={`${option}${index}`}>
            <input
              type="radio"
              className="radio"
              id={sectionName + "-" + property.name + option}
              name={property.name}
              value={option}
              checked={property.value === option}
              onChange={onRadioButtonChange}
            />
            <label htmlFor={sectionName + "-" + property.name + option}>
              {option}
            </label>
          </div>
        ))}
      </div>
    );
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

      <DataSelection />

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
