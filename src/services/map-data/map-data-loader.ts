import { tidyResults } from "./fetch-data";
import { FOREST_RESEARCH_WOODLAND_AREA_QUERY } from "./sparql-queries";

export const getMapData: any = async () => {
  const data: any = await tidyResults(FOREST_RESEARCH_WOODLAND_AREA_QUERY);
  return data;
};
