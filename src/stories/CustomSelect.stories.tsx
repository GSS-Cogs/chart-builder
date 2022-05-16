// import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import CustomSelect, {
  CustomSelectProps,
} from "../components/select/CustomSelect";

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
  optionType: "color",
  placeholder: "Select a colour",
  width: 10,
};

const LineStyleSelect = Template.bind({});

LineStyleSelect.args = {
  optionType: "lineStyle",
  placeholder: "Select a line style",
  width: 10,
};

const ColorbarSelect = Template.bind({});

ColorbarSelect.args = {
  optionType: "colorbar",
  placeholder: "Select a colorscale",
  width: 10,
};

export default meta;
export { ColorSelect, LineStyleSelect, ColorbarSelect };
