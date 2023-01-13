const compactBarData = [
  {
    y: ["Unspecified goods"],
    x: [12.397],
    text: "12 ",
    textposition: "auto",
    textfont: {
      size: "14",
      family: "Arial",
    },
    yaxis: "y",
    marker: {
      color: "rgb(29, 112, 184)",
    },
    hoverinfo: "none",
    type: "bar",
    orientation: "h",
    name: "Export",
  },
  {
    y: ["Miscellaneous manufactures"],
    x: [40.405],
    text: "40 ",
    textposition: "auto",
    textfont: {
      size: "14",
      family: "Arial",
    },
    yaxis: "y2",
    marker: {
      color: "rgb(29, 112, 184)",
    },
    hoverinfo: "none",
    type: "bar",
    orientation: "h",
    name: "Export",
  },
  {
    y: ["Material manufactures"],
    x: [33.642],
    text: "34 ",
    textposition: "auto",
    textfont: {
      size: "14",
      family: "Arial",
    },
    yaxis: "y3",
    marker: {
      color: "rgb(29, 112, 184)",
    },
    hoverinfo: "none",
    type: "bar",
    orientation: "h",
    name: "Export",
  },
  {
    y: ["Machinery & transport equipment"],
    x: [112.201],
    text: "112 ",
    textposition: "auto",
    textfont: {
      size: "14",
      family: "Arial",
    },
    yaxis: "y4",
    marker: {
      color: "rgb(29, 112, 184)",
    },
    hoverinfo: "none",
    type: "bar",
    orientation: "h",
    name: "Export",
  },
  {
    y: ["Food & live animals"],
    x: [15.171],
    text: "15 ",
    textposition: "auto",
    textfont: {
      size: "14",
      family: "Arial",
    },
    yaxis: "y5",
    marker: {
      color: "rgb(29, 112, 184)",
    },
    hoverinfo: "none",
    type: "bar",
    orientation: "h",
    name: "Export",
  },
  {
    y: ["Crude materials"],
    x: [6.637],
    text: "7 ",
    textposition: "auto",
    textfont: {
      size: "14",
      family: "Arial",
    },
    yaxis: "y6",
    marker: {
      color: "rgb(29, 112, 184)",
    },
    hoverinfo: "none",
    type: "bar",
    orientation: "h",
    name: "Export",
  },
  {
    y: ["Chemicals"],
    x: [53.231],
    text: "53 ",
    textposition: "auto",
    textfont: {
      size: "14",
      family: "Arial",
    },
    yaxis: "y7",
    marker: {
      color: "rgb(29, 112, 184)",
    },
    hoverinfo: "none",
    type: "bar",
    orientation: "h",
    name: "Export",
  },
  {
    y: ["Beverages & tobacco"],
    x: [6.673],
    text: "7 ",
    textposition: "auto",
    textfont: {
      size: "14",
      family: "Arial",
    },
    yaxis: "y8",
    marker: {
      color: "rgb(29, 112, 184)",
    },
    hoverinfo: "none",
    type: "bar",
    orientation: "h",
    name: "Export",
  },
  {
    y: ["Animal & vegetable oils & fats"],
    x: [5.21],
    text: "5 ",
    textposition: "auto",
    textfont: {
      size: "14",
      family: "Arial",
    },
    yaxis: "y9",
    marker: {
      color: "rgb(29, 112, 184)",
    },
    hoverinfo: "none",
    type: "bar",
    orientation: "h",
    name: "Export",
  },
];

const expectedCompactBarCsv = `Commodity,Export
Unspecified goods,12.397
Miscellaneous manufactures,40.405
Material manufactures,33.642
Machinery & transport equipment,112.201
Food & live animals,15.171
Crude materials,6.637
Chemicals,53.231
Beverages & tobacco,6.673
Animal & vegetable oils & fats,5.21`;

export { compactBarData, expectedCompactBarCsv };
