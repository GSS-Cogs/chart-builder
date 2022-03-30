import { useContext, useEffect, useState } from "react";
import { SelectedDimension } from "../../../../context/types";
import ChartContext, {
  ChartContextProps,
} from "../../../../context/ChartContext";
import "./dimension-selection.css";
import { titleCase } from "../../../../helper-functions/string-helpers";

export interface Props {
  availableDimensions: string[];
}

const DimensionSelection = ({ availableDimensions }: Props): JSX.Element => {
  const {
    selectedDimensions,
    setSelectedDimensions,
    dataSelection,
    setDataSelection,
  }: ChartContextProps = useContext(ChartContext);

  useEffect(() => {
    setDataSelection((prevState: any) => ({
      ...prevState,
      ySeries: selectedDimensions,
    }));
  }, [selectedDimensions]);

  const createDimensionList = () => {
    const nonSelectedAvailableDimensions: string[] =
      getNonSelectedAvailableDimensions();
    return selectedDimensions.map((dimension, index) => {
      return (
        <div key={index}>
          <select
            className="y-series-select"
            name={dimension.Name}
            value={dimension.Name}
            onChange={handleSelectedDimensionChange}
          >
            <option key={dimension.Name} value={dimension.Name}>
              {dimension.Name}
            </option>
            {nonSelectedAvailableDimensions.map(
              (columnName: string, index: number) => (
                <option key={columnName} value={columnName}>
                  {columnName}
                </option>
              ),
            )}
          </select>
          <input
            className="y-series-text"
            type="text"
            name={dimension.Name}
            value={dimension.DisplayName}
            onChange={handleInputChange}
          />
          <button
            name={dimension.Name}
            className="remove-dimension"
            onClick={handleRemoveDimensionClick}
          >
            &nbsp;{"-"}&nbsp;
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
          DisplayName: titleCase(defaultSelectedDimension),
        },
      ]);
    } else {
      const nonSelectedAvailableDimensions =
        getNonSelectedAvailableDimensions();
      setSelectedDimensions([
        ...selectedDimensions,
        {
          Name: nonSelectedAvailableDimensions[0],
          DisplayName: titleCase(nonSelectedAvailableDimensions[0]),
        },
      ]);
    }
  };

  const getNonSelectedAvailableDimensions = () => {
    return availableDimensions.filter(
      (possibleDimension: string) =>
        !selectedDimensions
          .map((item) => item.Name)
          .includes(possibleDimension),
    );
  };

  const handleSelectedDimensionChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newSelectedDimension: SelectedDimension = {
      Name: e.target.value,
      DisplayName: e.target.value,
    }; //TBC

    const updatedDimensions = selectedDimensions.map((item) => {
      return item.Name === e.target.name ? newSelectedDimension : item;
    });
    setSelectedDimensions(updatedDimensions);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newDimensions = [...selectedDimensions];
    const dimension: SelectedDimension = {
      Name: name,
      DisplayName: value,
    };
    const updatedDimensions = newDimensions.map((item) => {
      return item.Name === name ? dimension : item;
    });
    setSelectedDimensions(updatedDimensions);
  };

  const handleRemoveDimensionClick = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const alreadyOtherSelectedDimension = selectedDimensions.filter(
      (item) => item.Name !== (e.target as HTMLButtonElement).name,
    );
    setSelectedDimensions(alreadyOtherSelectedDimension);
  };

  return (
    <div className="property-section">
      <div className="section-heading"> Data series</div>
      <div className="dimension-preference">
        {createDimensionList()}
        {availableDimensions.length > selectedDimensions.length &&
          dataSelection &&
          dataSelection.dimension && (
            <button className="add-dimension" onClick={handleAddDimensionClick}>
              &nbsp;{"+"}&nbsp;
            </button>
          )}
      </div>
    </div>
  );
};

export default DimensionSelection;
