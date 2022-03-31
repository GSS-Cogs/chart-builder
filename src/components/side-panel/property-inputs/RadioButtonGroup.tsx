import { VoidFunctionComponent } from "react";
import { PropertyInputProps } from "./types";

const RadioButtonGroup: VoidFunctionComponent<PropertyInputProps> = ({
  property,
  sectionName,
  updateProperty,
  value,
}) => {
  const onRadioButtonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateProperty(sectionName, property.name, value);
  };

  // if the displayName is empty then we don't want to display it
  const showPropertyLabel = property.displayName !== "";
  return (
    <div className="radio-group" key={property.name}>
      {showPropertyLabel && (
        <label className="chart-property-label">{property.displayName}:</label>
      )}
      {property.options.map((option: string, index: number) => (
        <div className="property-option" key={`${option}${index}`}>
          <input
            type="radio"
            className="radio"
            id={sectionName + "-" + property.name + option}
            name={property.name}
            value={option}
            checked={value === option}
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

export default RadioButtonGroup;
