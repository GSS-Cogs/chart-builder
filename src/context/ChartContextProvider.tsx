import { ChartContext } from "./ChartContext";
import { useState } from "react";

const ChartContextProvider = ({ children }: any): JSX.Element => {
  const [parsedCsvData, setParsedCsvData] = useState([]);

  return (
    <ChartContext.Provider
      value={{
        parsedCsvData,
        setParsedCsvData,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};

export default ChartContextProvider;
