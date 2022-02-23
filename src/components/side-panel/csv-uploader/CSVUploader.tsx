import { useCallback, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import "./csv-uploader.css";
import ChartContext from "../../../context/ChartContext";
import Button from "../../button/Button";

function useChartCsvData() {
  const {
    setTidyData,
    setSelectedFilename,
    setPreviewMode
  }: any = useContext(ChartContext);

  const onFailure = (error: string) => {
    console.log(error);
  };

  const validateData = (data: File) => {
    Papa.parse(data, {
      worker: true,
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: function (results) {
        if (results.errors && results.errors.length > 0) {
          onFailure(results.errors[0].message);
        } else {
          setSelectedFilename(data.name);
          setPreviewMode(true);
          setTidyData(results.data);
        }
      },
    });
  };

  return {
    validateData,
  }
}

const CSVUploader = (): JSX.Element => {
  const { validateData } = useChartCsvData();

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: File) => {
      validateData(file);
    });
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    accept: ".csv",
    multiple: false,
  });

  return (
    <div id="csv-uploader">
      <div {...getRootProps({ id: "dropzone" })}>
        <input {...getInputProps()} />
        <span>Drag a csv file here or </span>
        <Button text={"Browse"} onClick={open} />
        <span>a file from your computer</span>
      </div>
    </div>
  );
};
export default CSVUploader;
