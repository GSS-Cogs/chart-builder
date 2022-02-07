import { useState } from "react";
import "./chart-demo.css";

// Component for demo purposes / prototyping and does not play a functional role in chart builder.

const initialTitle =
  "Greenhouse gas emissions on a territorial, residence and carbon footprint basis: UK, 1990 to 2019 and provisional 2020 (million tonnes of carbon dioxide equivalent)";

const Title = () => {
  const [title, setTitle] = useState(initialTitle);

  return (
    <textarea
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      id="chart-title"
    />
  );
};

export default Title;
