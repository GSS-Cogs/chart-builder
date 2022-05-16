import { useRef, useState } from "react";
import "./custom-select.css";
import ColorOption from "./ColorOption";
import LineStyleOption from "./LineStyleOption";
import { colors } from "../../helper-functions/chart-helpers";
import { ReactComponent as DownArrow } from "./DownArrow.svg";
import ColorbarOption from "./ColorbarOption";
import {
  divergingColorScale,
  sequentialColorScale,
} from "../../plotly/colorScales";

const lineStyles = ["solid", "dashed", "dotted"];

const divergingColors = divergingColorScale.map((item) => item[1] as string);
const sequentialColors = sequentialColorScale.map((item) => item[1] as string);

const colorbars = [
  divergingColors,
  sequentialColors,
  ["red", "#303030"],
  ["orange", "blue"],
];

export interface CustomSelectProps {
  placeholder: string;
  optionType: "color" | "lineStyle" | "colorbar";
  width: number;
}

const CustomSelect = ({
  optionType,
  placeholder,
  width,
}: CustomSelectProps) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);

  const selectRef = useRef<HTMLButtonElement>(null);

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const setSelectedThenCloseDropdown = (index: number) => {
    setSelectedOption(index);
    setIsOptionsOpen(false);
    if (selectRef && selectRef.current) {
      selectRef.current.focus();
    }
  };

  const handleKeyDown = (index: number) => (e: any) => {
    switch (e.key) {
      case " ":
      case "SpaceBar":
      case "Enter":
        e.preventDefault();
        setSelectedThenCloseDropdown(index);
        break;
      default:
        break;
    }
  };

  const handleListKeyDown = (e: any) => {
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setIsOptionsOpen(false);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedOption(
          selectedOption - 1 >= 0 ? selectedOption - 1 : options.length - 1,
        );
        break;
      case "ArrowDown":
        e.preventDefault();
        setSelectedOption(
          selectedOption == options.length - 1 ? 0 : selectedOption + 1,
        );
        break;
    }
  };

  let styledOptions: JSX.Element[] = [];

  let id = 0;
  switch (optionType) {
    case "color":
      styledOptions = colors.map((color) => {
        return <ColorOption color={color} key={id++} />;
      });
      break;
    case "lineStyle":
      styledOptions = lineStyles.map((lineStyle) => {
        return <LineStyleOption lineStyle={lineStyle} key={id++} />;
      });
      break;
    case "colorbar":
      styledOptions = colorbars.map((colorbar) => {
        return <ColorbarOption colorbar={colorbar} key={id++} />;
      });
      break;
  }

  let options: string[] | string[][];

  switch (optionType) {
    case "color":
      options = colors;
      break;
    case "lineStyle":
      options = lineStyles;
      break;
    case "colorbar":
      options = colorbars;
      break;
  }

  const placeholderDiv = <div className="option">{placeholder}</div>;

  return (
    <div className="custom-select" style={{ width: `${width}rem` }}>
      <button
        type="button"
        className="select-button"
        aria-haspopup="listbox"
        aria-expanded={isOptionsOpen}
        onClick={toggleOptions}
        onKeyDown={handleListKeyDown}
        ref={selectRef}
      >
        {styledOptions[selectedOption]}
        <DownArrow className="down-arrow" />
      </button>

      <ul
        role="listbox"
        tabIndex={-1}
        className={`options ${isOptionsOpen ? "show" : "options"}`}
      >
        {options.map((option, index) => (
          <li
            className="option"
            key={index}
            role="option"
            aria-selected={selectedOption == index}
            tabIndex={0}
            onKeyDown={handleKeyDown(index)}
            onClick={() => {
              setSelectedThenCloseDropdown(index);
            }}
          >
            {styledOptions[index]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomSelect;
