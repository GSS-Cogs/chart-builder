import { useCallback, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import "./csv-uploader.css";
import { ChartContext } from "../../../context/ChartContext";
import Button from "../../button/Button";

const CSVUploader = (): JSX.Element => {
  const { setTidyData }: any = useContext(ChartContext);
  const { setSelectedFilename }: any = useContext(ChartContext);
  const { setPreviewMode }: any = useContext(ChartContext);

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
          // console.log("Finished:", results.data);
          setSelectedFilename(data.name);
          setPreviewMode(true);
          setTidyData(results.data);
        }
      },
    });
  };

  const onFailure = (error: string) => {
    console.log(error);
  };

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
