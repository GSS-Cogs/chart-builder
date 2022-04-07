import { ReactNode, useState } from "react";
import StandaloneContext from "./StandaloneContext";

interface Props {
  children: ReactNode;
}

const StandaloneContextProvider = ({ children }: Props): JSX.Element => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  return (
    <StandaloneContext.Provider value={{ isFullScreen, setIsFullScreen }}>
      {children}
    </StandaloneContext.Provider>
  );
};

export default StandaloneContextProvider;
