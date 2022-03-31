import { useContext } from "react";
import ChartContext, { ChartContextProps } from "../../../context/ChartContext";

const SparqlInput = () => {
  const { sparqlQuery, setSparqlQuery }: ChartContextProps =
    useContext(ChartContext);

  return (
    <div className="property-section">
      <div className="section-heading"> SPARQL Query</div>
      <textarea
        id="sparql-input"
        rows={10}
        value={sparqlQuery}
        spellCheck={false}
        onChange={(e) => setSparqlQuery(e.target.value.trim())}
        onFocus={(e) => e.target.select()}
      />
    </div>
  );
};

export default SparqlInput;
