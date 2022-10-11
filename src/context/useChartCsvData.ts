import Papa from "papaparse";
import { Dispatch, SetStateAction, useCallback } from "react";

const parseText = (
  text: string,
  onComplete: (results: Papa.ParseResult<unknown>) => any,
) => {
  // Replace CRLF with LF to fix parsing issues with Windows line endings
  text = text.replace(/[\r\n]+/g, "\n");
  Papa.parse(text, {
    worker: true,
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
    complete: onComplete,
  });
};

function useChartCsvData(
  setTidyData: Dispatch<SetStateAction<any>>,
  setSelectedFilename: Dispatch<SetStateAction<string>>,
) {
  const onFailure = (error: string) => {
    console.log(error);
  };

  const importCsvData = useCallback(
    (data: File | string, filename: string) => {
      const onComplete = (results: Papa.ParseResult<unknown>) => {
        if (results.errors && results.errors.length > 0) {
          onFailure(results.errors[0].message);
        } else {
          setSelectedFilename(filename);
          setTidyData(results.data);
        }
      };

      if (typeof data === "string") {
        parseText(data, onComplete);
      } else {
        data.text().then((text) => {
          parseText(text, onComplete);
        });
      }
    },
    [setSelectedFilename, setTidyData],
  );

  return {
    importCsvData,
  };
}

export default useChartCsvData;
