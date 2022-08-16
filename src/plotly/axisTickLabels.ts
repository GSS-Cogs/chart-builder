import { ChartPropertyValues } from "../context/ChartContext";

const truncateValues = (values: any[], truncate: number) => {
  return values.map((value: any) => String(value).substring(0, truncate));
};

const getAxisTickConfig = (
  mode: string,
  values: any,
  tickInterval: number,
  truncate: number,
  firstTickLabel: string,
  lastTickLabel: string,
  tickangle: number,
  nticks: number,
) => {
  // If auto mode then return a basic (uncustomised) tick label config
  if (mode === "auto") {
    return {
      tickmode: "auto",
      tickangle,
      nticks,
    };
  }

  // If manual mode then return a customised tick label config
  if (mode === "manual") {
    const tickLabels: string[] = [];
    const truncatedValues = truncateValues(values, truncate);

    // Iterate the truncated tick labels
    for (let i = 0; i < truncatedValues.length; i++) {
      // If the current value is on a tick interval then add it otherwise add ""
      let value = i % tickInterval === 0 ? String(truncatedValues[i]) : "";

      // Apply a custom first tick label where specified (overriding the effect of the array above)
      if (i === 0) {
        value =
          firstTickLabel === "" ? String(truncatedValues[i]) : firstTickLabel;
      }
      // Apply a custom last tick label where specified (overriding the effect of the array above)
      if (i === values.length - 1) {
        value =
          lastTickLabel === "" ? String(truncatedValues[i]) : lastTickLabel;
      }
      tickLabels.push(value);
    }

    return {
      tickmode: "array",
      tickvals: values,
      ticktext: tickLabels,
      tickangle,
    };
  }
};

const getXandYAxisLabelsConfig = (
  chartProps: ChartPropertyValues,
  data: any,
) => {
  const { xAxisProperties, yAxisProperties } = chartProps;

  // User specified axis tick label maximum length for x and y axis
  const xAxisTickLabelLength =
    typeof xAxisProperties?.xAxisTickLabelLength === "string"
      ? parseInt(xAxisProperties.xAxisTickLabelLength)
      : 200;

  const yAxisTickLabelLength =
    typeof yAxisProperties?.yAxisTickLabelLength === "string"
      ? parseInt(yAxisProperties.yAxisTickLabelLength)
      : 200;

  // User specified X and Y axis tick intervals
  const xAxisTickInterval = xAxisProperties.xAxisTickInterval as number;
  const yAxisTickInterval = yAxisProperties.yAxisTickInterval as number;

  // User specified X and Y axis tick modes
  const xTickMode = xAxisProperties.xAxisTickMode as string;
  const yTickMode = yAxisProperties.yAxisTickMode as string;

  const xAxisTickConfig = getAxisTickConfig(
    xTickMode,
    data[0].x,
    xAxisTickInterval,
    xAxisTickLabelLength,
    xAxisProperties.xAxisFirstTickLabel as string,
    xAxisProperties.xAxisLastTickLabel as string,
    xAxisProperties.xAxisTickAngle as number,
    xAxisProperties.xAxisNTicks as number,
  );

  const yAxisTickConfig = getAxisTickConfig(
    yTickMode,
    data[0].y,
    yAxisTickInterval,
    yAxisTickLabelLength,
    yAxisProperties.yAxisFirstTickLabel as string,
    yAxisProperties.yAxisLastTickLabel as string,
    yAxisProperties.yAxisTickAngle as number,
    yAxisProperties.xAxisNTicks as number,
  );

  return [xAxisTickConfig, yAxisTickConfig];
};

export default getXandYAxisLabelsConfig;
