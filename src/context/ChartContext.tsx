import React, {Dispatch, SetStateAction} from "react";
import {DataSelection, SelectedDimension} from "./ChartContextProvider";

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
  fullScreenMode: boolean;
  setFullScreenMode: Dispatch<SetStateAction<boolean>>;
  availableDimensions: string[];
  setAvailableDimensions: Dispatch<SetStateAction<string[]>>;
  selectedColumns: string[],
  setSelectedColumns: Dispatch<SetStateAction<string[]>>,
  selectedDimensions: SelectedDimension[],
  setSelectedDimensions: Dispatch<SetStateAction<SelectedDimension[]>>,
  validateData: (data: File | string, filename: string) => void,
};
const ChartContext = React.createContext<ChartContextProps>(
  {} as ChartContextProps,
);

export default ChartContext;
