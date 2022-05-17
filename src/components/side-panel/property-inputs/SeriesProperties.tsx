import "./series-properties.css";
import { colors } from "../../../helper-functions/chart-helpers";
import CustomSelect, { CustomSelectProps } from "../../select/CustomSelect";

interface Props {
  activeSeries: string;
}

const selectColorProps: CustomSelectProps = {
  optionType: "color",
  placeholder: "Select colour",
  width: 8,
};

const selectLineStyleProps: CustomSelectProps = {
  optionType: "lineStyle",
  placeholder: "Select line style",
  width: 8,
};

const SeriesProperties = ({ activeSeries }: Props): JSX.Element => {
  const lineStyles = ["solid", "dashed", "dotted"];
  return (
    <div id="series-properties">
      <CustomSelect {...selectColorProps} />
      <CustomSelect {...selectLineStyleProps} />
    </div>
  );
};

export default SeriesProperties;
