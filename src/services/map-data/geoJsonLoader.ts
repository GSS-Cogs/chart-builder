import { tidyResults } from "./fetchData";
import rewind from "@turf/rewind";
import { GeoJSON } from "geojson";

export const getGeoJson = async (query: string): Promise<GeoJSON> => {
  const data: any = await tidyResults(query);
  data.boundary.forEach((b: any) => {
    b.geometry = rewind(b.geometry, { reverse: true });
  });

  return {
    type: "FeatureCollection",
    features: data.boundary,
  };
};
