import { useContext } from "react";
import { SelectedSeries } from "../../../../context/types";
import ChartContext, {
  ChartContextProps,
} from "../../../../context/ChartContext";
import "./series-selection.css";
import { titleCase } from "../../../../helper-functions/string-helpers";

import { colors } from "../../../../helper-functions/chart-helpers";

export interface Props {
  availableSeries: string[];
}

const SeriesSelection = ({ availableSeries }: Props): JSX.Element => {
  const {
    selectedSeries,
    setSelectedSeries,
    dataSelection,
  }: ChartContextProps = useContext(ChartContext);

  const createSeriesList = () => {
    const nonSelectedSeries: string[] = getNonSelectedSeries();
    return selectedSeries.map((series: any, index: number) => {
      return (
        <div key={index}>
          <select
            className="y-series-select"
            name={series.name}
            value={series.name}
            onChange={handleSelectedSeriesChange}
          >
            <option key={series.name} value={series.name}>
              {series.name}
            </option>
            {nonSelectedSeries.map((columnName: string) => (
              <option key={columnName} value={columnName}>
                {columnName}
              </option>
            ))}
          </select>
          <input
            className="y-series-text"
            type="text"
            name={series.name}
            value={series.displayName}
            onChange={handleInputChange}
          />
          <button
            name={series.name}
            className="remove-series"
            onClick={handleRemoveSeriesClick}
            tabIndex={0}
          >
            &nbsp;{"-"}&nbsp;
          </button>
        </div>
      );
    });
  };

  const handleAddSeriesClick = () => {
    if (selectedSeries.length === availableSeries.length) return;
    if (selectedSeries.length === colors.length) {
      alert(
        "Series limit reached. We recommend reducing the visual complexity of the chart by showing fewer series.",
      );
    }
    if (selectedSeries.length === 0) {
      const defaultSeries = availableSeries[0];
      setSelectedSeries([
        ...selectedSeries,
        {
          name: defaultSeries,
          displayName: titleCase(defaultSeries),
          color: colors[selectedSeries.length],
          dashStyle: "none",
        },
      ]);
    } else {
      const nonSelectedSeries = getNonSelectedSeries();
      setSelectedSeries([
        ...selectedSeries,
        {
          name: nonSelectedSeries[0],
          displayName: titleCase(nonSelectedSeries[0]),
          color: colors[selectedSeries.length],
          dashStyle: "none",
        },
      ]);
    }
  };

  const getNonSelectedSeries = () => {
    return availableSeries.filter(
      (possibleSeries: string) =>
        !selectedSeries.map((item) => item.name).includes(possibleSeries),
    );
  };

  const handleSelectedSeriesChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newSelectedSeries: SelectedSeries = {
      name: e.target.value,
      displayName: e.target.value,
      color: colors[selectedSeries.length],
      dashStyle: "none",
    };

    const updatedSeries = selectedSeries.map((item) => {
      return item.name === e.target.name ? newSelectedSeries : item;
    });
    setSelectedSeries(updatedSeries);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newSeries = [...selectedSeries];
    const series: SelectedSeries = {
      name: name,
      displayName: value,
      color: colors[selectedSeries.length],
      dashStyle: "none",
    };
    const updatedSeries = newSeries.map((item) => {
      return item.name === name ? series : item;
    });
    setSelectedSeries(updatedSeries);
  };

  const handleRemoveSeriesClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const seriesToKeep = selectedSeries.filter(
      (item) => item.name !== (e.target as HTMLButtonElement).name,
    );
    setSelectedSeries(seriesToKeep);
  };

  return (
    <div className="property-section">
      <div className="section-heading"> Data series</div>
      <div className="series-preference">
        {createSeriesList()}
        {availableSeries.length > selectedSeries.length &&
          dataSelection &&
          dataSelection.dimension && (
            <button
              className="add-series"
              onClick={handleAddSeriesClick}
              tabIndex={0}
            >
              &nbsp;{"+"}&nbsp;
            </button>
          )}
      </div>
    </div>
  );
};

export default SeriesSelection;
