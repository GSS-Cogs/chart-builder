import Papa from "papaparse";
import { Dispatch, SetStateAction, useCallback } from "react";

function useChartCsvData(
  setTidyData: Dispatch<SetStateAction<any>>,
  setSelectedFilename: Dispatch<SetStateAction<string>>,
) {
  const onFailure = (error: string) => {
    console.log(error);
  };

  const importCsvData = useCallback(
    (data: File | string, filename: string) => {
      Papa.parse(data, {
        worker: true,
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: function (results) {
          if (results.errors && results.errors.length > 0) {
            onFailure(results.errors[0].message);
          } else {
            setSelectedFilename(filename);
            setTidyData(results.data);
          }
        },
      });
    },
    [setSelectedFilename, setTidyData],
  );

  return {
    importCsvData,
  };
}

export default useChartCsvData;
