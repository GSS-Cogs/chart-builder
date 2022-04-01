import {useContext} from "react";
import ChartContext, { ChartContextProps } from "../../context/ChartContext";
import "./side-panel.css";
import Checkbox from "./property-inputs/Checkbox";
import RadioButtonGroup from "./property-inputs/RadioButtonGroup";
import Textbox from "./property-inputs/Textbox";
import TextArea from "./property-inputs/TextArea";
import SparqlInput from "./property-inputs/SparqlInput";
import DataSelectionSection from "./property-inputs/DataSelectionSection";
import chartPropertiesSchema from "../../context/ChartPropertiesSchema";
import {ChartPropertySchema} from "../../context/types";

interface ChartPropertyComponentProps {
  sectionName: string;
  property: ChartPropertySchema;
  updateProperty: (sectionName: string, property: string, value: number | string | boolean) => void;
  // compromise here. I don't know how to narrow the type of
  // value according to property.type.
  value: any,
}

function ChartPropertyComponent({
  sectionName,
  property,
  updateProperty,
  value
}: ChartPropertyComponentProps): JSX.Element {
  switch (property.type) {
    case 'checkbox':
      return (
        <Checkbox property={property} sectionName={sectionName} updateProperty={updateProperty} value={value}/>
      );
    case 'radio':
      return (
        <RadioButtonGroup property={property} sectionName={sectionName} updateProperty={updateProperty} value={value}/>
      );
    case 'text':
      return (
        <Textbox property={property} sectionName={sectionName} updateProperty={updateProperty} value={value}/>
      );
    case 'text-multi':
      return (
        <TextArea property={property} sectionName={sectionName} updateProperty={updateProperty} value={value}/>
      );
    default:
      // noinspection TypeScriptUnresolvedVariable
      return (
        // @ts-ignore
        <div>No control registered for properties of type {property.type}</div>
      );
  }
}

const SidePanel = (): JSX.Element => {
  const { chartProperties, setChartProperties: updateProperty }: ChartContextProps =
    useContext(ChartContext);

  const isAMap = chartProperties?.chartTypes?.chartType === "Map";

  return (
    <div id="side-panel">
      {chartPropertiesSchema.map((section: any, index: number) => {
        const showSection =
          section.sectionFor === "all" ||
          (section.sectionFor === "maps" && isAMap) ||
          (section.sectionFor === "charts" && !isAMap);

        // Show sections relevant to the visualisation type (chart/map/all)
        if (!showSection) return null;

        // get the data input component for either map or chart data
        const getDataInput = () =>
          isAMap ? (
            <SparqlInput />
          ) : (
            <DataSelectionSection sectionName={section.name} />
          );

        return (
          <div key={section.name + index}>
            <div className="property-section" key={section.name}>
              <div className="section-heading"> {section.displayName}</div>
              {section.properties.map((property: ChartPropertySchema) => (
                <ChartPropertyComponent
                  key={property.name}
                  sectionName={section.name}
                  property={property}
                  updateProperty={updateProperty}
                  value={chartProperties[section.name][property.name]}
                />
              ))}
            </div>
            {/* if we've just rendered the chart type section then render the data selection section next */}
            {section.name === "chartTypes" ? getDataInput() : null}
          </div>
        );
      })}
    </div>
  );
};
export default SidePanel;
