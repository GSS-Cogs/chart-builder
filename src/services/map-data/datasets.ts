import type { Dataset, DatasetInfo } from "./types";

export const ONS_TRADE_IN_GOODS: Dataset = {
  id: "ons-trade-in-goods",
  uri: "http://gss-data.org.uk/data/gss_data/trade/ons-trade-in-goods",
};

export const ONS_TRADE_IN_GOODS_SEASONALLY: Dataset = {
  id: "ons-trade-in-goods",
  uri: "http://gss-data.org.uk/data/gss_data/trade/ons-uk-sa-trade-in-goods-catalog-entry",
};

export const ONS_TRADE_UK_TIME_SERIES: Dataset = {
  id: "ons-trade-in-goods",
  uri: "http://gss-data.org.uk/data/gss_data/trade/ons_mrets/uk-trade-time-series-current-prices-catalog-entry",
};

export const ONS_SA_TRADE_IN_GOODS: Dataset = {
  id: "ons-sa-trade-in-goods",
  uri: "http://gss-data.org.uk/data/gss_data/trade/ons-uk-sa-trade-in-goods",
};
export const DEFRA_EFFICIENT_WATER: Dataset = {
  id: "defra-efficient-water",
  uri: "http://gss-data.org.uk/data/gss_data/climate-change/defra-e8-efficient-use-of-water",
};
export const DEFRA_WATER_LEAKAGE: Dataset = {
  id: "defra-water-leakage",
  uri: "http://gss-data.org.uk/data/gss_data/climate-change/defra-uk-water-leakage",
};
export const DEFRA_WATER_CONSUMPTION: Dataset = {
  id: "defra-efficient-water",
  uri: "http://gss-data.org.uk/data/gss_data/climate-change/defra-e8-efficient-use-of-water-catalog-entry",
};

export const BEIS_GAS_EMISSIONS: Dataset = {
  id: "beis-gas-emissions",
  uri: "http://gss-data.org.uk/data/gss_data/energy/beis-final-uk-greenhouse-gas-emissions-national-statistics-1990-to-2019",
};
export const BEIS_GAS_EMISSIONS_PROVISIONAL: Dataset = {
  id: "beis-gas-emissions",
  uri: "http://gss-data.org.uk/data/gss_data/climate-change/beis-final-uk-greenhouse-gas-emissions-national-statistics",
};
export const DEFRA_CARBON_FOOTPRINT_SUMMARY: Dataset = {
  id: "defra-carbon-footprint-summary",
  uri: "http://gss-data.org.uk/data/gss_data/climate-change/defra-carbon-footprint-summary-final-demand-90-18",
};
export const MET_GROWING_SEASON: Dataset = {
  id: "met-growing-season",
  uri: "http://gss-data.org.uk/data/gss_data/climate-change/met-office-annual-growing-season-length-with-trends-actual",
};
export const MET_UK_MEAN_TEMP: Dataset = {
  id: "met-uk-meantemp",
  uri: "http://gss-data.org.uk/data/gss_data/climate-change/met-office-annual-mean-temp-with-trends-actual",
};
export const MET_UK_MEAN_TEMP_ANOMALY: Dataset = {
  id: "met-uk-meantemp-anomaly",
  uri: "http://gss-data.org.uk/data/gss_data/climate-change/met-office-annual-mean-temp-with-trends-anomaly",
};
export const ONS_ATMOSPHERIC_EMISSIONS_GREENHOUSE_GASSES_BY_INDUSTRY_AND_GAS: Dataset =
  {
    id: "ons-atmospheric-emissions-greenhouse-gases-by-industry-and-gas",
    uri: "http://gss-data.org.uk/data/gss_data/climate-change/ons-atmospheric-emissions-greenhouse-gases-by-industry-and-gas",
  };
