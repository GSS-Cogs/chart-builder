import { FileUpload } from "govuk-react";
import Papa from "papaparse";
import { useState } from "react";
import "./side-panel.css";

const SidePanel = (): JSX.Element => {
  const [parsedCsvData, setParsedCsvData] = useState([]);

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
          setParsedCsvData(parsedCsvData);
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
