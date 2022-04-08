import { ReactChildren, ReactChild, useContext } from "react";
import StandaloneContext from "../../../context/StandaloneContext";
import "./standalone-side-panel.css";

interface Props {
  children: ReactChild | ReactChildren;
}

const StandaloneSidePanel = ({ children }: Props) => {
  const { isFullScreen, setIsFullScreen } = useContext(StandaloneContext);
  return (
    <div
      style={{ display: isFullScreen ? "none" : "block" }}
      id="side-panel-wrapper"
    >
      {children}
    </div>
  );
};

export default StandaloneSidePanel;
