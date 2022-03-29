import { VoidFunctionComponent } from "react";

interface Props {
  property: any;
  sectionName: string;
  updateProperty: (sectionName: string, property: any, value: any) => void;
}

const Textbox: VoidFunctionComponent<Props> = ({
  property,
  sectionName,
  updateProperty,
}) => {
  const onTextChange = (e: any) => {
    const { name: property, value } = e.target;
    const sectionName = e.target.id.split("-")[0];
    updateProperty(sectionName, property, value);
  };

  return (
    <div className="chart-property" key={property.name}>
      <label
        className="chart-property-label"
        htmlFor={sectionName + "-" + property.name}
      >
        {property.displayName}:&nbsp;
      </label>
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

export default Textbox;
