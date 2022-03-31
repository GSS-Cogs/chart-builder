import {VoidFunctionComponent} from "react";
import {PropertyInputProps} from "./types";

const Checkbox: VoidFunctionComponent<PropertyInputProps> = ({
  property,
  sectionName,
  updateProperty,
  value,
}) => {
  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked: value } = e.target;
    updateProperty(sectionName, property.name, value);
  };
  return (
    <div className="inline-chart-property" key={property.name}>
      <input
        type="checkbox"
        className="checkbox"
        id={sectionName + "-" + property.name}
        name={property.name}
        value={property.name}
        checked={value}
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

export default Checkbox;
