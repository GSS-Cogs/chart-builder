import "./series-selector.css";
import "../side-panel.css";
import SeriesProperties from "./SeriesProperties";
import ChartContext from "../../../context/ChartContext";
import { useContext, useEffect, useState } from "react";

const SeriesSelector: React.VFC = () => {
  const { selectedDimensions: selectedSeries } = useContext(ChartContext);
  const [activeSeries, setActiveSeries] = useState("");

  const isActiveSeriesPresent =
    selectedSeries.find((s) => s.name === activeSeries) && activeSeries !== "";

  useEffect(() => {
    if (selectedSeries.length === 1) setActiveSeries(selectedSeries[0].name);
  }, []);

  if (selectedSeries.length === 0) return null;

  return (
    <div className="property-section">
      <div className="section-heading">Series properties</div>
      <select id="series-select" size={selectedSeries.length}>
        {selectedSeries.map((series, index) => (
          <option
            key={index}
            value={series.name}
            className="series-option"
            onClick={() => setActiveSeries(series.name)}
          >
            {series.name}
          </option>
        ))}
      </select>
      {isActiveSeriesPresent && (
        <SeriesProperties activeSeries={activeSeries} />
      )}
    </div>
  );
};

export default SeriesSelector;
