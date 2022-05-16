import "./series-selector.css";
import "../side-panel.css";
import SeriesProperties from "./SeriesProperties";
import ChartContext from "../../../context/ChartContext";
import { useContext, useState } from "react";

const SeriesSelector = (): JSX.Element => {
  const { selectedDimensions: selectedSeries } = useContext(ChartContext);
  const [activeSeries, setActiveSeries] = useState("");

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
      <SeriesProperties activeSeries={activeSeries} />
    </div>
  );
};

export default SeriesSelector;