export const MET_UK_MEAN_RAIN1: Dataset = {
  id: "met-uk-meanrain",
  uri: "http://gss-data.org.uk/data/gss_data/climate-change/met-office-annual-mean-rainfall-with-trends-actual",
};
export const DEFRA_CARBON_FOOTPRINT_SUMMARY_SOURCE_REGION: Dataset = {
  id: "trade/defra-carbon-summary-region",
  uri: "http://gss-data.org.uk/data/gss_data/climate-change/defra-carbon-footprint-summary-source-region-90-18",
};
export const BEIS_LA_CARBON_EMISSIONS: Dataset = {
  id: "emissions/beis-la-carbon-emissions",
  uri: "http://gss-data.org.uk/data/gss_data/climate-change/beis-2005-to-2019-local-authority-carbon-dioxide-co2-emissions",
};

export const BEIS_ENERGY_TRENDS_EXTRACT: Dataset = {
  id: "drivers/beis-energy-trends-extract",
  uri: "http://gss-data.org.uk/data/gss_data/climate-change/beis-energy-trends-table-1-2-extract",
};

export const BEIS_ENERGY_INTENSITY_EXTRACT: Dataset = {
  id: "drivers/beis-energy-intensity-extract",
  uri: "http://gss-data.org.uk/data/gss_data/climate-change/beis-energy-intensity-extract",
};

export const ONS_ENERGY_USE_BY_FUEL_AND_INDUSTRY: Dataset = {
  id: "drivers/ons-energy-use-by-fuel-and-industry",
  uri: "http://gss-data.org.uk/data/gss_data/climate-change/ons-energy-use-fossil-fuels-by-fuel-type-and-industry",
};

export const ONS_EMISSIONS_BY_INDUSTRY_2020: Dataset = {
  id: "ons-emissions-by-industry-2020",
  uri: "http://gss-data.org.uk/data/gss_data/climate-change/ons-atmospheric-emissions-greenhouse-gases-by-industry-and-gas",
};

export const FORESTRY_RESEARCH_NEW_PLANTING: Dataset = {
  id: "adaptation/forestry_research_new_planting",
  uri: "http://gss-data.org.uk/data/gss_data/climate-change/forestry-research-forestry-statistics-2021-new-planting",
};

export const DEFRA_B3_STATE_OF_THE_WATER_ENVIRONMENT: Dataset = {
  id: "impacts/defra-b3-state-of-the-water-environment",
  uri: "http://gss-data.org.uk/data/gss_data/climate-change/defra-b3-state-of-the-water-environment",
};

export const DEFRA_POLLINATOR_SPECIES: Dataset = {
  id: "adaptation/defra-pollinator-species",
  uri: "http://gss-data.org.uk/data/gss_data/climate-change/defra-d7-species-supporting-ecosystem-functions",
};

export const FORESTRY_RESEARCH_FORESTRY_STATISTICS_2021_WOODLAND_AREA: Dataset =
  {
    id: "adaptation/forestry-research-forestry-statistics-2021-woodland-area",
    uri: "http://gss-data.org.uk/data/gss_data/climate-change/forestry-research-forestry-statistics-2021-woodland-area",
  };

export const FOREST_RESEARCH_WOODLAND_AREA_LA: Dataset = {
  id: "adaptation/forest-research-woodland-area-la",
  uri: "http://gss-data.org.uk/data/gss_data/climate-change/forestry-research-woodland-area-local-authority",
};

export const DLUHC_ENERGY_EFFICIENCY_EXISTING_HOMES: Dataset = {
  id: "dluhc-energy-efficiency-existing-homes",
  uri: "http://gss-data.org.uk/data/gss_data/climate-change/mhclg-energy-efficiency-ratings-existing-homes",
};

export const DLUHC_ENERGY_EFFICIENCY_NEW_HOMES: Dataset = {
  id: "dluhc-energy-efficiency-new-homes",
  uri: "http://gss-data.org.uk/data/gss_data/climate-change/mhclg-energy-efficiency-ratings-new-homes",
};

export const MISC_ONS: Dataset = {
  id: "misc-ons",
  onPmd: false,
  datasetInfo: {
    title: "Unpublished",
    publisher: {
      uri: "https://www.gov.uk/government/organisations/office-for-national-statistics",
      label: "Office for National Statistics",
    },
  },
};

