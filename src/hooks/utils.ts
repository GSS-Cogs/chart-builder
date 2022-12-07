const getMapColorBarTitle = (data: any) => {
  let secondColumnHeader = "Value";
  const colorbar = data[0]?.colorbar;
  if (colorbar?.title?.text) {
    secondColumnHeader = colorbar?.title?.text;
  } else if (colorbar?.title.length > 0) {
    secondColumnHeader = colorbar?.title;
  }
  const cleansedSecondColumnHeader =
    secondColumnHeader !== null
      ? secondColumnHeader.replace(/ *\<[^)]*\> */g, " ")
      : secondColumnHeader;
  return cleansedSecondColumnHeader;
};

export { getMapColorBarTitle };
