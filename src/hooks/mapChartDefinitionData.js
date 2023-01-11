const mapChartDefinitionData = [
  {
    type: "choropleth",
    locationmode: "geojson-id",
    locations: [
      "http://statistics.data.gov.uk/id/statistical-geography/S12000049",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000033",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000001",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000002",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000003",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000004",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000005",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000006",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000007",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000008",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000009",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000010",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000011",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000012",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000013",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000014",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000015",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000016",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000017",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000018",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000019",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000020",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000021",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000022",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000023",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000024",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000025",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000026",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000027",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000028",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000029",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000030",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000031",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000032",
      "http://statistics.data.gov.uk/id/statistical-geography/E09000033",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000001",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000002",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000003",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000004",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000005",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000006",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000007",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000008",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000009",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000010",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000011",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000012",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000013",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000014",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000015",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000016",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000017",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000018",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000019",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000037",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000021",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000022",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000023",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000024",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000025",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000026",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000027",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000028",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000029",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000030",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000031",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000032",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000033",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000034",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000035",
      "http://statistics.data.gov.uk/id/statistical-geography/E08000036",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000001",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000002",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000003",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000004",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000005",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000006",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000007",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000008",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000009",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000010",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000011",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000012",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000013",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000014",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000015",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000016",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000017",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000018",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000019",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000020",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000021",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000022",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000023",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000024",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000025",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000026",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000027",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000030",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000031",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000032",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000033",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000034",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000035",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000036",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000037",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000038",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000039",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000040",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000041",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000042",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000043",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000044",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000045",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000046",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000060",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000008",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000009",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000010",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000011",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000012",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000026",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000027",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000028",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000029",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000030",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000031",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000032",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000033",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000034",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000035",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000036",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000037",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000038",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000039",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000040",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000041",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000042",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000043",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000044",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000045",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000046",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000047",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000061",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000062",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000063",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000064",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000065",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000066",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000067",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000068",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000069",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000070",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000071",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000072",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000073",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000074",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000075",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000076",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000077",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000078",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000079",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000080",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000081",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000082",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000083",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000084",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000085",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000086",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000087",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000088",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000089",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000090",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000091",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000092",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000093",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000094",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000095",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000096",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000242",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000098",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000099",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000240",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000243",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000102",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000103",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000241",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000105",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000106",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000107",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000108",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000109",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000110",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000111",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000112",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000113",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000114",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000115",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000116",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000117",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000118",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000119",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000120",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000121",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000122",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000123",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000124",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000125",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000126",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000127",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000128",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000129",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000130",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000131",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000132",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000133",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000134",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000135",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000136",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000137",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000138",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000139",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000140",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000141",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000142",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000143",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000144",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000145",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000146",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000147",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000148",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000149",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000150",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000151",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000152",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000153",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000154",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000155",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000156",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000163",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000164",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000165",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000166",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000167",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000168",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000169",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000170",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000171",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000172",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000173",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000174",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000175",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000176",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000177",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000178",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000179",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000180",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000181",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000187",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000188",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000189",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000192",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000193",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000194",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000195",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000196",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000197",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000198",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000199",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000200",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000202",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000203",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000207",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000208",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000209",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000210",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000211",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000212",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000213",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000214",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000215",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000216",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000217",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000218",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000219",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000220",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000221",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000222",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000223",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000224",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000225",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000226",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000227",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000228",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000229",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000234",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000235",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000236",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000237",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000238",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000239",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000047",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000049",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000050",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000051",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000052",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000053",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000054",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000055",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000056",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000057",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000058",
      "http://statistics.data.gov.uk/id/statistical-geography/E06000059",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000244",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000245",
      "http://statistics.data.gov.uk/id/statistical-geography/E07000246",
      "http://statistics.data.gov.uk/id/statistical-geography/N09000001",
      "http://statistics.data.gov.uk/id/statistical-geography/N09000002",
      "http://statistics.data.gov.uk/id/statistical-geography/N09000003",
      "http://statistics.data.gov.uk/id/statistical-geography/N09000004",
      "http://statistics.data.gov.uk/id/statistical-geography/N09000005",
      "http://statistics.data.gov.uk/id/statistical-geography/N09000006",
      "http://statistics.data.gov.uk/id/statistical-geography/N09000007",
      "http://statistics.data.gov.uk/id/statistical-geography/N09000008",
      "http://statistics.data.gov.uk/id/statistical-geography/N09000009",
      "http://statistics.data.gov.uk/id/statistical-geography/N09000010",
      "http://statistics.data.gov.uk/id/statistical-geography/N09000011",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000034",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000035",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000005",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000006",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000042",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000008",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000010",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000011",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000036",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000013",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000014",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000017",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000018",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000019",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000020",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000021",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000023",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000038",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000026",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000027",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000028",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000029",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000030",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000039",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000040",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000041",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000045",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000047",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000050",
      "http://statistics.data.gov.uk/id/statistical-geography/S12000048",
      "http://statistics.data.gov.uk/id/statistical-geography/W06000001",
      "http://statistics.data.gov.uk/id/statistical-geography/W06000002",
      "http://statistics.data.gov.uk/id/statistical-geography/W06000003",
      "http://statistics.data.gov.uk/id/statistical-geography/W06000004",
      "http://statistics.data.gov.uk/id/statistical-geography/W06000005",
      "http://statistics.data.gov.uk/id/statistical-geography/W06000006",
      "http://statistics.data.gov.uk/id/statistical-geography/W06000023",
      "http://statistics.data.gov.uk/id/statistical-geography/W06000008",
      "http://statistics.data.gov.uk/id/statistical-geography/W06000009",
      "http://statistics.data.gov.uk/id/statistical-geography/W06000010",
      "http://statistics.data.gov.uk/id/statistical-geography/W06000011",
      "http://statistics.data.gov.uk/id/statistical-geography/W06000012",
      "http://statistics.data.gov.uk/id/statistical-geography/W06000013",
      "http://statistics.data.gov.uk/id/statistical-geography/W06000014",
      "http://statistics.data.gov.uk/id/statistical-geography/W06000016",
      "http://statistics.data.gov.uk/id/statistical-geography/W06000024",
      "http://statistics.data.gov.uk/id/statistical-geography/W06000018",
      "http://statistics.data.gov.uk/id/statistical-geography/W06000019",
      "http://statistics.data.gov.uk/id/statistical-geography/W06000020",
      "http://statistics.data.gov.uk/id/statistical-geography/W06000021",
      "http://statistics.data.gov.uk/id/statistical-geography/W06000022",
      "http://statistics.data.gov.uk/id/statistical-geography/W06000015",
      "http://gss-data.org.uk/data/gss_data/climate-change/beis-2005-to-2019-local-authority-carbon-dioxide-co2-emissions#concept/local-authority-code/unallocated-consumption",
      "http://gss-data.org.uk/data/gss_data/climate-change/beis-2005-to-2019-local-authority-carbon-dioxide-co2-emissions#concept/local-authority-code/large-elec-users-high-voltage-lines-unknown-location",
    ],
    z: [
      2414, 1155, 640, 564, 1215, 828, 918, 997, 968, 1068, 1091, 1112, 789,
      607, 641, 658, 631, 927, 1408, 983, 651, 753, 583, 876, 735, 591, 1021,
      790, 613, 933, 564, 1159, 645, 864, 1701, 1212, 851, 2020, 773, 956, 1242,
      1194, 810, 1468, 1258, 811, 1797, 1133, 1195, 1208, 1322, 2005, 1588,
      2218, 1034, 1230, 827, 492, 1178, 4083, 1265, 1127, 1394, 1266, 1048, 925,
      2043, 1016, 1887, 3875, 2027, 584, 598, 2491, 2731, 529, 726, 1351, 652,
      471, 1084, 2732, 1179, 6890, 808, 1067, 1217, 1039, 1105, 1003, 919, 1265,
      669, 1475, 1156, 1660, 862, 424, 1019, 1114, 646, 525, 916, 820, 426,
      1161, 510, 693, 783, 726, 1286, 828, 751, 723, 464, 2587, 489, 1339, 1449,
      1597, 1213, 637, 383, 559, 220, 977, 862, 663, 983, 445, 501, 519, 2953,
      499, 661, 622, 411, 509, 434, 506, 715, 258, 333, 277, 237, 371, 381, 590,
      723, 685, 452, 264, 815, 760, 929, 373, 258, 283, 562, 730, 389, 554, 439,
      480, 719, 690, 945, 589, 561, 459, 202, 472, 404, 928, 349, 793, 782, 363,
      624, 631, 641, 616, 861, 379, 531, 324, 586, 555, 546, 591, 436, 457, 754,
      763, 427, 1151, 517, 693, 397, 396, 652, 486, 379, 826, 412, 706, 923,
      347, 663, 925, 686, 588, 809, 575, 611, 288, 1131, 174, 314, 894, 322,
      796, 603, 882, 614, 821, 723, 361, 1907, 609, 452, 889, 397, 814, 454,
      589, 829, 843, 368, 359, 773, 1055, 404, 406, 484, 783, 585, 812, 705,
      429, 399, 889, 728, 1184, 610, 799, 796, 540, 804, 910, 911, 361, 692,
      682, 710, 873, 909, 1150, 249, 485, 379, 634, 643, 236, 711, 481, 705,
      579, 390, 526, 564, 503, 389, 901, 477, 1791, 1106, 864, 209, 521, 632,
      573, 621, 599, 315, 669, 478, 326, 333, 958, 386, 2375, 2516, 3857, 1765,
      2602, 9, 2587, 736, 1573, 681, 1288, 1662, 1082, 1602, 727, 947, 1583,
      1438, 1215, 1241, 1614, 842, 1081, 1949, 1284, 662, 1707, 267, 522, 936,
      584, 505, 1126, 391, 2106, 570, 2258, 1361, 297, 416, 625, 835, 277, 867,
      701, 496, 478, 1621, 623, 447, 1056, 679, 402, 2559, 1813, 953, 397, 663,
      554, 465, 1649, 894, 799, 466, 756, 1072, 1030, 7166, 792, 1116, 1043,
      256, 701, 292, 417, 623, 1030, 1626, 0, 706,
    ],
    text: [
      "Glasgow City",
      "Aberdeen City",
      "City of London",
      "Barking and Dagenham",
      "Barnet",
      "Bexley",
      "Brent",
      "Bromley",
      "Camden",
      "Croydon",
      "Ealing",
      "Enfield",
      "Greenwich",
      "Hackney",
      "Hammersmith and Fulham",
      "Haringey",
      "Harrow",
      "Havering",
      "Hillingdon",
      "Hounslow",
      "Islington",
      "Kensington and Chelsea",
      "Kingston upon Thames",
      "Lambeth",
      "Lewisham",
      "Merton",
      "Newham",
      "Redbridge",
      "Richmond upon Thames",
      "Southwark",
      "Sutton",
      "Tower Hamlets",
      "Waltham Forest",
      "Wandsworth",
      "Westminster",
      "Bolton",
      "Bury",
      "Manchester",
      "Oldham",
      "Rochdale",
      "Salford",
      "Stockport",
      "Tameside",
      "Trafford",
      "Wigan",
      "Knowsley",
      "Liverpool",
      "St. Helens",
      "Sefton",
      "Wirral",
      "Barnsley",
      "Doncaster",
      "Rotherham",
      "Sheffield",
      "Gateshead",
      "Newcastle upon Tyne",
      "North Tyneside",
      "South Tyneside",
      "Sunderland",
      "Birmingham",
      "Coventry",
      "Dudley",
      "Sandwell",
      "Solihull",
      "Walsall",
      "Wolverhampton",
      "Bradford",
      "Calderdale",
      "Kirklees",
      "Leeds",
      "Wakefield",
      "Hartlepool",
      "Middlesbrough",
      "Redcar and Cleveland",
      "Stockton-on-Tees",
      "Darlington",
      "Halton",
      "Warrington",
      "Blackburn with Darwen",
      "Blackpool",
      "Kingston upon Hull, City of",
      "East Riding of Yorkshire",
      "North East Lincolnshire",
      "North Lincolnshire",
      "York",
      "Derby",
      "Leicester",
      "Rutland",
      "Nottingham",
      "Herefordshire, County of",
      "Telford and Wrekin",
      "Stoke-on-Trent",
      "Bath and North East Somerset",
      "Bristol, City of",
      "North Somerset",
      "South Gloucestershire",
      "Plymouth",
      "Torbay",
      "Swindon",
      "Peterborough",
      "Luton",
      "Southend-on-Sea",
      "Thurrock",
      "Medway",
      "Bracknell Forest",
      "West Berkshire",
      "Reading",
      "Slough",
      "Windsor and Maidenhead",
      "Wokingham",
      "Milton Keynes",
      "Brighton and Hove",
      "Portsmouth",
      "Southampton",
      "Isle of Wight",
      "Buckinghamshire",
      "Cambridge",
      "East Cambridgeshire",
      "Fenland",
      "Huntingdonshire",
      "South Cambridgeshire",
      "Allerdale",
      "Barrow-in-Furness",
      "Carlisle",
      "Copeland",
      "Eden",
      "South Lakeland",
      "Amber Valley",
      "Bolsover",
      "Chesterfield",
      "Derbyshire Dales",
      "Erewash",
      "High Peak",
      "North East Derbyshire",
      "South Derbyshire",
      "East Devon",
      "Exeter",
      "Mid Devon",
      "North Devon",
      "South Hams",
      "Teignbridge",
      "Torridge",
      "West Devon",
      "Eastbourne",
      "Hastings",
      "Lewes",
      "Rother",
      "Wealden",
      "Basildon",
      "Braintree",
      "Brentwood",
      "Castle Point",
      "Chelmsford",
      "Colchester",
      "Epping Forest",
      "Harlow",
      "Maldon",
      "Rochford",
      "Tendring",
      "Uttlesford",
      "Cheltenham",
      "Cotswold",
      "Forest of Dean",
      "Gloucester",
      "Stroud",
      "Tewkesbury",
      "Basingstoke and Deane",
      "East Hampshire",
      "Eastleigh",
      "Fareham",
      "Gosport",
      "Hart",
      "Havant",
      "New Forest",
      "Rushmoor",
      "Test Valley",
      "Winchester",
      "Broxbourne",
      "Dacorum",
      "East Hertfordshire",
      "Hertsmere",
      "North Hertfordshire",
      "St Albans",
      "Stevenage",
      "Three Rivers",
      "Watford",
      "Welwyn Hatfield",
      "Ashford",
      "Canterbury",
      "Dartford",
      "Dover",
      "Gravesham",
      "Maidstone",
      "Sevenoaks",
      "Folkestone and Hythe",
      "Swale",
      "Thanet",
      "Tonbridge and Malling",
      "Tunbridge Wells",
      "Burnley",
      "Chorley",
      "Fylde",
      "Hyndburn",
      "Lancaster",
      "Pendle",
      "Preston",
      "Ribble Valley",
      "Rossendale",
      "South Ribble",
      "West Lancashire",
      "Wyre",
      "Blaby",
      "Charnwood",
      "Harborough",
      "Hinckley and Bosworth",
      "Melton",
      "North West Leicestershire",
      "Oadby and Wigston",
      "Boston",
      "East Lindsey",
      "Lincoln",
      "North Kesteven",
      "South Holland",
      "South Kesteven",
      "West Lindsey",
      "Breckland",
      "Broadland",
      "Great Yarmouth",
      "King's Lynn and West Norfolk",
      "North Norfolk",
      "Norwich",
      "South Norfolk",
      "Corby",
      "Daventry",
      "East Northamptonshire",
      "Kettering",
      "Northampton",
      "South Northamptonshire",
      "Wellingborough",
      "Craven",
      "Hambleton",
      "Harrogate",
      "Richmondshire",
      "Ryedale",
      "Scarborough",
      "Selby",
      "Ashfield",
      "Bassetlaw",
      "Broxtowe",
      "Gedling",
      "Mansfield",
      "Newark and Sherwood",
      "Rushcliffe",
      "Cherwell",
      "Oxford",
      "South Oxfordshire",
      "Vale of White Horse",
      "West Oxfordshire",
      "Mendip",
      "Sedgemoor",
      "South Somerset",
      "Cannock Chase",
      "East Staffordshire",
      "Lichfield",
      "Newcastle-under-Lyme",
      "South Staffordshire",
      "Stafford",
      "Staffordshire Moorlands",
      "Tamworth",
      "Babergh",
      "Ipswich",
      "Mid Suffolk",
      "Elmbridge",
      "Epsom and Ewell",
      "Guildford",
      "Mole Valley",
      "Reigate and Banstead",
      "Runnymede",
      "Spelthorne",
      "Surrey Heath",
      "Tandridge",
      "Waverley",
      "Woking",
      "North Warwickshire",
      "Nuneaton and Bedworth",
      "Rugby",
      "Stratford-on-Avon",
      "Warwick",
      "Adur",
      "Arun",
      "Chichester",
      "Crawley",
      "Horsham",
      "Mid Sussex",
      "Worthing",
      "Bromsgrove",
      "Malvern Hills",
      "Redditch",
      "Worcester",
      "Wychavon",
      "Wyre Forest",
      "County Durham",
      "Cheshire East",
      "Cheshire West and Chester",
      "Shropshire",
      "Cornwall",
      "Isles of Scilly",
      "Wiltshire",
      "Bedford",
      "Central Bedfordshire",
      "Northumberland",
      "Bournemouth, Christchurch and Poole",
      "Dorset",
      "East Suffolk",
      "West Suffolk",
      "Somerset West and Taunton",
      "Antrim and Newtownabbey",
      "Armagh City, Banbridge and Craigavon",
      "Belfast",
      "Causeway Coast and Glens",
      "Derry City and Strabane",
      "Fermanagh and Omagh",
      "Lisburn and Castlereagh",
      "Mid and East Antrim",
      "Mid Ulster",
      "Newry, Mourne and Down",
      "Ards and North Down",
      "Aberdeenshire",
      "Argyll and Bute",
      "Clackmannanshire",
      "Dumfries and Galloway",
      "Dundee City",
      "East Ayrshire",
      "East Lothian",
      "East Renfrewshire",
      "City of Edinburgh",
      "Na h-Eileanan Siar",
      "Falkirk",
      "Highland",
      "Inverclyde",
      "Midlothian",
      "Moray",
      "North Ayrshire",
      "Orkney Islands",
      "Renfrewshire",
      "Scottish Borders",
      "Shetland Islands",
      "South Ayrshire",
      "South Lanarkshire",
      "Stirling",
      "West Dunbartonshire",
      "West Lothian",
      "Angus",
      "East Dunbartonshire",
      "Fife",
      "North Lanarkshire",
      "Perth and Kinross",
      "Isle of Anglesey",
      "Gwynedd",
      "Conwy",
      "Denbighshire",
      "Flintshire",
      "Wrexham",
      "Powys",
      "Ceredigion",
      "Pembrokeshire",
      "Carmarthenshire",
      "Swansea",
      "Neath Port Talbot",
      "Bridgend",
      "Vale of Glamorgan",
      "Rhondda Cynon Taf",
      "Merthyr Tydfil",
      "Caerphilly",
      "Blaenau Gwent",
      "Torfaen",
      "Monmouthshire",
      "Newport",
      "Cardiff",
    ],
    colorscale: [
      [0, "rgb(233, 212, 30)"],
      [1, "rgb(36, 151, 140)"],
    ],
    autocolorscale: false,
    featureidkey: "properties.geography_uri",
    hoverinfo: "x+y",
    marker: {
      line: {
        color: "rgb(123,123,123)",
        width: 0.25,
      },
    },
    colorbar: {
      title: {
        text: "Rating",
      },
      thickness: "25",
    },
    hovertemplate: " %{text} <br> %{z} <extra></extra> ",
  },
];

export { mapChartDefinitionData };
