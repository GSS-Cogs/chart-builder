import { tidyResults } from "./fetch-data";
import {
  FOREST_RESEARCH_WOODLAND_AREA_QUERY,
  BEIS_LA_CARBON_EMISSIONS_QUERY,
} from "./sparql-queries";

export const getMapData: any = async (query: string) => {
  const data: any = await tidyResults(query);
  return data;
};
