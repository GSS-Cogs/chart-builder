import { ReactNode, useState, useContext, useEffect } from "react";
import { getMapData } from "../services/map-data/mapDataLoader";
import ChartContext from "./ChartContext";
import StandaloneContext from "./StandaloneContext";
import { getGeoJson } from "../services/map-data/geoJsonLoader";
import LOCAL_AUTHORITY_BOUNDARY_QUERY from "../services/map-data/geoJsonQueries";

interface Props {
  children: ReactNode;
}

const StandaloneContextProvider = ({ children }: Props): JSX.Element => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [sparqlQuery, setSparqlQuery] = useState<string>("");
  const { mapData, setMapData, setGeoJson } = useContext(ChartContext);

  useEffect(() => {
    if (sparqlQuery === "") return;
    const populateMap = async () => {
      const mapData = await getMapData(sparqlQuery);
      setMapData(mapData);
    };
    populateMap();
  }, [sparqlQuery, setMapData]);

  const loadGeoJson = async (query: string) => {
    const geoJson = await getGeoJson(query);
    setGeoJson(geoJson);
  };

  useEffect(() => {
    if (!mapData) return;
    // todo infer the applicable GeoJson boundary query from the map data or metadata and replace constant below
    const geoJsonQuery = LOCAL_AUTHORITY_BOUNDARY_QUERY;
    loadGeoJson(geoJsonQuery);
  }, [mapData]);

  return (
    <StandaloneContext.Provider
      value={{ isFullScreen, setIsFullScreen, sparqlQuery, setSparqlQuery }}
    >
      {children}
    </StandaloneContext.Provider>
  );
};

export default StandaloneContextProvider;
