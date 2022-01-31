import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import { useContext } from "react";
import ChartContext from "../../context/ChartContext";
import { toSafeFilename } from "../../helper-functions/string-helpers";

const PublishButton = (props: any): JSX.Element => {
  const { chartDefinition }: any = useContext(ChartContext);
  const { layout } = chartDefinition;

  let filename = "published-chart";

  // if there's a title with content, use that as the filename
  if (layout && layout.title.text !== "") {
    filename = toSafeFilename(layout.title.text);
  }

  const onPublishClick = (): void => {
    domtoimage
      .toBlob(document.getElementById("chart-preview")!)
      .then(function (blob) {
        saveAs(blob, `${filename}.png`);
      });
  };

  return (
    <button id="publish-button" onClick={onPublishClick}>
      Publish Chart
    </button>
  );
};

export { PublishButton };
