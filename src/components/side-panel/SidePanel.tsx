import { useContext } from "react";
import { ChartContext } from "../../context/ChartContext";
import CSVUploader from "./csv-uploader/CSVUploader";
import { camelToSentenceCase } from "../../helper-functions/string-helpers";
import "./side-panel.css";

const SidePanel = (): JSX.Element => {
  const { chartProperties, setChartProperties }: any = useContext(ChartContext);

  const onCheckboxChange = (e: any) => {
    const { value: property, checked: value } = e.target;

    const sectionName = e.target.id.split("-")[0];

    let section = chartProperties.find(
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

  const onTextChange = (e: any) => {
    const { name: property, value } = e.target;
    setChartProperties({
      ...chartProperties,
      [property]: value,
    });
  };

  const onRadioButtonChange = (e: any) => {};
  const getCheckbox = (
    index: number,
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
          {camelToSentenceCase(property.displayname)}
        </label>
      </div>
    );
  };

  const getTextbox = (
    key: string,
    value: string,
    index: number,
    onTextChange: any,
  ) => {
    return (
      <div className="chart-property" key={key}>
        <label className="label" htmlFor={"chartProperty" + index}>
          {camelToSentenceCase(key)}:&nbsp;
        </label>
        <div className="property-textbox" key={key}>
          <input
            className="textbox"
            id={"chartProperty" + index}
            name={key}
            value={value}
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
          <div className="section-heading"> {section.name}</div>
          {section.properties.map((property: any, index: number) => {
            return getCheckbox(index, property, section.name, onCheckboxChange);
          })}
        </div>
      ))}
    </div>
  );
};
export default SidePanel;
