import { render } from "@testing-library/react";
import CustomSelect, { CustomSelectProps } from "../CustomSelect";
import ColorOption from "../ColorOption";
import LineStyleOption from "../LineStyleOption";
import ColorbarOption from "../ColorbarOption";

import { colors, dashStyles } from "../../../helper-functions/chart-helpers";

import {
  divergingColorScale,
  sequentialColorScale,
} from "../../../plotly/colorScales";

// Extract the linear color gradients from the colorScales
const divergingColors = divergingColorScale.map((item) => item[1] as string);
const sequentialColors = sequentialColorScale.map((item) => item[1] as string);

const colorProps: CustomSelectProps = {
  selectedValue: "rgb(40, 161, 151)",
  options: colors,
  optionComponent: (value) => <ColorOption color={value} />,
  onChange: () => {},
  width: 10,
  id: "series-color",
};

describe("Custom Select - Color", () => {
  it("should render with color option props", () => {
    const { getByTestId } = render(<CustomSelect {...colorProps} />);
    const customSelect = getByTestId("custom-select") as HTMLDivElement;
    expect(customSelect).toBeDefined();
  });
});

const lineStyleProps: CustomSelectProps = {
  selectedValue: "dash",
  options: dashStyles,
  optionComponent: (value) => (
    <LineStyleOption lineStyle={value} color={"rgb(40, 161, 151)"} />
  ),
  onChange: (value) => console.log(value),
  width: 10,
  id: "series-line-style",
};

describe("Custom Select - Line Style", () => {
  it("should render with line style props", () => {
    const { getByTestId } = render(<CustomSelect {...lineStyleProps} />);
    const customSelect = getByTestId("custom-select") as HTMLDivElement;
    expect(customSelect).toBeDefined();
  });
});

const colorBarProps: CustomSelectProps = {
  selectedValue: divergingColors,
  options: [divergingColors, sequentialColors],
  optionComponent: (value) => <ColorbarOption colorbar={value} />,
  onChange: () => {},
  width: 10,
  id: "map-colorbar",
};

describe("Custom Select - Colorbar", () => {
  it("should render with colorbar props", () => {
    const { getByTestId } = render(<CustomSelect {...colorBarProps} />);
    const customSelect = getByTestId("custom-select") as HTMLDivElement;
    expect(customSelect).toBeDefined();
  });
});
