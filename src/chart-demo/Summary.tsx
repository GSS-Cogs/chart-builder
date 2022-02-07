import { useState } from "react";
import "./chart-demo.css";

// Component for demo purposes / prototyping and does not play a functional role in chart builder.

const initialSummary =
  "There are three key official measures of UK greenhouse gas (GHG) emissions. In 2018, the latest year that all three measures are available, territorial emissions were 468 million tonnes of carbon dioxide equivalent (Mt CO2e), residence emissions 569 Mt CO2e and footprint emissions 703 Mt CO2e.";

const Summary = () => {
  const [summary, setSummary] = useState(initialSummary);

  return (
    <textarea
      value={summary}
      id="summary"
      rows={4}
      onChange={(e) => setSummary(e.target.value)}
    />
  );
};

export default Summary;