export const MISC_DEFRA: Dataset = {
  id: "misc-defra",
  onPmd: false,
  datasetInfo: {
    title: "Unpublished",
    publisher: {
      uri: "https://www.gov.uk/government/organisations/department-for-environment-food-rural-affairs",
      label: "Department of Agriculture, Environment & Rural Affairs",
    },
  },
};

export const MISC_BEIS: Dataset = {
  id: "misc-beis",
  onPmd: false,
  datasetInfo: {
    title: "Unpublished",
    publisher: {
      uri: "https://www.gov.uk/government/organisations/department-for-business-energy-and-industrial-strategy",
      label: "Department for Business, Energy & Industrial Strategy",
    },
  },
};

export const MISC_WELSH_WATER: Dataset = {
  id: "misc-welsh-water",
  onPmd: false,
  datasetInfo: {
    title: "Unpublished",
    publisher: {
      uri: "https://www.dwrcymru.com/",
      label: "Welsh Water",
    },
  },
};

export const MISC_NI_WATER: Dataset = {
  id: "misc-ni-water",
  onPmd: false,
  datasetInfo: {
    title: "Unpublished",
    publisher: {
      uri: "https://www.niwater.com/",
      label: "Northern Ireland Water",
    },
  },
};

export const MISC_SCOTTISH_WATER: Dataset = {
  id: "misc-scottish-water",
  onPmd: false,
  datasetInfo: {
    title: "Unpublished",
    publisher: {
      uri: "https://www.scottishwater.co.uk/",
      label: "Scottish Water",
    },
  },
};

export const datasets: Array<Dataset> = [
  ONS_TRADE_IN_GOODS,
  ONS_SA_TRADE_IN_GOODS,
  DEFRA_EFFICIENT_WATER,
  BEIS_GAS_EMISSIONS,
  MET_GROWING_SEASON,
  MET_UK_MEAN_TEMP,
  MET_UK_MEAN_TEMP_ANOMALY,
  ONS_ATMOSPHERIC_EMISSIONS_GREENHOUSE_GASSES_BY_INDUSTRY_AND_GAS,
  MET_UK_MEAN_RAIN1,
  DEFRA_CARBON_FOOTPRINT_SUMMARY_SOURCE_REGION,
  BEIS_LA_CARBON_EMISSIONS,
  BEIS_ENERGY_TRENDS_EXTRACT,
  BEIS_ENERGY_INTENSITY_EXTRACT,
  ONS_ENERGY_USE_BY_FUEL_AND_INDUSTRY,
  ONS_EMISSIONS_BY_INDUSTRY_2020,
  DEFRA_B3_STATE_OF_THE_WATER_ENVIRONMENT,
  FORESTRY_RESEARCH_NEW_PLANTING,
  BEIS_GAS_EMISSIONS_PROVISIONAL,
  DEFRA_CARBON_FOOTPRINT_SUMMARY,
  DEFRA_POLLINATOR_SPECIES,
  FORESTRY_RESEARCH_FORESTRY_STATISTICS_2021_WOODLAND_AREA,
  DLUHC_ENERGY_EFFICIENCY_EXISTING_HOMES,
  DLUHC_ENERGY_EFFICIENCY_NEW_HOMES,
  DEFRA_WATER_LEAKAGE,
  ONS_SA_TRADE_IN_GOODS,
  FOREST_RESEARCH_WOODLAND_AREA_LA,
  MISC_ONS,
  MISC_DEFRA,
  MISC_BEIS,
  MISC_WELSH_WATER,
  MISC_NI_WATER,
  MISC_SCOTTISH_WATER,
];

export async function fetchInfo(fetch: any, datasets: Array<Dataset>) {
  const infos = await Promise.all(
    datasets.map((ds) => {
      if (ds.onPmd == false) {
        return ds.datasetInfo;
      } else {
        return fetch(`/dataset/${ds.id}`);
      }
    }),
  );
  const dsInfo: any = new Map<string, DatasetInfo>();
  for (let i = 0; i < datasets.length; i++) {
    if (infos[i] instanceof Response) {
      if (infos[i].ok) {
        dsInfo[datasets[i].id] = await infos[i].json();
      }
    } else {
      dsInfo[datasets[i].id] = await infos[i];
    }
  }
  return dsInfo;
}
