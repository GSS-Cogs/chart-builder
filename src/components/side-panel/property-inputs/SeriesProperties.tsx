import { useContext } from "react";
import "../../side-panel/side-panel.css";
import { colors } from "../../../helper-functions/chart-helpers";
import CustomSelect, { CustomSelectProps } from "../../select/CustomSelect";
import ChartContext from "../../../context/ChartContext";
import ColorOption from "../../select/ColorOption";
import LineStyleOption from "../../select/LineStyleOption";

interface Props {
  activeSeries: string;
}

const SeriesProperties = ({ activeSeries }: Props): JSX.Element => {
  const { selectedDimensions, setSelectedDimensions, chartProperties } =
    useContext(ChartContext);

  const selectedDimension = selectedDimensions.find(
    (d) => d.name === activeSeries,
  );

  const isALineChart = chartProperties.chartTypes.chartType === "Line";

  const updateDimension = (property: string, value: any) => {
    setSelectedDimensions((prev) =>
      prev.map((d) =>
        d.name === activeSeries ? { ...d, [property]: value } : d,
      ),
    );
  };

  const selectColorProps: CustomSelectProps = {
    selectedValue: selectedDimension!.color,
    options: colors,
    optionComponent: (value) => <ColorOption color={value} />,
    onChange: (value) => updateDimension("color", value),
    width: 10,
    id: "series-color",
  };
  const dashStyles = ["none", "dot", "dash"];
  const selectLineStyleProps: CustomSelectProps = {
    selectedValue: selectedDimension!.dashStyle,
    options: dashStyles,
    optionComponent: (value) => (
      <LineStyleOption lineStyle={value} color={selectedDimension!.color} />
    ),
    onChange: (value) => updateDimension("dashStyle", value),
    width: 10,
    id: "series-line-style",
  };

  return (
    <>
      <div className="chart-property">
        <label className="chart-property-label" htmlFor="series-color">
          Color:
        </label>
        <CustomSelect {...selectColorProps} />
      </div>
      {isALineChart && (
        <div className="chart-property">
          <label className="chart-property-label" htmlFor="series-line-style">
            Line style:
          </label>
          <CustomSelect {...selectLineStyleProps} />
        </div>
      )}
    </>
  );
};

export default SeriesProperties;
