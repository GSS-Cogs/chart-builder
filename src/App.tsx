import "./App.css";
import Header from "./components/header/Header";
import ChartContextProvider from "./context/ChartContextProvider";
import ChartBuilder from "./components/chart-builder/ChartBuilder";
import StandaloneContextProvider from "./context/StandaloneContextProvider";

function App() {
  return (
    <div id="app">
      <Header />
      <ChartContextProvider>
        <StandaloneContextProvider>
          <ChartBuilder />
        </StandaloneContextProvider>
      </ChartContextProvider>
    </div>
  );
}

export default App;
