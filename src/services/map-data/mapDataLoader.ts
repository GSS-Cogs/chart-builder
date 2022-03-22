import { tidyResults } from "./fetchData";

export const getMapData: any = async (query: string) => {
  const data: any = await tidyResults(query);
  return data;
};
