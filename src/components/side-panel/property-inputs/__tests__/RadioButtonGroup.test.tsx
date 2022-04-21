import { render, fireEvent } from "@testing-library/react";
import RadioButtonGroup, { RadioButtonGroupProps } from "../RadioButtonGroup";
import { ChartPropertyRadio } from "../../../../context/types";

const arrangeProps = (
  displayName: string,
  value: any,
  type: any,
  options: string[],
) => {
  const chartProperty: ChartPropertyRadio<any> = {
    defaultValue: "",
    displayName,
    name: "defaultPropertyName",
    type,
    options,
  };

  const props: RadioButtonGroupProps = {
    property: chartProperty,
    sectionName: "defaultSectionName",
    updateProperty: jest.fn(),
    value,
  };

  return props;
};
const options = ["Line", "Bar", "Stacked Bar", "Map"];

const props = arrangeProps("Chart type", "Bar", "radio", options);

describe("Textbox", () => {
  it("should have the 'Bar' option checked when passed the 'Bar' value in props", () => {
    const { getByLabelText } = render(<RadioButtonGroup {...props} />);
    const lineOption = getByLabelText("Line") as HTMLInputElement;
    expect(lineOption).not.toBeChecked();
    const barOption = getByLabelText("Bar") as HTMLInputElement;
    expect(barOption).toBeChecked();
  });
  it("should call updateProperty twice when the 'Map' and 'Stacked Bar' options are each clicked once", () => {
    const { getByLabelText } = render(<RadioButtonGroup {...props} />);
    const mapOption = getByLabelText("Map") as HTMLInputElement;
    const stackedBarOption = getByLabelText("Stacked Bar") as HTMLInputElement;
    fireEvent.click(mapOption);
    fireEvent.click(stackedBarOption);
    expect(props.updateProperty).toHaveBeenCalledTimes(2);
  });
});
