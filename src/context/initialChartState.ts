const basicPropsSection = {
  name: "BasicChartProperties",
  properties: [
    {
      name: "chartTitle",
      displayname: "Chart title",
      displayType: "text",
      value: "Covid-19 Triple Vaccination by UK Nation",
    },
    {
      name: "showTitle",
      displayname: "Show Title",
      displayType: "checkbox",
      value: true,
    },
    {
      name: "showGridLines",
      displayname: "Show Grid Lines",
      displayType: "checkbox",
      value: true,
    },
    {
      name: "showLegend",
      displayname: "Show Legend",
      displayType: "checkbox",
      value: true,
    },
    {
      name: "chartBackgroundColour",
      displayname: "Chart title",
      displayType: "text",
      value: "rgb(220, 220, 220)",
    },
  ],
};

const axisPropsSection = {
  name: "AxisProperties",
  properties: [
    {
      name: "xAxisTitle",
      displayname: "X axis title",
      displayType: "text",
      value: "Week beginning",
    },
    {
      name: "yAxisTitle",
      displayname: "Y axis title",
      displayType: "text",
      value: "Percentage of people vaccinated",
    },
    {
      name: "xAxisTickAngle",
      displayname: "X axis tick angle",
      displayType: "text",
      value: "45",
    },
  ],
};

const initialChartState = [basicPropsSection, axisPropsSection];

export default initialChartState;
