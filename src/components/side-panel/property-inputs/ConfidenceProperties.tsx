import { useContext, useEffect, useState } from "react";
import "../../side-panel/side-panel.css";
import { colors, dashStyles } from "../../../helper-functions/chart-helpers";
import CustomSelect, { CustomSelectProps } from "../../select/CustomSelect";
import ChartContext from "../../../context/ChartContext";
import ColorOption from "../../select/ColorOption";
import { INTERVAL_STYLES } from "../../../constants/Chart-constants";
interface Props {
  activeSeries: string;
  columnNames: string[];
}

const ConfidenceProperties = ({
  activeSeries,
  columnNames,
}: Props): JSX.Element => {
  const { selectedDimensions, setSelectedDimensions, chartProperties } =
    useContext(ChartContext);
  const [prevChartType, setPreviousChartType] = useState<any>("Line");
  const [intervalStyle, setintervalStyle] = useState(
    INTERVAL_STYLES[0].toString(),
  );
  const chartType = chartProperties?.chartTypes?.chartType;

  useEffect(() => {
    if (prevChartType === "Line" && intervalStyle === INTERVAL_STYLES[1]) {
      updateAllDimensions("intervalStyle", INTERVAL_STYLES[0]);
    }
    setPreviousChartType(chartType);
  }, [chartType]);

  // Get the selected dimension based on the active series prop
  const selectedDimension = selectedDimensions.find(
    (d) => d.name === activeSeries,
  );

  const updateAllDimensions = (property: string, value: any) => {
    setintervalStyle(value);
    setSelectedDimensions((prev) =>
      prev.map((d) => ({ ...d, [property]: value })),
    );
  };

  // Shared updater for updating the color and dashStyle properties on the selected dimension
  const updateDimension = (property: string, value: any) => {
    if (chartType !== "Line" && value === INTERVAL_STYLES[1]) {
      alert("Confidence intervals are only available on line charts");
      return;
    }
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

  const selectColorProps: CustomSelectProps = {
    selectedValue: selectedDimension!.intervalColor,
    options: colors,
    optionComponent: (value) => <ColorOption color={value} />,
    onChange: (value) => updateDimension("intervalColor", value),
  };

  const selectIntervalProps: CustomSelectProps = {
    selectedValue: selectedDimension!.intervalStyle,
    options: INTERVAL_STYLES,
    optionComponent: (value) => <div>{value}</div>,
    onChange: (value) => (
      updateDimension("intervalStyle", value), setintervalStyle(value)
    ),
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
          Color:
        </label>
        <CustomSelect {...selectColorProps} />
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
