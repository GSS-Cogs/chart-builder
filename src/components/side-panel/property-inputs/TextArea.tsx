import {VoidFunctionComponent} from "react";
import {ChartPropertyText} from "../../../context/types";

export interface TextAreaInputProps {
  property: ChartPropertyText<number | string>;
  sectionName: string;
  updateProperty: (sectionName: string, property: string, value: number | boolean | string) => void;
  value: number | string;
}

const TextArea: VoidFunctionComponent<TextAreaInputProps> = ({
  property,
  sectionName,
  updateProperty,
  value,
}) => {
  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = e.target;
    updateProperty(sectionName, property.name, value);
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
          value={value}
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
