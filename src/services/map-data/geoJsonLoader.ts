import { tidyResults } from "./fetchData";
import rewind from "@turf/rewind";
import { GeoJSON } from "geojson";

const getGeoJson = async (query: string): Promise<GeoJSON> => {
  return convertSparqlToGeoJson(await tidyResults(query));
};

const convertSparqlToGeoJson = (data: any): GeoJSON => {
  data.boundary.forEach((b: any) => {
    b.geometry = rewind(b.geometry, { reverse: true });
  });

  // wrap geoJson structure
  return {
    type: "FeatureCollection",
    features: data.boundary,
  };
};

export { getGeoJson, convertSparqlToGeoJson };
