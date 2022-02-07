import { useState } from "react";
import "./chart-demo.css";

// Component for demo purposes / prototyping and does not play a functional role in chart builder.

const initialFootnotes = `1. Territorial estimates are published by the Department for Business, Energy and Industrial Strategy (BEIS), are used to monitor net zero and other UK-wide targets. These estimates include emissions produced within the UK’s geographical borders.
    
2. In accordance with international reporting protocols, each of these gases are weighted by their global warming potential (GWP), so that total greenhouse gas emissions can be reported on a consistent basis (in CO2 equivalent units).`;

const Footnotes = () => {
  const [footnotes, setFootnotes] = useState(initialFootnotes);

  return (
    <textarea
      value={footnotes}
      rows={5}
      onChange={(e) => setFootnotes(e.target.value)}
      id="footnotes"
    />
  );
};

export default Footnotes;
