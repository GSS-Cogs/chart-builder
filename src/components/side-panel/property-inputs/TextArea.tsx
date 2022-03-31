import { VoidFunctionComponent } from "react";

interface Props {
  property: any;
  sectionName: string;
  updateProperty: (sectionName: string, property: any, value: any) => void;
}

const TextArea: VoidFunctionComponent<Props> = ({
  property,
  sectionName,
  updateProperty,
}) => {
  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name: property, value } = e.target;
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
        <textarea
          id={sectionName + "-" + property.name}
          name={property.name}
          value={property.value}
          cols={55}
          rows={9}
          autoComplete="off"
          onChange={onTextChange}
        />
      </div>
    </div>
  );
};

export default TextArea;
