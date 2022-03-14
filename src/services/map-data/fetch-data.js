import { datasets } from "./datasets";

const SPARQL_ENDPOINT = "https://staging.gss-data.org.uk/sparql";
const PMD_BASEURL = "https://staging.gss-data.org.uk/";

/**
 * @param {string} query
 */
function sparql(query) {
  return fetch(SPARQL_ENDPOINT, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/sparql-query",
      Accept: "application/sparql-results+json",
    },
    body: query,
  }).then((response) => response.json());
}

function typedValue(v) {
  if (v.hasOwnProperty("datatype")) {
    if (v.datatype === "http://publishmydata.com/def/pmdgeo/geoJsonLiteral") {
      return JSON.parse(v.value);
    } else if (v.datatype.startsWith("http://www.w3.org/2001/XMLSchema#")) {
      const xsd = v.datatype.substring(
        "http://www.w3.org/2001/XMLSchema#".length,
      );
      if (xsd === "float" || xsd === "double") {
        return parseFloat(v.value);
      } else if (xsd === "integer") {
        return parseInt(v.value);
      } else if (xsd === "boolean") {
        return v.value === "true";
      } else if (
        xsd === "date" ||
        xsd === "dateTime" ||
        xsd === "dateTimeStamp"
      ) {
        return new Date(v.value);
      }
    }
  }
  return v.value;
}

function getValues(list) {
  return list.map((item) => {
    return Object.fromEntries(
      Object.entries(item).map(([key, value]) => [key, typedValue(value)]),
    );
  });
}

// convert a list of nested objects to a map of field-value arrays
export function longify(list) {
  const map = {};
  for (let i = 0; i < list.length; ++i) {
    let entries = Object.entries(list[i]);
    entries.forEach(([key, value]) => {
      if (!map[key]) map[key] = [];
      map[key].push(value);
    });
  }
  return map;
}

export async function tidyResults(query) {
  let response = await sparql(query);
  let bindings = response.results.bindings;
  return longify(getValues(bindings));
}

export async function plotlyData(query, x, y, by, mode, type, additional) {
  let data = await tidyResults(query);

  let groups = [...new Set(data[by])];
  let result = [];

  for (let group of groups) {
    const x_vals = data[x].filter(
      (r, i) => data[by].map((g) => g === group)[i],
    );
    const y_vals = data[y].filter(
      (r, i) => data[by].map((g) => g === group)[i],
    );
    let series = {
      x: x_vals,
      y: y_vals,
      name: group,
      mode: mode,
      type: type,
    };
    if (additional.hasOwnProperty(group)) {
      series = { ...series, ...additional[group] };
    }
    result.push(series);
  }
  return result;
}

function pmdDatasetPage(record) {
  return PMD_BASEURL + "cube/about?uri=" + encodeURIComponent(record);
}

export async function datasetInfo(id) {
  const record_results = await sparql(`
PREFIX pmdcat: <http://publishmydata.com/pmdcat#>
SELECT ?record
WHERE { ?record pmdcat:datasetContents <${id}#dataset> . } 
`);
  if (record_results.results.bindings.length === 1) {
    const record_uri = record_results.results.bindings[0].record.value;
    const response_json = await sparql(`
PREFIX pmdcat: <http://publishmydata.com/pmdcat#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

SELECT ?p ?o ?l ?a
WHERE {
  <${record_uri}> ?p ?o .
  OPTIONAL { ?o rdfs:label ?l } .
  OPTIONAL { ?o skos:altLabel ?a }
}`);
    const bindings = response_json.results.bindings;
    const info = Object.fromEntries(
      bindings.map((binding) => {
        const prop = binding.p.value;
        const key = prop.substring(
          Math.max(prop.lastIndexOf("/"), prop.lastIndexOf("#")) + 1,
        );
        let val = typedValue(binding.o);
        if (
          binding.hasOwnProperty("l") &&
          binding.l.hasOwnProperty("value") &&
          binding.l.value !== null
        ) {
          val = { uri: binding.o.value, label: binding.l.value };
          if (
            binding.hasOwnProperty("a") &&
            binding.a.hasOwnProperty("value") &&
            binding.a.value !== null
          ) {
            val["alt"] = binding.a.value;
          }
        }
        return [key, val];
      }),
    );
    return { ...info, record: record_uri, pmd: pmdDatasetPage(record_uri) };
  } else {
    return false;
  }
}

export async function datasetInfoFromPath(path) {
  const ds = datasets.find((ds) => ds.id === path);
  if (typeof ds === "undefined") {
    return false;
  } else {
    return await datasetInfo(ds.uri);
  }
}
