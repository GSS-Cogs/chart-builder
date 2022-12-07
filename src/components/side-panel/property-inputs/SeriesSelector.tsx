import "./series-selector.css";
import "../side-panel.css";
import SeriesProperties from "./SeriesProperties";
import ChartContext from "../../../context/ChartContext";
import { useContext, useEffect, useState } from "react";

const SeriesSelector: React.FC = () => {
  const { selectedDimensions: selectedSeries } = useContext(ChartContext);
  const [activeSeries, setActiveSeries] = useState("");

  let isPropertiesOpen = true;

  // When there's only one series set it to be active
  useEffect(() => {
    if (selectedSeries.length === 1) setActiveSeries(selectedSeries[0].name);
  }, []);

  // If there are no series available then there's nothing to show
  if (selectedSeries.length === 0) return null;

  const isActiveSeriesPresent = selectedSeries.some(
    (s) => s.name === activeSeries,
  );

  // If the user has removed the active series then set the first series as active
  if (!isActiveSeriesPresent) {
    setActiveSeries(selectedSeries[0].name);
    isPropertiesOpen = false;
  }

  const handleSelectKeyDown = (e: any) => {
    switch (e.key) {
      case "Enter":
      case " ":
        setActiveSeries(e.target.value);
        break;
    }
  };

  return (
    <div className="property-section">
      <div className="section-heading">Series properties</div>
      <select
        id="series-select"
        size={selectedSeries.length}
        onKeyDown={handleSelectKeyDown}
        defaultValue={activeSeries}
      >
        {selectedSeries.map((series, index) => (
          <option
            key={index}
            value={series.name}
            //selected={series.name === activeSeries}
            className="series-option"
            onClick={() => setActiveSeries(series.name)}
          >
            {series.name}
          </option>
        ))}
      </select>
      {isPropertiesOpen && <SeriesProperties activeSeries={activeSeries} />}
    </div>
  );
};

export default SeriesSelector;
