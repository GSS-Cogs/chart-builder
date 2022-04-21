import { useContext } from "react";
import StandaloneContext, {
  StandaloneContextProps,
} from "../../../context/StandaloneContext";
import "./sparql-input.css";

const SparqlInput = () => {
  const { sparqlQuery, setSparqlQuery }: StandaloneContextProps =
    useContext(StandaloneContext);

  return (
    <div id="sparql-wrapper">
      <textarea
        id="sparql-input"
        placeholder="Enter a SPARQL query here..."
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
