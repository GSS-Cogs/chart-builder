import { render, fireEvent } from "@testing-library/react";
import Checkbox, { CheckboxProps } from "./../Checkbox";
import { ChartPropertyCheckbox } from "../../../../context/types";

const arrangeProps = (displayName: string, value: any, type: any) => {
  const chartProperty: ChartPropertyCheckbox = {
    defaultValue: true,
    displayName,
    name: "defaultPropertyName",
    type,
  };

  const props: CheckboxProps = {
    property: chartProperty,
    sectionName: "defaultSectionName",
    updateProperty: jest.fn(),
    value,
  };

  return props;
};

const props = arrangeProps("Show Gridlines", true, "checkbox");

describe("Checkbox", () => {
  it("should be checked when passed the value 'true'", () => {
    const { getByLabelText } = render(<Checkbox {...props} />);
    const checkbox = getByLabelText("Show Gridlines") as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it("should call updateProperty twice when the checkbox is clicked twice", () => {
    const { getByLabelText } = render(<Checkbox {...props} />);
    const checkbox = getByLabelText("Show Gridlines");
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);
    expect(props.updateProperty).toHaveBeenCalledTimes(2);
  });
});
