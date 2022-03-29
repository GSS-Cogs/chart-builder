import { VoidFunctionComponent } from "react";

interface Props {
  property: any;
  sectionName: string;
  updateProperty: (sectionName: string, property: any, value: any) => void;
}

const Checkbox: VoidFunctionComponent<Props> = ({
  property,
  sectionName,
  updateProperty,
}) => {
  const onCheckboxChange = (e: any) => {
    const { value: property, checked: value } = e.target;
    const sectionName = e.target.id.split("-")[0];
    updateProperty(sectionName, property, value);
  };
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

export default Checkbox;
