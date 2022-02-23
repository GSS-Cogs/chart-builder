import { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import "./csv-uploader.css";
import ChartContext from "../../../context/ChartContext";
import Button from "../../button/Button";

const CSVUploader = (): JSX.Element => {
  const { validateData } = useContext(ChartContext);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: File) => {
      validateData(file, file.name);
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
      </div>
    </div>
  );
};
export default CSVUploader;
