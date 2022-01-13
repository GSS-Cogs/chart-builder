import "./App.css";
import Header from "./components/header/Header";
import ChartPanel from "./components/chart-panel/ChartPanel";
import SidePanel from "./components/side-panel/SidePanel";
import PageIntro from "./components/page-intro/PageIntro";
import ChartContextProvider from "./context/ChartContextProvider";

function App() {
  return (
    <div id="app">
      <Header />
      <div id="main-content">
        <PageIntro />
        <div id="chart-builder">
          <ChartContextProvider>
            <SidePanel />
            <ChartPanel />
          </ChartContextProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
