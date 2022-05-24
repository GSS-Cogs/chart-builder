import { Meta, Story } from "@storybook/react";
import ColorOption from "../components/select/ColorOption";
import LineStyleOption from "../components/select/LineStyleOption";
import ColorbarOption from "../components/select/ColorbarOption";

import CustomSelect, {
  CustomSelectProps,
} from "../components/select/CustomSelect";

import { colors, dashStyles } from "../helper-functions/chart-helpers";

import {
  divergingColorScale,
  sequentialColorScale,
} from "../plotly/colorScales";

const meta: Meta = {
  title: "Chart Builder/CustomSelect",
  component: CustomSelect,
};

// Create a reusable template for CustomSelect variants
const Template: Story<CustomSelectProps> = (args: CustomSelectProps) => (
  <CustomSelect {...args} />
);

const ColorSelect = Template.bind({});

ColorSelect.args = {
  selectedValue: "rgb(40, 161, 151)",
  options: colors,
  optionComponent: (value) => <ColorOption color={value} />,
  onChange: (value) => console.log(value),
  width: 10,
  id: "series-color",
};

const LineStyleSelect = Template.bind({});

LineStyleSelect.args = {
  selectedValue: "dash",
  options: dashStyles,
  optionComponent: (value) => (
    <LineStyleOption lineStyle={value} color={"rgb(40, 161, 151)"} />
  ),
  onChange: (value) => console.log(value),
  width: 10,
  id: "series-line-style",
};

const ColorbarSelect = Template.bind({});

// Extract the linear color gradients from the colorScales
const divergingColors = divergingColorScale.map((item) => item[1] as string);
const sequentialColors = sequentialColorScale.map((item) => item[1] as string);

ColorbarSelect.args = {
  selectedValue: divergingColors,
  options: [divergingColors, sequentialColors],
  optionComponent: (value) => <ColorbarOption colorbar={value} />,
  onChange: (value) => console.log(value),
  width: 10,
  id: "map-colorbar",
};

export default meta;
export { ColorSelect, LineStyleSelect, ColorbarSelect };
