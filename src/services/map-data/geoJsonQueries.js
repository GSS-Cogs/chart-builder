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
export default LOCAL_AUTHORITY_BOUNDARY_QUERY;
