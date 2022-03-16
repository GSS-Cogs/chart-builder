import {
  FOREST_RESEARCH_WOODLAND_AREA_LA,
  BEIS_LA_CARBON_EMISSIONS,
} from "./datasets";

const LOCAL_AUTHORITY_BOUNDARY_QUERY = `
PREFIX statent: <http://statistics.data.gov.uk/def/statistical-entity#>
PREFIX statgeo: <http://statistics.data.gov.uk/def/statistical-geography#>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>
PREFIX pmdgeo: <http://publishmydata.com/def/pmdgeo/>

SELECT ?boundary
WHERE {
  GRAPH <http://gss-data.org.uk/graph/statistical-geography> {
    ?la_uri statent:code ?area_type .
  }
  GRAPH <http://gss-data.org.uk/graph/geometry> {
    ?la_uri geosparql:hasGeometry [
      pmdgeo:simplificationPercent 25 ;
      pmdgeo:asGeoJSON ?boundary ] .
  }
  VALUES ?area_type {
       <http://statistics.data.gov.uk/id/statistical-entity/E06>
       <http://statistics.data.gov.uk/id/statistical-entity/E07>
       <http://statistics.data.gov.uk/id/statistical-entity/E08>
       <http://statistics.data.gov.uk/id/statistical-entity/E09>
       <http://statistics.data.gov.uk/id/statistical-entity/S12>
       <http://statistics.data.gov.uk/id/statistical-entity/W06>
       <http://statistics.data.gov.uk/id/statistical-entity/N09> }

}`;

const FOREST_RESEARCH_WOODLAND_AREA_QUERY = `
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
GROUP BY ?la_uri ?label`;

const BEIS_LA_CARBON_EMISSIONS_QUERY = `
PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX geo: <http://statistics.data.gov.uk/def/statistical-geography#>
PREFIX data: <${BEIS_LA_CARBON_EMISSIONS.uri}#>
PREFIX dim: <${BEIS_LA_CARBON_EMISSIONS.uri}#dimension/>
PREFIX meas: <http://gss-data.org.uk/def/climate-change/measure/>

SELECT ?la_uri ?label  (ROUND((SUM(xsd:float(?val)) * 100) / 100) AS ?emissions)
WHERE {
  ?obs qb:dataSet data:dataset ;
       dim:year <http://reference.data.gov.uk/id/year/2019> ;
       dim:local-authority-code ?la_uri ;
       meas:territorial-emissions ?val .

       FILTER(?la_uri != <http://statistics.data.gov.uk/id/statistical-geography/N92000002>)

    OPTIONAL { ?la_uri geo:officialname ?label }
}
GROUP BY ?la_uri ?label`;

export {
  LOCAL_AUTHORITY_BOUNDARY_QUERY,
  FOREST_RESEARCH_WOODLAND_AREA_QUERY,
  BEIS_LA_CARBON_EMISSIONS_QUERY,
};
