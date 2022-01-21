const basicPropsSection = {
  name: "BasicChartProperties",
  displayName: "Basic chart properties",
  properties: [
    {
      name: "chartTitle",
      displayName: "Chart title",
      displayType: "text",
      value: "Covid-19 Triple Vaccination by UK Nation",
    },
    {
      name: "showTitle",
      displayName: "Show Title",
      displayType: "checkbox",
      value: true,
    },
    {
      name: "showGridLines",
      displayName: "Show Grid Lines",
      displayType: "checkbox",
      value: true,
    },
    {
      name: "showLegend",
      displayName: "Show Legend",
      displayType: "checkbox",
      value: true,
    },
    {
      name: "chartBackgroundColour",
      displayName: "Background colour",
      displayType: "text",
      value: "rgb(220, 220, 220)",
    },
  ],
};

const axisPropsSection = {
  name: "AxisProperties",
  displayName: "X and Y axis properties",
  properties: [
    {
      name: "xAxisTitle",
      displayName: "X axis title",
      displayType: "text",
      value: "Week beginning",
    },
    {
      name: "yAxisTitle",
      displayName: "Y axis title",
      displayType: "text",
      value: "Percentage of people vaccinated",
    },
    {
      name: "xAxisTickAngle",
      displayName: "X axis tick angle",
      displayType: "text",
      value: "45",
    },
  ],
};

const initialChartState = [basicPropsSection, axisPropsSection];

export default initialChartState;
