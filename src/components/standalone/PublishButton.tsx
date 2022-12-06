import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import "./publish-button.css";

const PublishButton = (props: any): JSX.Element => {
  let filename = "published-chart";

  const onPublishClick = (): void => {
    domtoimage.toBlob(document.getElementById("chart")!).then(function (blob) {
      saveAs(blob, `${filename}.png`);
    });
  };

  return (
    <button className="cb-download-button" onClick={onPublishClick}>
      Publish Chart
    </button>
  );
};

export default PublishButton;
