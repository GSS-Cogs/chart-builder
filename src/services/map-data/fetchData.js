const SPARQL_ENDPOINT = "https://beta.gss-data.org.uk/sparql";

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
