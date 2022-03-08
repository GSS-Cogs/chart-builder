import { useContext } from "react";
import ChartContext, { ChartContextProps } from "../../context/ChartContext";
import { NO_FILE_SELECTED_TEXT } from "../constants/Common-constants";
import DataSelection from "./data-selection/DataSelection";
import "./side-panel.css";
import CSVUploader from "../side-panel/csv-uploader/CSVUploader";

const SidePanel = (): JSX.Element => {
  const {
    chartProperties,
    setChartProperties,
    selectedFilename,
    setSelectedFilename,
  }: ChartContextProps = useContext(ChartContext);

  const isAMap = chartProperties[0].properties[0].value === "Map";

  const updateProperty = (sectionName: string, property: any, value: any) => {
    const section = chartProperties.find(
      (item: any) => item.name === sectionName,
    );

    const updatedProperties = section.properties.map((item: any) => {
      if (item.name === property) {
        return {
          ...item,
          value,
        };
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

  const getCheckbox = (property: any, sectionName: string) => {
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
        {showDisplayName(property.displayName) && (
          <label
            className="inline-chart-property-label"
            htmlFor={sectionName + "-" + property.name}
          >
            {property.displayName}
          </label>
        )}
      </div>
    );
  };

  const getTextbox = (property: any, sectionName: string) => {
    return (
      <div className="chart-property" key={property.name}>
        {showDisplayName(property.displayName) && (
          <label
            className="chart-property-label"
            htmlFor={sectionName + "-" + property.name}
          >
            {property.displayName}:&nbsp;
          </label>
        )}
        <div className="property-textbox" key={property.name}>
          <input
            className={"textbox"}
            id={sectionName + "-" + property.name}
            name={property.name}
            value={property.value}
            autoComplete="off"
            onChange={onTextChange}
          />
        </div>
      </div>
    );
  };

  const getTextArea = (property: any, sectionName: string) => {
    return (
      <div className="chart-property" key={property.name}>
        {showDisplayName(property.displayName) && (
          <label
            className="chart-property-label"
            htmlFor={sectionName + "-" + property.name}
          >
            {property.displayName}:&nbsp;
          </label>
        )}
        <div className="property-textbox" key={property.name}>
          <textarea
            id={sectionName + "-" + property.name}
            name={property.name}
            value={property.value}
            cols={55}
            rows={9}
            autoComplete="off"
            onChange={onTextChange}
          />
        </div>
      </div>
    );
  };

  const resetChartState = () => {
    setSelectedFilename(NO_FILE_SELECTED_TEXT);
  };

  const showDisplayName = (displayName: string | undefined) => {
    return displayName != "";
  };

  const getRadioButtonGroup = (property: any, sectionName: string) => {
    return (
      <div className="radio-group" key={property.name}>
        {showDisplayName(property.displayName) && (
          <label className="chart-property-label">
            {property.displayName}:
          </label>
        )}
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

  const getDataSelectionSection = (sectionName: string) => {
    return (
      <div key={`${sectionName}-data-selection`}>
        <CSVUploader />
        <div className="property-section">
          <div id="data-source"> Data source</div>
          <label id="selected-filename">{selectedFilename}</label>
          <button className="close-button" onClick={() => resetChartState()}>
            {"Reset"}
          </button>
        </div>
        <DataSelection />
      </div>
    );
  };

  return (
    <div id="side-panel">
      {/* CSVUploader included here temporarily for continued dev //todo remove */}

      {chartProperties.map((section: any, index: number) => (
        <div key={section.name + index}>
          <div className="property-section" key={section.name}>
            <div className="section-heading"> {section.displayName}</div>
            {section.properties.map((property: any) => {
              if (property.type === "checkbox") {
                return getCheckbox(property, section.name);
              } else if (property.type === "text") {
                return getTextbox(property, section.name);
              } else if (property.type === "text-multi") {
                return getTextArea(property, section.name);
              } else if (property.type === "radio") {
                return getRadioButtonGroup(property, section.name);
              }
            })}
          </div>
          {section.name === "chartTypes" && !isAMap
            ? getDataSelectionSection(section.name)
            : null}
        </div>
      ))}
    </div>
  );
};
export default SidePanel;
