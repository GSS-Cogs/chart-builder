const mapData = [
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
        text: "Va",
      },
      thickness: "25",
    },
    hovertemplate: " %{text} <br> %{z} <extra></extra> ",
  },
];

const expectedMapCsv = `Location,Va
Glasgow City,2414
Aberdeen City,1155
City of London,640
Barking and Dagenham,564
Barnet,1215
Bexley,828
Brent,918
Bromley,997
Camden,968
Croydon,1068
Ealing,1091
Enfield,1112
Greenwich,789
Hackney,607
Hammersmith and Fulham,641
Haringey,658
Harrow,631
Havering,927
Hillingdon,1408
Hounslow,983
Islington,651
Kensington and Chelsea,753
Kingston upon Thames,583
Lambeth,876
Lewisham,735
Merton,591
Newham,1021
Redbridge,790
Richmond upon Thames,613
Southwark,933
Sutton,564
Tower Hamlets,1159
Waltham Forest,645
Wandsworth,864
Westminster,1701
Bolton,1212
Bury,851
Manchester,2020
Oldham,773
Rochdale,956
Salford,1242
Stockport,1194
Tameside,810
Trafford,1468
Wigan,1258
Knowsley,811
Liverpool,1797
St. Helens,1133
Sefton,1195
Wirral,1208
Barnsley,1322
Doncaster,2005
Rotherham,1588
Sheffield,2218
Gateshead,1034
Newcastle upon Tyne,1230
North Tyneside,827
South Tyneside,492
Sunderland,1178
Birmingham,4083
Coventry,1265
Dudley,1127
Sandwell,1394
Solihull,1266
Walsall,1048
Wolverhampton,925
Bradford,2043
Calderdale,1016
Kirklees,1887
Leeds,3875
Wakefield,2027
Hartlepool,584
Middlesbrough,598
Redcar and Cleveland,2491
Stockton-on-Tees,2731
Darlington,529
Halton,726
Warrington,1351
Blackburn with Darwen,652
Blackpool,471
"Kingston upon Hull, City of",1084
East Riding of Yorkshire,2732
North East Lincolnshire,1179
North Lincolnshire,6890
York,808
Derby,1067
Leicester,1217
Rutland,1039
Nottingham,1105
"Herefordshire, County of",1003
Telford and Wrekin,919
Stoke-on-Trent,1265
Bath and North East Somerset,669
"Bristol, City of",1475
North Somerset,1156
South Gloucestershire,1660
Plymouth,862
Torbay,424
Swindon,1019
Peterborough,1114
Luton,646
Southend-on-Sea,525
Thurrock,916
Medway,820
Bracknell Forest,426
West Berkshire,1161
Reading,510
Slough,693
Windsor and Maidenhead,783
Wokingham,726
Milton Keynes,1286
Brighton and Hove,828
Portsmouth,751
Southampton,723
Isle of Wight,464
Buckinghamshire,2587
Cambridge,489
East Cambridgeshire,1339
Fenland,1449
Huntingdonshire,1597
South Cambridgeshire,1213
Allerdale,637
Barrow-in-Furness,383
Carlisle,559
Copeland,220
Eden,977
South Lakeland,862
Amber Valley,663
Bolsover,983
Chesterfield,445
Derbyshire Dales,501
Erewash,519
High Peak,2953
North East Derbyshire,499
South Derbyshire,661
East Devon,622
Exeter,411
Mid Devon,509
North Devon,434
South Hams,506
Teignbridge,715
Torridge,258
West Devon,333
Eastbourne,277
Hastings,237
Lewes,371
Rother,381
Wealden,590
Basildon,723
Braintree,685
Brentwood,452
Castle Point,264
Chelmsford,815
Colchester,760
Epping Forest,929
Harlow,373
Maldon,258
Rochford,283
Tendring,562
Uttlesford,730
Cheltenham,389
Cotswold,554
Forest of Dean,439
Gloucester,480
Stroud,719
Tewkesbury,690
Basingstoke and Deane,945
East Hampshire,589
Eastleigh,561
Fareham,459
Gosport,202
Hart,472
Havant,404
New Forest,928
Rushmoor,349
Test Valley,793
Winchester,782
Broxbourne,363
Dacorum,624
East Hertfordshire,631
Hertsmere,641
North Hertfordshire,616
St Albans,861
Stevenage,379
Three Rivers,531
Watford,324
Welwyn Hatfield,586
Ashford,555
Canterbury,546
Dartford,591
Dover,436
Gravesham,457
Maidstone,754
Sevenoaks,763
Folkestone and Hythe,427
Swale,1151
Thanet,517
Tonbridge and Malling,693
Tunbridge Wells,397
Burnley,396
Chorley,652
Fylde,486
Hyndburn,379
Lancaster,826
Pendle,412
Preston,706
Ribble Valley,923
Rossendale,347
South Ribble,663
West Lancashire,925
Wyre,686
Blaby,588
Charnwood,809
Harborough,575
Hinckley and Bosworth,611
Melton,288
North West Leicestershire,1131
Oadby and Wigston,174
Boston,314
East Lindsey,894
Lincoln,322
North Kesteven,796
South Holland,603
South Kesteven,882
West Lindsey,614
Breckland,821
Broadland,723
Great Yarmouth,361
King's Lynn and West Norfolk,1907
North Norfolk,609
Norwich,452
South Norfolk,889
Corby,397
Daventry,814
East Northamptonshire,454
Kettering,589
Northampton,829
South Northamptonshire,843
Wellingborough,368
Craven,359
Hambleton,773
Harrogate,1055
Richmondshire,404
Ryedale,406
Scarborough,484
Selby,783
Ashfield,585
Bassetlaw,812
Broxtowe,705
Gedling,429
Mansfield,399
Newark and Sherwood,889
Rushcliffe,728
Cherwell,1184
Oxford,610
South Oxfordshire,799
Vale of White Horse,796
West Oxfordshire,540
Mendip,804
Sedgemoor,910
South Somerset,911
Cannock Chase,361
East Staffordshire,692
Lichfield,682
Newcastle-under-Lyme,710
South Staffordshire,873
Stafford,909
Staffordshire Moorlands,1150
Tamworth,249
Babergh,485
Ipswich,379
Mid Suffolk,634
Elmbridge,643
Epsom and Ewell,236
Guildford,711
Mole Valley,481
Reigate and Banstead,705
Runnymede,579
Spelthorne,390
Surrey Heath,526
Tandridge,564
Waverley,503
Woking,389
North Warwickshire,901
Nuneaton and Bedworth,477
Rugby,1791
Stratford-on-Avon,1106
Warwick,864
Adur,209
Arun,521
Chichester,632
Crawley,573
Horsham,621
Mid Sussex,599
Worthing,315
Bromsgrove,669
Malvern Hills,478
Redditch,326
Worcester,333
Wychavon,958
Wyre Forest,386
County Durham,2375
Cheshire East,2516
Cheshire West and Chester,3857
Shropshire,1765
Cornwall,2602
Isles of Scilly,9
Wiltshire,2587
Bedford,736
Central Bedfordshire,1573
Northumberland,681
"Bournemouth, Christchurch and Poole",1288
Dorset,1662
East Suffolk,1082
West Suffolk,1602
Somerset West and Taunton,727
Antrim and Newtownabbey,947
"Armagh City, Banbridge and Craigavon",1583
Belfast,1438
Causeway Coast and Glens,1215
Derry City and Strabane,1241
Fermanagh and Omagh,1614
Lisburn and Castlereagh,842
Mid and East Antrim,1081
Mid Ulster,1949
"Newry, Mourne and Down",1284
Ards and North Down,662
Aberdeenshire,1707
Argyll and Bute,267
Clackmannanshire,522
Dumfries and Galloway,936
Dundee City,584
East Ayrshire,505
East Lothian,1126
East Renfrewshire,391
City of Edinburgh,2106
Na h-Eileanan Siar,570
Falkirk,2258
Highland,1361
Inverclyde,297
Midlothian,416
Moray,625
North Ayrshire,835
Orkney Islands,277
Renfrewshire,867
Scottish Borders,701
Shetland Islands,496
South Ayrshire,478
South Lanarkshire,1621
Stirling,623
West Dunbartonshire,447
West Lothian,1056
Angus,679
East Dunbartonshire,402
Fife,2559
North Lanarkshire,1813
Perth and Kinross,953
Isle of Anglesey,397
Gwynedd,663
Conwy,554
Denbighshire,465
Flintshire,1649
Wrexham,894
Powys,799
Ceredigion,466
Pembrokeshire,756
Carmarthenshire,1072
Swansea,1030
Neath Port Talbot,7166
Bridgend,792
Vale of Glamorgan,1116
Rhondda Cynon Taf,1043
Merthyr Tydfil,256
Caerphilly,701
Blaenau Gwent,292
Torfaen,417
Monmouthshire,623
Newport,1030
Cardiff,1626
,0
,706`;

export { mapData, expectedMapCsv };
