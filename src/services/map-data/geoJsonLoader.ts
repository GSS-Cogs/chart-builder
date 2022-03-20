import { tidyResults } from "./fetchData";
import rewind from "@turf/rewind";

export const getGeoJson: any = async (query: string) => {
  const data: any = await tidyResults(query);
  data.boundary.forEach((b: any) => {
    b.geometry = rewind(b.geometry, { reverse: true });
  });

  return {
    type: "FeatureCollection",
    features: data.boundary,
  };
};
