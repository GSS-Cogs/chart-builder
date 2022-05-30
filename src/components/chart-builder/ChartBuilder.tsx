import ChartPreview from "../chart-preview/ChartPreview";
import SidePanel from "../side-panel/SidePanel";
import StandaloneSidePanel from "../standalone/side-panel/StandaloneSidePanel";
import StandaloneChart from "../standalone/chart/StandaloneChart";
import "./chart-builder.css";
import DataSource from "../side-panel/property-inputs/DataSource";

const ChartBuilder = (): JSX.Element => {
  return (
    <div id="chart-builder">
      <StandaloneSidePanel>
        <SidePanel
          renderDataSelector={() => <DataSource />}
        />
      </StandaloneSidePanel>
      <StandaloneChart>
        <ChartPreview />
      </StandaloneChart>
    </div>
  );
};

export default ChartBuilder;
