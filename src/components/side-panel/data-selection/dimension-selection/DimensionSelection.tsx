import { useContext, useEffect, useState } from "react";
import { SelectedDimension } from "../../../../context/ChartContextProvider";
import ChartContext, {
  ChartContextProps,
} from "../../../../context/ChartContext";
import "./dimension-selection.css";

export interface Props {
  availableDimensions: string[];
}

const DimensionSelection = ({ availableDimensions }: Props): JSX.Element => {
  const [selectedDimensions, setSelectedDimensions] = useState<
    SelectedDimension[]
  >([]);
  const { setDataSelection }: ChartContextProps = useContext(ChartContext);

  useEffect(() => {
    setDataSelection((prevState: any) => ({
      ...prevState,
      ySeries: selectedDimensions,
    }));
  }, [selectedDimensions]);

  const createDimensionList = () => {
    return selectedDimensions.map((dimension, index) => {
      return (
        <div key={index}>
          <select
            className="y-series-select"
            name={dimension.Name}
            value={dimension.Name}
            onChange={handleSelectedDimensionChange}
          >
            {availableDimensions.map((columnName: string, index: number) => (
              <option key={columnName} value={columnName}>
                {columnName}
              </option>
            ))}
          </select>
          <input
            type="text"
            name={dimension.Name}
            value={dimension.DisplayName}
            onChange={(e) => handleInputChange(e, index)}
          />
          <button
            className="remove-dimension"
            onClick={handleRemoveDimensionClick}
          >
            {"   -   "}
          </button>
        </div>
      );
    });
  };

  const handleAddDimensionClick = () => {
    if (selectedDimensions.length === availableDimensions.length) return;
    if (selectedDimensions.length === 0) {
      const defaultSelectedDimension = availableDimensions[0];
      setSelectedDimensions([
        ...selectedDimensions,
        {
          Name: defaultSelectedDimension,
          DisplayName: defaultSelectedDimension,
        },
      ]);
    } else {
      const nonSelectedAvailableDimensions = availableDimensions.filter(
        (possibleDimension: string) =>
          !selectedDimensions
            .map((item) => item.Name)
            .includes(possibleDimension),
      );
      setSelectedDimensions([
        ...selectedDimensions,
        {
          Name: nonSelectedAvailableDimensions[0],
          DisplayName: nonSelectedAvailableDimensions[0],
        },
      ]);
    }
  };

  const handleSelectedDimensionChange = (e: any) => {
    setSelectedDimensions([
      ...selectedDimensions,
      { Name: e.target.value, DisplayName: e.target.value },
    ]);
  };

  const handleInputChange = (e: any, index: number) => {
    const { name, value } = e.target;
    const newDimensions = [...selectedDimensions];
    const dimension: SelectedDimension = {
      Name: name,
      DisplayName: value,
    };
    const updatedDimensions = newDimensions.map((item, index) => {
      return item.Name === name ? dimension : item;
    });
    setSelectedDimensions(updatedDimensions);
  };

  const handleRemoveDimensionClick = () => {};

  return (
    <div className="dimension-preference">
      {createDimensionList()}
      <button className="add-dimension" onClick={handleAddDimensionClick}>
        {"+"}
      </button>
    </div>
  );
};

export default DimensionSelection;
