import {VoidFunctionComponent} from "react";
import {ChartPropertyText} from "../../../context/types";

export interface TextboxProps {
  property: ChartPropertyText<number | string>;
  sectionName: string;
  updateProperty: (sectionName: string, property: string, value: number | boolean | string) => void;
  value: number | string;
}

const Textbox: VoidFunctionComponent<TextboxProps> = ({
  property,
  sectionName,
  updateProperty,
  value,
}) => {
  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
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
        <input
          className={"textbox"}
          id={sectionName + "-" + property.name}
          name={property.name}
          value={value}
          autoComplete="off"
          onChange={onTextChange}
        />
      </div>
    </div>
  );
};

export default Textbox;
