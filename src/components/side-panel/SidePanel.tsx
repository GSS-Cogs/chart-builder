import { useContext } from "react";
import ChartContext, { ChartContextProps } from "../../context/ChartContext";
import "./side-panel.css";
import Checkbox from "./property-inputs/Checkbox";
import Range from "./property-inputs/Range";
import RadioButtonGroup from "./property-inputs/RadioButtonGroup";
import Textbox from "./property-inputs/Textbox";
import TextArea from "./property-inputs/TextArea";
import chartPropertiesSchema from "../../context/ChartPropertiesSchema";
import { ChartPropertySchema } from "../../context/types";
import DataSelection from "./data-selection/DataSelection";

interface ChartPropertyComponentProps {
  sectionName: string;
  property: ChartPropertySchema;
  updateProperty: (
    sectionName: string,
    property: string,
    value: number | string | boolean,
  ) => void;
  // compromise here. I don't know how to narrow the type of
  // value according to property.type.
  value: any;
}

function ChartPropertyComponent({
  sectionName,
  property,
  updateProperty,
  value,
}: ChartPropertyComponentProps): JSX.Element {
  switch (property.type) {
    case "checkbox":
      return (
        <Checkbox
          property={property}
          sectionName={sectionName}
          updateProperty={updateProperty}
          value={value}
        />
      );
    case "radio":
      return (
        <RadioButtonGroup
          property={property}
          sectionName={sectionName}
          updateProperty={updateProperty}
          value={value}
        />
      );
    case "range":
      return (
        <Range
          property={property}
          sectionName={sectionName}
          updateProperty={updateProperty}
          value={value}
        />
      );
    case "text":
      return (
        <Textbox
          property={property}
          sectionName={sectionName}
          updateProperty={updateProperty}
          value={value}
        />
      );
    case "text-multi":
      return (
        <TextArea
          property={property}
          sectionName={sectionName}
          updateProperty={updateProperty}
          value={value}
        />
      );
    default:
      // noinspection TypeScriptUnresolvedVariable
      return (
        // @ts-ignore
        <div>No control registered for properties of type {property.type}</div>
      );
  }
}

interface SidePanelProps {
  renderDataSelector: () => JSX.Element | null;
  renderGeoJsonSelector: () => JSX.Element | null;
}

const SidePanel = ({
  renderDataSelector,
  renderGeoJsonSelector,
}: SidePanelProps): JSX.Element => {
  const {
    chartProperties,
    setChartProperties: updateProperty,
  }: ChartContextProps = useContext(ChartContext);

  const isAMap = chartProperties?.chartTypes?.chartType === "Map";

  const isACompactBar =
    chartProperties?.chartTypes?.chartType === "Compact Bar";
  const isAutoXTickMode =
    chartProperties.xAxisProperties.xAxisTickMode === "auto";

  const isAutoYTickMode =
    chartProperties.yAxisProperties.yAxisTickMode === "auto";

  const shouldRenderProperty = (property: any): boolean => {
    // If X axis tick mode is auto then don't render the manual tick properties
    if (
      property.name === "xAxisTickInterval" ||
      property.name === "xAxisTickLabelLength" ||
      property.name === "xAxisFirstTickLabel" ||
      property.name === "xAxisLastTickLabel"
    ) {
      return !isAutoXTickMode;
    }

    // If Y axis tick mode is auto then don't render the manual tick properties
    if (
      property.name === "yAxisTickInterval" ||
      property.name === "yAxisTickLabelLength" ||
      property.name === "yAxisFirstTickLabel" ||
      property.name === "yAxisLastTickLabel"
    ) {
      return !isAutoYTickMode;
    }

    // Show the N ticks property if the X axis tick labels are set to auto
    if (property.name === "xAxisNTicks") return isAutoXTickMode;

    // Show the N ticks property if the Y axis tick labels are set to auto
    if (property.name === "yAxisNTicks") return isAutoYTickMode;

    // Render any other properties unconditionally
    return true;
  };

  const shouldShowSection = ({ name, sectionFor }: any): boolean => {
    if (isACompactBar) {
      return name === "chartDimensionProperties" ||
        name === "chartTypes" ||
        name === "compactBarChartProperties"
        ? true
        : false;
    }

    return (
      sectionFor === "all" ||
      (sectionFor === "maps" && isAMap) ||
      (sectionFor === "charts" && !isAMap)
    );
  };

  return (
    <div id="side-panel">
      {chartPropertiesSchema.map((section: any, index: number) => {
        const showSection = shouldShowSection(section);
        // Show sections relevant to the visualisation type (chart/map/all)
        if (!showSection) return null;

        return (
          <div key={section.name + index}>
            <div className="property-section" key={section.name}>
              <div className="section-heading"> {section.displayName}</div>
              {section.properties.map((property: ChartPropertySchema) => {
                if (!shouldRenderProperty(property)) return null;
                return (
                  <ChartPropertyComponent
                    key={property.name}
                    sectionName={section.name}
                    property={property}
                    updateProperty={updateProperty}
                    value={chartProperties[section.name][property.name]}
                  />
                );
              })}
            </div>
            {/* if we've just rendered the chart type section render data source next */}
            {section.name === "chartTypes" ? renderDataSelector() : null}
            {section.name === "chartTypes" && isAMap
              ? renderGeoJsonSelector()
              : null}

            {/* If its not a map then render the data selection component */}
            {section.name === "chartTypes" && !isAMap ? (
              <DataSelection />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
export default SidePanel;
