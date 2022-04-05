import { ReactChildren, ReactChild } from "react";

interface Props {
  children: ReactChild | ReactChildren;
}

const StandaloneSidePanel = ({ children }: Props) => (
  <div id="side-panel-wrapper">{children}</div>
);

export default StandaloneSidePanel;
