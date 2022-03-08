import { tidyResults } from "./fetch-data";
import rewind from "@turf/rewind";
import { LOCAL_AUTHORITY_BOUNDARY_QUERY } from "./sparql-queries";

export const getUkLaBoundaries: any = async () => {
  const data: any = await tidyResults(LOCAL_AUTHORITY_BOUNDARY_QUERY);
  data.boundary.forEach((b: any) => {
    b.geometry = rewind(b.geometry, { reverse: true });
  });

  return {
    type: "FeatureCollection",
    features: data.boundary,
  };
};
