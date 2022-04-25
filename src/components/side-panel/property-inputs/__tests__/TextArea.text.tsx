import { render, fireEvent } from "@testing-library/react";
import TextArea, { TextAreaInputProps } from "../TextArea";
import { ChartPropertyText } from "../../../../context/types";

const arrangeProps = (displayName: string, value: any, type: any) => {
  const chartProperty: ChartPropertyText<number | string> = {
    defaultValue: "",
    displayName,
    name: "defaultPropertyName",
    type,
  };

  const props: TextAreaInputProps = {
    property: chartProperty,
    sectionName: "defaultSectionName",
    updateProperty: jest.fn(),
    value,
  };

  return props;
};

const props = arrangeProps("Hoverinfo unit", "MtCO2e", "text-multi");

describe("TextArea", () => {
  it("should have the value 'MtCO2e' when passed the value 'MtCO2e' in props", () => {
    const { getByLabelText } = render(<TextArea {...props} />);
    const textarea = getByLabelText("Hoverinfo unit:") as HTMLInputElement;
    expect(textarea.value).toBe("MtCO2e");
  });

  it("should call updateProperty in response to a text change event", () => {
    const { getByLabelText } = render(<TextArea {...props} />);
    const textarea = getByLabelText("Hoverinfo unit:") as HTMLInputElement;
    fireEvent.change(textarea, { target: { value: "Percent" } });
    expect(props.updateProperty).toHaveBeenCalledTimes(1);
  });
});
