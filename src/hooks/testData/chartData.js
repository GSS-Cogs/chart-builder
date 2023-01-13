const chartData = [
  {
    x: [
      "13/09/2021",
      "20/09/2021",
      "27/09/2021",
      "04/10/2021",
      "11/10/2021",
      "18/10/2021",
      "25/10/2021",
      "01/11/2021",
      "08/11/2021",
      "15/11/2021",
      "22/11/2021",
      "29/11/2021",
      "06/12/2021",
      "13/12/2021",
    ],
    y: [
      0.1, 0.7, 3, 6.1, 9.7, 13.6, 17.8, 22.4, 27.8, 33.4, 38.8, 45.2, 50.1,
      61.3,
    ],
    orientation: "v",
    customdata: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    hovertemplate: "<b>%{x}</b> <br>England: %{y:.2f}<extra></extra>",
    name: "England",
    type: "line",
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
  {
    x: [
      "13/09/2021",
      "20/09/2021",
      "27/09/2021",
      "04/10/2021",
      "11/10/2021",
      "18/10/2021",
      "25/10/2021",
      "01/11/2021",
      "08/11/2021",
      "15/11/2021",
      "22/11/2021",
      "29/11/2021",
      "06/12/2021",
      "13/12/2021",
    ],
    y: [
      0.1, 0.6, 2.5, 5.6, 9.2, 13.3, 17.4, 22.5, 27.4, 31.5, 36.5, 41.6, 45.9,
      53.6,
    ],
    orientation: "v",
    customdata: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    hovertemplate: "<b>%{x}</b> <br>Scotland: %{y:.2f}<extra></extra>",
    name: "Scotland",
    type: "line",
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
    x: [
      "13/09/2021",
      "20/09/2021",
      "27/09/2021",
      "04/10/2021",
      "11/10/2021",
      "18/10/2021",
      "25/10/2021",
      "01/11/2021",
      "08/11/2021",
      "15/11/2021",
      "22/11/2021",
      "29/11/2021",
      "06/12/2021",
      "13/12/2021",
    ],
    y: [
      0.1, 1.1, 4.3, 8.1, 12.2, 16.1, 19.1, 23, 26.8, 30.2, 33.4, 38, 43.9,
      51.8,
    ],
    orientation: "v",
    customdata: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    hovertemplate: "<b>%{x}</b> <br>Wales: %{y:.2f}<extra></extra>",
    name: "Wales",
    type: "line",
    mode: "lines",
    hoverinfo: "x+y",
    marker: {
      color: "rgb(0, 112, 60)",
    },
    line: {
      color: "rgb(0, 112, 60)",
      dash: "none",
    },
    fill: "none",
  },
  {
    x: [
      "13/09/2021",
      "20/09/2021",
      "27/09/2021",
      "04/10/2021",
      "11/10/2021",
      "18/10/2021",
      "25/10/2021",
      "01/11/2021",
      "08/11/2021",
      "15/11/2021",
      "22/11/2021",
      "29/11/2021",
      "06/12/2021",
      "13/12/2021",
    ],
    y: [
      0.3, 0.4, 0.7, 1.1, 2.2, 4.5, 9.2, 17, 26, 34.8, 42.4, 47.6, 52.4, 58.8,
    ],
    orientation: "v",
    customdata: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    hovertemplate: "<b>%{x}</b> <br>Northern Ireland: %{y:.2f}<extra></extra>",
    name: "Northern Ireland",
    type: "line",
    mode: "lines",
    hoverinfo: "x+y",
    marker: {
      color: "rgb(212, 53, 28)",
    },
    line: {
      color: "rgb(212, 53, 28)",
      dash: "none",
    },
    fill: "none",
  },
];

const expectedChartCsv = `week_starting,England,Scotland,Wales,Northern Ireland
13/09/2021,0.1,0.1,0.1,0.3
20/09/2021,0.7,0.6,1.1,0.4
27/09/2021,3,2.5,4.3,0.7
04/10/2021,6.1,5.6,8.1,1.1
11/10/2021,9.7,9.2,12.2,2.2
18/10/2021,13.6,13.3,16.1,4.5
25/10/2021,17.8,17.4,19.1,9.2
01/11/2021,22.4,22.5,23,17
08/11/2021,27.8,27.4,26.8,26
15/11/2021,33.4,31.5,30.2,34.8
22/11/2021,38.8,36.5,33.4,42.4
29/11/2021,45.2,41.6,38,47.6
06/12/2021,50.1,45.9,43.9,52.4
13/12/2021,61.3,53.6,51.8,58.8`;

export { chartData, expectedChartCsv };
