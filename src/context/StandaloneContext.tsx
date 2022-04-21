import React, { Dispatch, SetStateAction } from "react";

export interface StandaloneContextProps {
  isFullScreen: boolean;
  setIsFullScreen: Dispatch<SetStateAction<boolean>>;
  sparqlQuery: string;
  setSparqlQuery: Dispatch<SetStateAction<string>>;
}

const StandaloneContext = React.createContext<StandaloneContextProps>(
  {} as StandaloneContextProps,
);

export default StandaloneContext;
