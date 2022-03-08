import { tidyResults } from "./fetch-data";
import { FOREST_RESEARCH_WOODLAND_AREA_LA } from "./datasets";

export const get: any = async () => {
  const data: any = await tidyResults(`
PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX geo: <http://statistics.data.gov.uk/def/statistical-geography#>
PREFIX data: <${FOREST_RESEARCH_WOODLAND_AREA_LA.uri}#>
PREFIX dim: <${FOREST_RESEARCH_WOODLAND_AREA_LA.uri}#dimension/>
PREFIX meas: <http://gss-data.org.uk/def/climate-change/measure/>

SELECT ?la_uri ?label (SUM(xsd:float(?val)) as ?emissions)
WHERE {
  ?obs qb:dataSet data:dataset ;
       dim:year <http://reference.data.gov.uk/id/year/2019> ;
       dim:local-authority-area ?wrong_la_uri ;
       meas:woodland ?val ;
       <http://purl.org/linked-data/sdmx/2009/attribute#unitMeasure> <http://gss-data.org.uk/def/climate-change/concept/measurement-unit/percentage> ;
       .

       BIND (
         IRI(
           REPLACE(
             STR(?wrong_la_uri),
             "^.*/",
             "http://statistics.data.gov.uk/id/statistical-geography/"
           )
         ) AS ?la_uri )
       FILTER(?la_uri != <http://statistics.data.gov.uk/id/statistical-geography/N92000002>)

    OPTIONAL { ?la_uri geo:officialname ?label }
}
GROUP BY ?la_uri ?label`);

  return data;
};
