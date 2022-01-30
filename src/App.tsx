import "./App.css";
import Header from "./components/header/Header";
import ChartContextProvider from "./context/ChartContextProvider";
import ChartBuilder from "./components/chart-builder/ChartBuilder";

function App() {
  return (
    <div id="app">
      <Header />
      <ChartContextProvider>
        <ChartBuilder />
      </ChartContextProvider>
    </div>
  );
}

export default App;
