import { FileUpload } from "govuk-react";
import Papa from "papaparse";
import "./side-panel.css";
import { useContext } from "react";
import { ChartContext } from "../../context/ChartContext";

const SidePanel = (): JSX.Element => {
  const { setData }: any = useContext(ChartContext);

  const handleUpload = (files: FileList | null) => {
    files && files.length
      ? validateData(files[0])
      : onFailure("File upload failed");
  };

  const validateData = (data: File | string) => {
    Papa.parse(data, {
      worker: true,
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: function (results) {
        if (results.errors && results.errors.length > 0) {
          onFailure(results.errors[0].message);
        } else {
          console.log("Finished:", results.data);
          setData(results.data);
        }
      },
    });
  };

  const onFailure = (error: string) => {
    console.log(error);
  };
  return (
    <div id="side-panel">
      <FileUpload
        onChange={(e) => handleUpload(e.target.files)}
        acceptedFormats=".csv"
        name="csv-upload"
      >
        Data Source
      </FileUpload>
      <br />
      <br />

      <p>Example property placeholder</p>
      <br />
      <p>Example property placeholder</p>
      <br />
      <p>Example property placeholder</p>
      <br />
      <p>Example property placeholder</p>
      <br />
      <p>Example property placeholder</p>
      <br />
      <p>Example property placeholder</p>
      <br />
      <p>Example property placeholder</p>
      <br />
      <p>Example property placeholder</p>
      <br />
      <p>Example property placeholder</p>
      <br />
      <p>Example property placeholder</p>
      <br />
      <p>Example property placeholder</p>
      <br />
      <p>Example property placeholder</p>
      <br />
      <p>Example property placeholder</p>
      <br />
      <p>Example property placeholder</p>
      <br />
      <p>Example property placeholder</p>
      <br />
      <p>Example property placeholder</p>
      <br />
    </div>
  );
};
export default SidePanel;
