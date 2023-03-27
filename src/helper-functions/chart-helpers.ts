const colors = [
  "rgb(29, 112, 184)",
  "rgb(244, 119, 56)",
  "rgb(0, 112, 60)",
  "rgb(212, 53, 28)",
  "rgb(111, 114, 175)",
  "rgb(40, 161, 151)",
  "rgb(213, 56, 128)",
  "rgb(80, 90, 95)",
  "rgb(0, 0, 0)",
];

const dashStyles = ["none", "dot", "dash"];

const getIsIntervalData = (series: any) => {
  return (
    series.filter((x: { confidence: boolean }) => x?.confidence === true)
      .length > 0
  );
};

export { colors, dashStyles, getIsIntervalData };
