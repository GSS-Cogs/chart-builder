import { ReactChildren, ReactChild, useContext } from "react";
import StandaloneContext from "../../../context/StandaloneContext";
import DataSource from "../../side-panel/property-inputs/DataSource";
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
      <DataSource />

      {children}
    </div>
  );
};

export default StandaloneSidePanel;
