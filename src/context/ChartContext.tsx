import React, { Dispatch, SetStateAction } from "react";
import { DataSelection } from "./ChartContextProvider";

export type ChartContextProps = {
  tidyData: any;
  setTidyData: Dispatch<SetStateAction<any>>;
  chartDefinition: any;
  chartProperties: any;
  setChartProperties: Dispatch<SetStateAction<any>>;
  selectedFilename: string;
  setSelectedFilename: Dispatch<SetStateAction<string>>;
  previewMode: boolean;
  setPreviewMode: Dispatch<SetStateAction<boolean>>;
  columnNames: string[];
  dataSelection: DataSelection | undefined;
  setDataSelection: Dispatch<SetStateAction<DataSelection | undefined>>;
};
const ChartContext = React.createContext<ChartContextProps>(
  {} as ChartContextProps,
);

export default ChartContext;
