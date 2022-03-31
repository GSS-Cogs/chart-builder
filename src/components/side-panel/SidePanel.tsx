import { useContext } from "react";
import ChartContext, { ChartContextProps } from "../../context/ChartContext";
import "./side-panel.css";
import Checkbox from "./property-inputs/Checkbox";
import RadioButtonGroup from "./property-inputs/RadioButtonGroup";
import Textbox from "./property-inputs/Textbox";
import TextArea from "./property-inputs/TextArea";
import SparqlInput from "./property-inputs/SparqlInput";
import DataSelectionSection from "./property-inputs/DataSelectionSection";
import chartPropertiesSchema from "../../context/ChartPropertiesSchema";

const mapTypeToComponent = {
  checkbox: Checkbox,
  radio: RadioButtonGroup,
  text: Textbox,
  "text-multi": TextArea,
};

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
              {section.properties.map((property: any) => {
                const Component =
                  mapTypeToComponent[
                    property.type as keyof typeof mapTypeToComponent
                  ];

                return (
                  <Component
                    key={property.name}
                    property={property}
                    sectionName={section.name}
                    updateProperty={updateProperty}
                    value={chartProperties[section.name][property.name]}
                  />
                );
              })}
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
