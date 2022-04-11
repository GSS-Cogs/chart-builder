import { ReactNode, useState, useContext, useEffect } from "react";
import { getMapData } from "../services/map-data/mapDataLoader";
import ChartContext from "./ChartContext";
import StandaloneContext from "./StandaloneContext";

interface Props {
  children: ReactNode;
}

const StandaloneContextProvider = ({ children }: Props): JSX.Element => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [sparqlQuery, setSparqlQuery] = useState<string>("");
  const { loadMapData } = useContext(ChartContext);

  useEffect(() => {
    if (sparqlQuery === "") return;
    const populateMap = async () => {
      const mapData = await getMapData(sparqlQuery);
      loadMapData(mapData);
    };
    populateMap();
  }, [sparqlQuery, loadMapData]);

  return (
    <StandaloneContext.Provider
      value={{ isFullScreen, setIsFullScreen, sparqlQuery, setSparqlQuery }}
    >
      {children}
    </StandaloneContext.Provider>
  );
};

export default StandaloneContextProvider;
