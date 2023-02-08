import { useContext } from "react";
import "../../side-panel/side-panel.css";
import CustomSelect, { CustomSelectProps } from "../../select/CustomSelect";
import ChartContext from "../../../context/ChartContext";

interface Props {
  activeSeries: string;
  columnNames: string[];
}

const ConfidenceProperties = ({
  activeSeries,
  columnNames,
}: Props): JSX.Element => {
  const { selectedDimensions, setSelectedDimensions } =
    useContext(ChartContext);

  // Get the selected dimension based on the active series prop
  const selectedDimension = selectedDimensions.find(
    (d) => d.name === activeSeries,
  );

  // Shared updater for updating the color and dashStyle properties on the selected dimension
  const updateDimension = (property: string, value: any) => {
    setSelectedDimensions((prev) =>
      prev.map((d) =>
        d.name === activeSeries ? { ...d, [property]: value } : d,
      ),
    );
  };

  const selectLowerProps: CustomSelectProps = {
    selectedValue: selectedDimension!.lowerBoundSeries,
    options: columnNames,
    optionComponent: (value) => <div>{value}</div>,
    onChange: (value) => updateDimension("lowerBoundSeries", value),
  };

  const selectUpperProps: CustomSelectProps = {
    selectedValue: selectedDimension!.upperBoundSeries,
    options: columnNames,
    optionComponent: (value) => <div>{value}</div>,
    onChange: (value) => updateDimension("upperBoundSeries", value),
  };

  const selectIntervalProps: CustomSelectProps = {
    selectedValue: selectedDimension!.intervalType,
    options: ["---", "intervals", "error bars"],
    optionComponent: (value) => <div>{value}</div>,
    onChange: (value) => updateDimension("intervalType", value),
  };

  return (
    <>
      <div className="chart-property">
        <label className="chart-property-label" htmlFor="series-color">
          Type:
        </label>
        <CustomSelect {...selectIntervalProps} />
      </div>
      <div className="chart-property">
        <label className="chart-property-label" htmlFor="series-color">
          Lower bounds:
        </label>
        <CustomSelect {...selectLowerProps} />
      </div>
      <div className="chart-property">
        <label className="chart-property-label" htmlFor="series-color">
          Upper bounds:
        </label>
        <CustomSelect {...selectUpperProps} />
      </div>
    </>
  );
};

export default ConfidenceProperties;
