import { VoidFunctionComponent } from "react";
import { ChartPropertyRange } from "../../../context/types";

export interface RangeProps {
  property: ChartPropertyRange<string>;
  sectionName: string;
  updateProperty: (
    sectionName: string,
    property: string,
    value: string,
  ) => void;
  value: number;
}

const Range: VoidFunctionComponent<RangeProps> = ({
  property,
  sectionName,
  updateProperty,
  value,
}) => {
  const onRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(property);
    updateProperty(sectionName, property.name, value);
  };
  return (
    <div className="inline-chart-property" key={property.name}>
      <label
        className="inline-chart-property-label"
        htmlFor={sectionName + "-" + property.name}
      >
        {property.displayName}
      </label>
      <input
        type="range"
        className="range"
        id={sectionName + "-" + property.name}
        name={property.name}
        value={value}
        onChange={onRangeChange}
        min={property.min}
        max={property.max}
        step={property.step}
        defaultValue={property.defaultValue}
      />
      <label
        className="inline-chart-property-label"
        htmlFor={sectionName + "-" + property.name}
      >
        {value}
      </label>
    </div>
  );
};

export default Range;
