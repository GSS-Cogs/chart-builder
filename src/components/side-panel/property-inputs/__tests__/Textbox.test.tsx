import { render, fireEvent } from "@testing-library/react";
import Textbox, { TextboxProps } from "../Textbox";
import { ChartPropertyText } from "../../../../context/types";

const arrangeProps = (displayName: string, value: any, type: any) => {
  const chartProperty: ChartPropertyText<number | string> = {
    defaultValue: "",
    displayName,
    name: "defaultPropertyName",
    type,
  };

  const props: TextboxProps = {
    property: chartProperty,
    sectionName: "defaultSectionName",
    updateProperty: jest.fn(),
    value,
  };

  return props;
};

const props = arrangeProps("Hoverinfo unit", "MtCO2e", "text");

describe("Textbox", () => {
  it("should have the value 'MtCO2e' when passed the value 'MtCO2e' in props", () => {
    const { getByLabelText } = render(<Textbox {...props} />);
    const textbox = getByLabelText("Hoverinfo unit:") as HTMLInputElement;
    expect(textbox.value).toBe("MtCO2e");
  });

  it("should call updateProperty in response to a text change event", () => {
    const { getByLabelText } = render(<Textbox {...props} />);
    const textbox = getByLabelText("Hoverinfo unit:") as HTMLInputElement;
    fireEvent.change(textbox, { target: { value: "Percent" } });
    expect(props.updateProperty).toHaveBeenCalledTimes(1);
  });
});
