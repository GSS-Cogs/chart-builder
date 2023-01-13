const sparseData = [
  {
    x: ["84.0"],
    y: ["All surface water bodies"],
    orientation: "h",
    customdata: [100, 100, 100, 100, 100, 100],
    hovertemplate:
      "<b>%{y}</b> <br>Total: %{customdata:.0f} <br>Ecological status: other: %{x:.0f}<extra></extra>",
    name: "Ecological status: other",
    type: "bar",
    mode: "lines",
    hoverinfo: "x+y",
    marker: {
      color: "rgb(40, 161, 151)",
    },
    line: {
      color: "rgb(40, 161, 151)",
      dash: "none",
    },
    fill: "none",
  },
  {
    x: ["16.0"],
    y: ["All surface water bodies"],
    orientation: "h",
    customdata: [100, 100, 100, 100, 100, 100],
    hovertemplate:
      "<b>%{y}</b> <br>Total: %{customdata:.0f} <br>Ecological status: at good status: %{x:.0f}<extra></extra>",
    name: "Ecological status: at good status",
    type: "bar",
    mode: "lines",
    hoverinfo: "x+y",
    marker: {
      color: "rgb(111, 114, 175)",
    },
    line: {
      color: "rgb(111, 114, 175)",
      dash: "none",
    },
    fill: "none",
  },
  {
    x: ["50.0", "64.0", "48.0", "24.0", "55.0"],
    y: [
      "Coastal waters: saltmarsh",
      "Estuaries: saltmarsh",
      "Lakes: phytoplankton",
      "Rivers: invertebrates",
      "Rivers: plants and algae",
    ],
    orientation: "h",
    customdata: [100, 100, 100, 100, 100, 100],
    hovertemplate:
      "<b>%{y}</b> <br>Total: %{customdata:.0f} <br>Biology: not at good status: %{x:.0f}<extra></extra>",
    name: "Biology: not at good status",
    type: "bar",
    mode: "lines",
    hoverinfo: "x+y",
    marker: {
      color: "rgb(244, 119, 56)",
    },
    line: {
      color: "rgb(244, 119, 56)",
      dash: "none",
    },
    fill: "none",
  },
  {
    x: ["50.0", "36.0", "52.0", "76.0", "45.0"],
    y: [
      "Coastal waters: saltmarsh",
      "Estuaries: saltmarsh",
      "Lakes: phytoplankton",
      "Rivers: invertebrates",
      "Rivers: plants and algae",
    ],
    orientation: "h",
    customdata: [100, 100, 100, 100, 100, 100],
    hovertemplate:
      "<b>%{y}</b> <br>Total: %{customdata:.0f} <br>Biology: at good status: %{x:.0f}<extra></extra>",
    name: "Biology: at good status",
    type: "bar",
    mode: "lines",
    hoverinfo: "x+y",
    marker: {
      color: "rgb(29, 112, 184)",
    },
    line: {
      color: "rgb(29, 112, 184)",
      dash: "none",
    },
    fill: "none",
  },
];

const expectedSparseCsv = `Category,Ecological status: other,Ecological status: at good status,Biology: not at good status,Biology: at good status
All surface water bodies,84.0,16.0,,
Coastal waters: saltmarsh,,,50.0,50.0
Estuaries: saltmarsh,,,64.0,36.0
Lakes: phytoplankton,,,48.0,52.0
Rivers: invertebrates,,,24.0,76.0
Rivers: plants and algae,,,55.0,45.0`;

export { sparseData, expectedSparseCsv };
