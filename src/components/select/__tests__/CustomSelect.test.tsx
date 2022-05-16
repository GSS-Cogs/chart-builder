import { screen, render, fireEvent, getByTestId } from "@testing-library/react";
import CustomSelect, { CustomSelectProps } from "../CustomSelect";

const props: CustomSelectProps = {
  width: 10,
  optionType: "color",
  placeholder: "Select an item",
};

describe("Custom Select", () => {
  it("should render the placeholder text 'Select an item' when passed this text in props", () => {
    const { getByTestId } = render(<CustomSelect {...props} />);
    const customSelect = getByTestId("select-header") as HTMLInputElement;
    expect(customSelect.innerHTML).toBe("Select an item");
  });

  // test the list of options is complete
  // test that clicking the header shows and hides the options list
});
