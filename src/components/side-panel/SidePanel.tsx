import { useContext } from "react";
import { ChartContext } from "../../context/ChartContext";
import CSVUploader from "./csv-uploader/CSVUploader";
import { camelToSentenceCase } from "../../helper-functions/string-helpers";
import "./side-panel.css";

const SidePanel = (): JSX.Element => {
  const { chartProperties, setChartProperties }: any = useContext(ChartContext);

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

  const onRadioButtonChange = (e: any) => {};
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

  const getRadioButtonGroup = (
    key: string,
    value: string[],
    index: number,
    onRadioButtonChange: any,
  ) => {
    return (
      <div className="radio-group" key={key}>
        {value.map((option, index) => (
          <div className="chart-property" key={option}>
            <input
              type="radio"
              className="radio"
              id={"chartProperty" + index}
              name={option}
              value={key}
              onChange={onRadioButtonChange}
            />
            <label className="label" htmlFor={"chartProperty" + index}>
              {camelToSentenceCase(option)}
            </label>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div id="side-panel">
      <p id="data-source">Data Source</p>
      <CSVUploader />

      <h3>Configure the Chart</h3>
      {chartProperties.map((section: any, index: number) => (
        <div className="property-section" key={section.name}>
          <div className="section-heading"> {section.displayName}</div>
          {section.properties.map((property: any, index: number) => {
            if (property.displayType === "checkbox") {
              return getCheckbox(property, section.name, onCheckboxChange);
            }
            if (property.displayType === "text") {
              return getTextbox(property, section.name, onTextChange);
            }
          })}
        </div>
      ))}
    </div>
  );
};
export default SidePanel;
