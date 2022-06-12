import { ReactNode, useRef, useState } from "react";
import "./custom-select.css";
import DownArrow from "./DownArrow.svg";
import useCloseOnFocusLoss from "./useCloseOnFocusLoss";

export interface CustomSelectProps {
  selectedValue: any;
  options: any;
  optionComponent: (value: string) => ReactNode;
  onChange: (value: string) => void;
}

const CustomSelect = (props: CustomSelectProps) => {
  const { selectedValue, options, optionComponent, onChange } = props;
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const selectRef = useRef<HTMLButtonElement>(null);
  const selectContainerRef = useRef<HTMLDivElement>(null);

  useCloseOnFocusLoss(selectContainerRef, isOptionsOpen, setIsOptionsOpen);

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const setSelectedThenCloseDropdown = (value: string) => {
    onChange(value);
    setIsOptionsOpen(false);
    if (selectRef && selectRef.current) {
      selectRef.current.focus();
    }
  };

  const handleKeyDown = (value: string) => (e: any) => {
    switch (e.key) {
      case " ":
      case "SpaceBar":
      case "Enter":
        e.preventDefault();
        setSelectedThenCloseDropdown(value);
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
    }
  };

  return (
    <div
      ref={selectContainerRef}
      className="cb-custom-select"
      data-testid="custom-select"
    >
      <button
        type="button"
        className="cb-select-button"
        aria-haspopup="listbox"
        aria-expanded={isOptionsOpen}
        onClick={toggleOptions}
        onKeyDown={handleListKeyDown}
        ref={selectRef}
      >
        {optionComponent(selectedValue)}
        <img src={DownArrow} alt="expand select" className="cb-down-arrow" />
      </button>

      <ul
        role="listbox"
        tabIndex={-1}
        className={`cb-options ${isOptionsOpen ? "show" : "cb-options"}`}
      >
        {options.map((option: any) => (
          <li
            className="cb-option"
            key={option}
            role="option"
            aria-selected={selectedValue == option}
            tabIndex={0}
            onKeyDown={handleKeyDown(option)}
            onClick={() => {
              setSelectedThenCloseDropdown(option);
            }}
          >
            {optionComponent(option)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomSelect;
